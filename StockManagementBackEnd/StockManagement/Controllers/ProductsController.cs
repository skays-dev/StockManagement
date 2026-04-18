using StockManagement.Data;
using StockManagement.Dtos;
using StockManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace StockManagement.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public ProductsController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _context.Products
            .Include(p => p.Category)
            .OrderBy(p => p.Name)
            .Select(p => new
            {
                p.Id,
                p.Name,
                p.Sku,
                p.Quantity,
                p.UnitPrice,
                p.MinimumStock,
                p.CategoryId,
                CategoryName = p.Category != null ? p.Category.Name : null,
                IsLowStock = p.Quantity <= p.MinimumStock
            })
            .ToListAsync();

        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);

        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ProductCreateDto dto)
    {
        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == dto.CategoryId);
        if (!categoryExists) return BadRequest("Category not found.");

        var product = new Product
        {
            Name = dto.Name,
            Sku = dto.Sku,
            Quantity = dto.Quantity,
            UnitPrice = dto.UnitPrice,
            MinimumStock = dto.MinimumStock,
            CategoryId = dto.CategoryId
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ProductCreateDto dto)
    {
        var product = await _context.Products.FindAsync(id);
        if (product is null) return NotFound();

        product.Name = dto.Name;
        product.Sku = dto.Sku;
        product.Quantity = dto.Quantity;
        product.UnitPrice = dto.UnitPrice;
        product.MinimumStock = dto.MinimumStock;
        product.CategoryId = dto.CategoryId;

        await _context.SaveChangesAsync();
        return Ok(product);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product is null) return NotFound();

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
