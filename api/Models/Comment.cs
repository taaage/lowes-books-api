using System.ComponentModel.DataAnnotations;

namespace LowesBooksAPI.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public int BookId { get; set; }

        [Required, StringLength(100)]
        public string Author { get; set; } = null!;

        [Required, StringLength(1000)]
        public string Text { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
