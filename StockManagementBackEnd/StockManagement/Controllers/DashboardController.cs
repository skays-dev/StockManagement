using StockManagement.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace StockManagement.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public DashboardController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetSummary()
    {
        var products = await _context.Products.ToListAsync();

        return Ok(new
        {
            totalCategories = await _context.Categories.CountAsync(),
            totalProducts = products.Count,
            totalQuantity = products.Sum(p => p.Quantity),
            lowStockProducts = products.Count(p => p.Quantity <= p.MinimumStock),
            totalStockValue = products.Sum(p => p.Quantity * p.UnitPrice)
        });
    }
}
