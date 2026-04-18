namespace StockManagement.Models;

public class StockMovement
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product? Product { get; set; }

    public string Type { get; set; } = "IN";
    public int Quantity { get; set; }
    public string? Note { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
