import type { Book } from '../types/Book'

const API = 'http://localhost:5118/api/books'

export const booksApi = {
  getAll: (): Promise<Book[]> => fetch(API).then(r => r.json()),

  getById: (id: number): Promise<Book> => fetch(`${API}/${id}`).then(r => r.json()),

  create: (book: Book): Promise<Response> =>
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(book) }),

  update: (id: number, book: Book): Promise<Response> =>
    fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(book) }),

  delete: (id: number): Promise<Response> => fetch(`${API}/${id}`, { method: 'DELETE' }),
}
