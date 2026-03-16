import { useEffect, useState } from "react";
import { booksApi } from "./api/booksApi";
import { BookCard } from "./components/BookCard";
import { BookForm } from "./components/BookForm";
import type { Book } from "./types/Book";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [adding, setAdding] = useState(false);

  const fetchBooks = () => booksApi.getAll().then(setBooks);

  useEffect(() => {
    fetchBooks();
  }, []);

  const sorted = [...books].sort((a, b) =>
    sortAsc ? a.rating - b.rating : b.rating - a.rating,
  );

  const handleDelete = (id: number) => booksApi.delete(id).then(fetchBooks);

  const handleSave = (book: Book) => {
    const isNew = !books.find((b) => b.id === book.id);
    const action = isNew
      ? booksApi.create(book)
      : booksApi.update(book.id, book);
    action.then(fetchBooks).then(() => {
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
    bookImage: "",
  };

  return (
    <>
      <h1>Lowes Books</h1>
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
            onEdit={() => setEditing(book)}
            onDelete={() => handleDelete(book.id)}
          />
        ))}
      </div>
    </>
  );
}
