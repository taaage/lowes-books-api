using LowesBooksAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LowesBooksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        static private List<Comment> comments = new List<Comment>
        {
            new Comment { Id = 1, BookId = 4, Author = "Dad", Text = "Lowe loved Charlotte! He asked to read it again the next night.", CreatedAt = new DateTime(2026, 2, 10) },
            new Comment { Id = 2, BookId = 4, Author = "Mom", Text = "He was so sad about the ending but said it was his favorite.", CreatedAt = new DateTime(2026, 2, 12) },
            new Comment { Id = 3, BookId = 1, Author = "Dad", Text = "The wild things scared him a little but he thought Max was cool.", CreatedAt = new DateTime(2026, 1, 20) },
            new Comment { Id = 4, BookId = 5, Author = "Mom", Text = "He keeps repeating 'I do not like green eggs and ham' at dinner!", CreatedAt = new DateTime(2026, 3, 1) },
            new Comment { Id = 5, BookId = 2, Author = "Dad", Text = "Great for learning to count. He follows along with his fingers now.", CreatedAt = new DateTime(2026, 3, 5) },
        };
        static private int nextId = 6;

        [HttpGet("getByBookId/{bookId}")]
        public ActionResult<List<Comment>> GetByBookId(int bookId)
        {
            return Ok(comments.Where(c => c.BookId == bookId).OrderByDescending(c => c.CreatedAt).ToList());
        }

        [HttpGet("counts")]
        public ActionResult<Dictionary<int, int>> GetCounts()
        {
            return Ok(comments.GroupBy(c => c.BookId).ToDictionary(g => g.Key, g => g.Count()));
        }

        [HttpPost("add")]
        public ActionResult<Comment> Add(Comment comment)
        {
            comment.Id = nextId++;
            comment.CreatedAt = DateTime.UtcNow;
            comments.Add(comment);
            return Created("", comment);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var comment = comments.Find(c => c.Id == id);
            if (comment == null) return NotFound();
            comments.Remove(comment);
            return NoContent();
        }
    }
}
