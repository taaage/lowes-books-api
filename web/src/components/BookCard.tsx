import type { Book } from '../types/Book'

interface Props {
  book: Book
  onEdit: () => void
  onDelete: () => void
}

const spineColors = ['#da3633','#58a6ff','#3fb950','#d29922','#bc8cff','#f78166','#79c0ff','#56d364']

function hashColor(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h)
  return spineColors[Math.abs(h) % spineColors.length]
}

function ratingColor(r: number) {
  const t = Math.max(0, Math.min(1, (r - 1) / 4))
  const red = [248, 81, 73]
  const blue = [88, 166, 255]
  return `rgb(${red.map((c, i) => Math.round(c + (blue[i] - c) * t)).join(',')})`
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
