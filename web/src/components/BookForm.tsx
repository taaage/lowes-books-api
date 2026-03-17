import { useForm } from 'react-hook-form'
import type { Book } from '../types/Book'

interface Props {
  book: Book
  onSave: (book: Book) => void
  onCancel: () => void
}

export function BookForm({ book, onSave, onCancel }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<Book>({ defaultValues: book })

  return (
    <form className="form" onSubmit={handleSubmit(onSave)}>
      <input placeholder="Title" {...register('title', { required: 'Title is required', maxLength: { value: 200, message: 'Max 200 characters' } })} />
      {errors.title && <span className="error">{errors.title.message}</span>}
      <input placeholder="Author" {...register('author', { required: 'Author is required', maxLength: { value: 200, message: 'Max 200 characters' } })} />
      {errors.author && <span className="error">{errors.author.message}</span>}
      <input placeholder="Year (e.g. 1984)" {...register('yearPublished', { required: 'Year is required', pattern: { value: /^\d{4}$/, message: 'Must be 4 digits' } })} />
      {errors.yearPublished && <span className="error">{errors.yearPublished.message}</span>}
      <input placeholder="Rating (1–5)" type="number" step="0.1" {...register('rating', { valueAsNumber: true, min: { value: 1, message: 'Min rating is 1' }, max: { value: 5, message: 'Max rating is 5' } })} />
      {errors.rating && <span className="error">{errors.rating.message}</span>}
      <div className="buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
