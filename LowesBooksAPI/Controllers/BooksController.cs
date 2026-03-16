using LowesBooksAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LowesBooksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        static private List<Book> books = new List<Book>
        {
            new Book
            {
                Id = 1,
                Title = "1984",
                Author = "George Orwell",
                YearPublished = "1949",
                Rating = 1.5,
                BookImage = "https://covers.openlibrary.org/b/id/7222246-L.jpg"
            },
            new Book
            {
                Id = 2,
                Title = "To Kill a Mockingbird",
                Author = "Harper Lee",
                YearPublished = "1960",
                Rating = 3.2,
                BookImage = "https://covers.openlibrary.org/b/id/8228691-L.jpg"
            },
            new Book
            {
                Id = 3,
                Title = "The Lord of the Rings",
                Author = "J.R.R. Tolkien",
                YearPublished = "1930",
                Rating = 5.0,
                BookImage = "https://covers.openlibrary.org/b/id/7222161-L.jpg"
            },
            new Book
            {
                Id = 4,
                Title = "Pride and Prejudice",
                Author = "Jane Austen",
                YearPublished = "1813",
                Rating = 4.2,
                BookImage = "https://covers.openlibrary.org/b/id/12645114-L.jpg"
            },
            new Book
            {
                Id = 5,
                Title = "The Great Gatsby",
                Author = "F. Scott Fitzgerald",
                YearPublished = "1925",
                Rating = 3.8,
                BookImage = "https://covers.openlibrary.org/b/id/14350216-L.jpg"
            },
            new Book
            {
                Id = 6,
                Title = "Brave New World",
                Author = "Aldous Huxley",
                YearPublished = "1932",
                Rating = 4.5,
                BookImage = "https://covers.openlibrary.org/b/id/14350347-L.jpg"
            },
            new Book
            {
                Id = 7,
                Title = "The Hobbit",
                Author = "J.R.R. Tolkien",
                YearPublished = "1937",
                Rating = 4.7,
                BookImage = "https://covers.openlibrary.org/b/id/14627222-L.jpg"
            }
        };

        [HttpGet("getBooks")]
        public ActionResult<List<Book>> GetBooks()
        {
            return Ok(books);
        }

        [HttpGet("getBookById/{id}")]
        public ActionResult<Book> GetBookById(int id)
        {

            var book = books.Find(x => x.Id == id);

            if (books == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost("addBook")]
        public ActionResult<Book> AddBook(Book newBook)
        {
            if (newBook == null)
            {
                return BadRequest();
            }

            books.Add(newBook);
            return CreatedAtAction(nameof(GetBookById), new { id = newBook.Id }, newBook);

        }

        [HttpPut("updateBook/{id}")]
        public IActionResult UpdateBook(int id, Book updatedBook)
        {
            var book = books.Find(x => x.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            book.Id = updatedBook.Id;
            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.YearPublished = updatedBook.YearPublished;
            book.Rating = updatedBook.Rating;
            book.BookImage = updatedBook.BookImage;

            return NoContent();

        }

        [HttpDelete("deleteBook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = books.Find(x => x.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            books.Remove(book);
            return NoContent();

        }
    }
}
