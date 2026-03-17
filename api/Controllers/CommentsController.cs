using LowesBooksAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LowesBooksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        static private List<Comment> comments = new List<Comment>();
        static private int nextId = 1;

        [HttpGet("getByBookId/{bookId}")]
        public ActionResult<List<Comment>> GetByBookId(int bookId)
        {
            return Ok(comments.Where(c => c.BookId == bookId).OrderByDescending(c => c.CreatedAt).ToList());
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
