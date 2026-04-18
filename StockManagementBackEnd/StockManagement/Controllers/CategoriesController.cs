using StockManagement.Data;
using StockManagement.Dtos;
using StockManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace StockManagement.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoriesController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public CategoriesController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _context.Categories
            .OrderBy(c => c.Name)
            .ToListAsync();

        return Ok(categories);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        return category is null ? NotFound() : Ok(category);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CategoryCreateDto dto)
    {
        var category = new Category
        {
            Name = dto.Name,
            Description = dto.Description
        };

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, CategoryCreateDto dto)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category is null) return NotFound();

        category.Name = dto.Name;
        category.Description = dto.Description;

        await _context.SaveChangesAsync();
        return Ok(category);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await _context.Categories
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category is null) return NotFound();
        if (category.Products.Any()) return BadRequest("Cannot delete a category with products.");

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
