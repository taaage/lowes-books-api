import { useEffect, useState } from "react";
import { booksApi } from "./api/booksApi";
import { commentsApi } from "./api/commentsApi";
import { BookCard } from "./components/BookCard";
import { BookForm } from "./components/BookForm";
import type { Book } from "./types/Book";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
  const [sortAsc, setSortAsc] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [adding, setAdding] = useState(false);

  const fetchData = () => {
    booksApi.getAll().then(setBooks);
    commentsApi.getCounts().then(setCommentCounts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sorted = [...books].sort((a, b) =>
    sortAsc ? a.rating - b.rating : b.rating - a.rating,
  );

  const handleDelete = (id: number) => booksApi.delete(id).then(fetchData);

  const handleSave = (book: Book) => {
    const isNew = !books.find((b) => b.id === book.id);
    const action = isNew
      ? booksApi.create(book)
      : booksApi.update(book.id, book);
    action.then(fetchData).then(() => {
      setEditing(null);
      setAdding(false);
    });
  };

  const emptyBook: Book = {
    id: Math.max(0, ...books.map((b) => b.id)) + 1,
    title: "",
    author: "",
    yearPublished: "",
    rating: 0,
  };

  return (
    <>
      <h1>Lowes Book Library</h1>
      <div className="controls">
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort by Rating ({sortAsc ? "↑" : "↓"})
        </button>
        <button onClick={() => setAdding(true)}>Add Book</button>
      </div>

      {(editing || adding) && (
        <BookForm
          book={editing || emptyBook}
          onSave={handleSave}
          onCancel={() => {
            setEditing(null);
            setAdding(false);
          }}
        />
      )}

      <div className="books">
        {sorted.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            commentCount={commentCounts[book.id] || 0}
            onEdit={() => setEditing(book)}
            onDelete={() => handleDelete(book.id)}
            onCommentChange={fetchData}
          />
        ))}
      </div>
    </>
  );
}
