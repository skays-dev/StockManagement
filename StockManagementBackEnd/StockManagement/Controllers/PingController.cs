using Microsoft.AspNetCore.Mvc;

namespace StockManagement.Controllers;

[ApiController]
[Route("api/ping")]
public class PingController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            message = "pong",
            status = "UP",
            timestamp = DateTime.UtcNow
        });
    }
}
