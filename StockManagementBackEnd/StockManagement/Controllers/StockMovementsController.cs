using StockManagement.Data;
using StockManagement.Dtos;
using StockManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace StockManagement.Controllers;

[ApiController]
[Route("api/stock-movements")]
public class StockMovementsController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public StockMovementsController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var movements = await _context.StockMovements
            .Include(m => m.Product)
            .OrderByDescending(m => m.CreatedAt)
            .Select(m => new
            {
                m.Id,
                m.ProductId,
                ProductName = m.Product != null ? m.Product.Name : null,
                m.Type,
                m.Quantity,
                m.Note,
                m.CreatedAt
            })
            .ToListAsync();

        return Ok(movements);
    }

    [HttpPost]
    public async Task<IActionResult> Create(StockMovementCreateDto dto)
    {
        if (dto.Quantity <= 0)
        {
            return BadRequest("Quantity must be greater than zero.");
        }

        var product = await _context.Products.FindAsync(dto.ProductId);
        if (product is null) return BadRequest("Product not found.");

        var normalizedType = dto.Type.Trim().ToUpperInvariant();
        if (normalizedType != "IN" && normalizedType != "OUT")
        {
            return BadRequest("Type must be IN or OUT.");
        }

        if (normalizedType == "OUT" && product.Quantity < dto.Quantity)
        {
            return BadRequest("Insufficient stock.");
        }

        product.Quantity = normalizedType == "IN"
            ? product.Quantity + dto.Quantity
            : product.Quantity - dto.Quantity;

        var movement = new StockMovement
        {
            ProductId = dto.ProductId,
            Type = normalizedType,
            Quantity = dto.Quantity,
            Note = dto.Note
        };

        _context.StockMovements.Add(movement);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Stock movement saved successfully.",
            product.Id,
            product.Name,
            product.Quantity
        });
    }
}
