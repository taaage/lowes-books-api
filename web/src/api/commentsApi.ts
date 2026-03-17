import type { Comment } from '../types/Comment'

const API = 'http://localhost:5118/api/Comments'

export const commentsApi = {
  getByBookId: (bookId: number): Promise<Comment[]> => fetch(`${API}/getByBookId/${bookId}`).then(r => r.json()),

  add: (comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> =>
    fetch(`${API}/add`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(comment) }).then(r => r.json()),

  delete: (id: number): Promise<Response> => fetch(`${API}/delete/${id}`, { method: 'DELETE' }),
}
