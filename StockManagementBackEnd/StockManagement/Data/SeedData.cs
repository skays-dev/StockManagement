using StockManagement.Models;

namespace StockManagement.Data;

public static class SeedData
{
    public static void Initialize(ApplicationDBContext context)
    {
        if (context.Categories.Any() || context.Products.Any())
        {
            return;
        }

        var categories = new List<Category>
        {
            new() { Name = "Informatique", Description = "Ordinateurs et accessoires" },
            new() { Name = "Bureautique", Description = "Fournitures de bureau" },
            new() { Name = "Réseau", Description = "Matériel réseau" }
        };

        context.Categories.AddRange(categories);
        context.SaveChanges();

        var products = new List<Product>
        {
            new() { Name = "Clavier", Sku = "CLAV-001", Quantity = 25, UnitPrice = 120, MinimumStock = 5, CategoryId = categories[0].Id },
            new() { Name = "Souris", Sku = "SOUR-001", Quantity = 40, UnitPrice = 80, MinimumStock = 10, CategoryId = categories[0].Id },
            new() { Name = "Ramette A4", Sku = "PAPR-001", Quantity = 100, UnitPrice = 55, MinimumStock = 20, CategoryId = categories[1].Id },
            new() { Name = "Switch 8 ports", Sku = "NETW-001", Quantity = 8, UnitPrice = 350, MinimumStock = 2, CategoryId = categories[2].Id }
        };

        context.Products.AddRange(products);
        context.SaveChanges();
    }
}
