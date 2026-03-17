import type { Book } from '../types/Book'
import { hashColor, ratingColor } from '../utils/colors'

interface Props {
  book: Book
  onEdit: () => void
  onDelete: () => void
}

export function BookCard({ book, onEdit, onDelete }: Props) {
  const color = hashColor(book.title)
  const initial = book.title.charAt(0).toUpperCase() || '?'

  return (
    <div className="book">
      <div className="rating" style={{ color: ratingColor(book.rating) }}>{book.rating}</div>
      <div className="cover" style={{ '--spine-color': color } as React.CSSProperties}>
        <div className="spine">{initial}</div>
      </div>
      <div className="info">
        <h3>{book.title}</h3>
        <p>{book.author} ({book.yearPublished})</p>
      </div>
      <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
