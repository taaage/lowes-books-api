import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { commentsApi } from "../api/commentsApi";
import type { Comment } from "../types/Comment";

interface Props {
  bookId: number;
  onCommentChange: () => void;
}

function timeAgo(date: string) {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(date).toLocaleDateString();
}

export function BookComments({ bookId, onCommentChange }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ author: string; text: string }>();

  const fetchComments = () => commentsApi.getByBookId(bookId).then(setComments);
  useEffect(() => {
    fetchComments();
  }, [bookId]);

  const onSubmit = (data: { author: string; text: string }) => {
    commentsApi.add({ bookId, ...data }).then(() => {
      fetchComments();
      onCommentChange();
      reset();
    });
  };

  const onDelete = (id: number) => {
    commentsApi.delete(id).then(() => {
      fetchComments();
      onCommentChange();
    });
  };

  return (
    <div className="timeline">
      {comments.map((c) => (
        <div key={c.id} className="timeline-item">
          <div className="timeline-badge" />
          <div className="timeline-body">
            <div className="timeline-header">
              <strong>{c.author}</strong>
              <span>commented on {timeAgo(c.createdAt)}</span>
              <time>
                {new Date(c.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <button onClick={() => onDelete(c.id)}>✕</button>
            </div>
            <div className="timeline-content">{c.text}</div>
          </div>
        </div>
      ))}
      <div className="timeline-item">
        <div className="timeline-badge" />
        <form
          className="timeline-body comment-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Your name"
            {...register("author", {
              required: "Name is required",
              maxLength: { value: 100, message: "Max 100 characters" },
            })}
          />
          {errors.author && (
            <span className="error">{errors.author.message}</span>
          )}
          <textarea
            placeholder="Leave a comment..."
            rows={3}
            {...register("text", {
              required: "Comment is required",
              maxLength: { value: 1000, message: "Max 1000 characters" },
            })}
          />
          {errors.text && <span className="error">{errors.text.message}</span>}
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}
