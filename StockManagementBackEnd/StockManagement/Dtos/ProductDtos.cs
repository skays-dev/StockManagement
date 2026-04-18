namespace StockManagement.Dtos;

public class ProductCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public int MinimumStock { get; set; }
    public int CategoryId { get; set; }
}
