import { useState } from 'react'
import type { Book } from '../types/Book'

interface Props {
  book: Book
  onSave: (book: Book) => void
  onCancel: () => void
}

export function BookForm({ book, onSave, onCancel }: Props) {
  const [form, setForm] = useState(book)
  const set = (k: keyof Book, v: string | number) => setForm({ ...form, [k]: v })

  return (
    <div className="form">
      <input placeholder="Title" value={form.title} onChange={e => set('title', e.target.value)} />
      <input placeholder="Author" value={form.author} onChange={e => set('author', e.target.value)} />
      <input placeholder="Year" value={form.yearPublished} onChange={e => set('yearPublished', e.target.value)} />
      <input placeholder="Rating" type="number" step="0.1" value={form.rating} onChange={e => set('rating', +e.target.value)} />
      <div className="buttons">
        <button onClick={() => onSave(form)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}
