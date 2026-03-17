using LowesBooksAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LowesBooksAPI.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        static private List<Book> books = new List<Book>
        {
            new Book { Id = 1, Title = "Where the Wild Things Are", Author = "Maurice Sendak", YearPublished = "1963", Rating = 4.8 },
            new Book { Id = 2, Title = "The Very Hungry Caterpillar", Author = "Eric Carle", YearPublished = "1969", Rating = 4.6 },
            new Book { Id = 3, Title = "Goodnight Moon", Author = "Margaret Wise Brown", YearPublished = "1947", Rating = 4.3 },
            new Book { Id = 4, Title = "Charlotte's Web", Author = "E.B. White", YearPublished = "1952", Rating = 4.9 },
            new Book { Id = 5, Title = "The Cat in the Hat", Author = "Dr. Seuss", YearPublished = "1957", Rating = 4.5 },
            new Book { Id = 6, Title = "Green Eggs and Ham", Author = "Dr. Seuss", YearPublished = "1960", Rating = 4.2 },
            new Book { Id = 7, Title = "The Giving Tree", Author = "Shel Silverstein", YearPublished = "1964", Rating = 3.8 }
        };

        [HttpGet]
        public ActionResult<List<Book>> GetBooks()
        {
            return Ok(books.OrderByDescending(b => b.Rating).ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetBookById(int id)
        {

            var book = books.Find(x => x.Id == id);

            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public ActionResult<Book> AddBook(Book newBook)
        {
            if (newBook == null)
            {
                return BadRequest();
            }

            books.Add(newBook);
            return CreatedAtAction(nameof(GetBookById), new { id = newBook.Id }, newBook);

        }

        [HttpPut("{id}")]
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

            return NoContent();

        }

        [HttpDelete("{id}")]
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
