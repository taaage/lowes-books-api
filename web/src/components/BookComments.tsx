import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { commentsApi } from '../api/commentsApi'
import type { Comment } from '../types/Comment'

interface Props {
  bookId: number
}

export function BookComments({ bookId }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ author: string; text: string }>()

  const fetch = () => commentsApi.getByBookId(bookId).then(setComments)
  useEffect(() => { fetch() }, [bookId])

  const onSubmit = (data: { author: string; text: string }) => {
    commentsApi.add({ bookId, ...data }).then(() => { fetch(); reset() })
  }

  return (
    <div className="comments">
      {comments.map(c => (
        <div key={c.id} className="comment">
          <div className="comment-header">
            <strong>{c.author}</strong>
            <span>{new Date(c.createdAt).toLocaleDateString()}</span>
            <button onClick={() => commentsApi.delete(c.id).then(fetch)}>✕</button>
          </div>
          <p>{c.text}</p>
        </div>
      ))}
      <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Your name" {...register('author', { required: 'Name is required', maxLength: { value: 100, message: 'Max 100 characters' } })} />
        {errors.author && <span className="error">{errors.author.message}</span>}
        <textarea placeholder="Add a comment..." {...register('text', { required: 'Comment is required', maxLength: { value: 1000, message: 'Max 1000 characters' } })} />
        {errors.text && <span className="error">{errors.text.message}</span>}
        <button type="submit">Comment</button>
      </form>
    </div>
  )
}
