import type { Book } from '../types/Book'

interface Props {
  book: Book
  onEdit: () => void
  onDelete: () => void
}

export function BookCard({ book, onEdit, onDelete }: Props) {
  return (
    <div className="book">
      <div className="rating">{book.rating}</div>
      <img src={book.bookImage} alt={book.title} />
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
