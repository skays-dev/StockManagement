namespace StockManagement.Dtos;

public class StockMovementCreateDto
{
    public int ProductId { get; set; }
    public string Type { get; set; } = "IN";
    public int Quantity { get; set; }
    public string? Note { get; set; }
}
