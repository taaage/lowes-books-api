using System.ComponentModel.DataAnnotations;

namespace LowesBooksAPI.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required, StringLength(200)]
        public string Title { get; set; } = null!;

        [Required, StringLength(200)]
        public string Author { get; set; } = null!;

        [Required, RegularExpression(@"^\d{4}$")]
        public string YearPublished { get; set; } = null!;

        [Range(1, 5)]
        public double Rating { get; set; }
    }
}
