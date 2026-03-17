import type { Book } from '../types/Book'

const API = 'http://localhost:5118/api/Books'

export const booksApi = {
  getAll: (): Promise<Book[]> => fetch(`${API}/getBooks`).then(r => r.json()),

  getById: (id: number): Promise<Book> => fetch(`${API}/getBookById/${id}`).then(r => r.json()),

  create: (book: Book): Promise<Response> =>
    fetch(`${API}/addBook`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(book) }),

  update: (id: number, book: Book): Promise<Response> =>
    fetch(`${API}/updateBook/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(book) }),

  delete: (id: number): Promise<Response> => fetch(`${API}/deleteBook/${id}`, { method: 'DELETE' }),
}
