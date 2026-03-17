import { useState } from 'react'
import type { Book } from '../types/Book'
import { hashColor, ratingColor } from '../utils/colors'
import { BookComments } from './BookComments'

interface Props {
  book: Book
  commentCount: number
  onEdit: () => void
  onDelete: () => void
  onCommentChange: () => void
}

const CommentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
  </svg>
)

export function BookCard({ book, commentCount, onEdit, onDelete, onCommentChange }: Props) {
  const [showComments, setShowComments] = useState(false)
  const color = hashColor(book.title)
  const initial = book.title.charAt(0).toUpperCase() || '?'

  return (
    <div className="book">
      <div className="book-row">
        <div className="rating" style={{ color: ratingColor(book.rating) }}>{book.rating}</div>
        <div className="cover" style={{ '--spine-color': color } as React.CSSProperties}>
          <div className="spine">{initial}</div>
        </div>
        <div className="info">
          <h3>{book.title}</h3>
          <p>{book.author} ({book.yearPublished})</p>
        </div>
        <div className="actions">
          <button className="comment-btn" onClick={() => setShowComments(!showComments)}>
            <CommentIcon />
            {commentCount > 0 && <span>{commentCount}</span>}
          </button>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
      {showComments && <BookComments bookId={book.id} onCommentChange={onCommentChange} />}
    </div>
  )
}
