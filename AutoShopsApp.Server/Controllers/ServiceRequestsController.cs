using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoShopsApp.Server.Data;
using AutoShopsApp.Server.Models;

namespace AutoShopsApp.Server.Controllers
{
    [Route("api/servicerequests")] // ✅ More descriptive route
    [ApiController]
    public class ServiceRequestsController : ControllerBase
    {
        private readonly AutoShopDbContext _dbContext;

        public ServiceRequestsController(AutoShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // ✅ Fetch all service requests (Admin/Technicians)
        [HttpGet]
        public async Task<IActionResult> GetAllServiceRequests()
        {
            var requests = await _dbContext.ServiceRequests.ToListAsync();
            return Ok(requests);
        }

        // ✅ Fetch a single service request by ID
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetServiceRequest(int id)
        {
            var request = await _dbContext.ServiceRequests.FindAsync(id);
            return request == null ? NotFound() : Ok(request);
        }

        // ✅ Fetch service requests for a specific customer
        [HttpGet("customer/{customerId:int}")]
        public async Task<IActionResult> GetCustomerServiceRequests(int customerId)
        {
            var requests = await _dbContext.ServiceRequests
                .Where(r => r.UserId == customerId)
                .ToListAsync();

            return requests.Any() ? Ok(requests) : NotFound("No service requests found.");
        }

        // ✅ Create a new service request (Customer)
        [HttpPost]
        public async Task<IActionResult> CreateServiceRequest([FromBody] ServiceRequest request)
        {
            if (request == null) return BadRequest("Invalid service request data.");

            request.Status = "Pending"; // ✅ Default status
            _dbContext.ServiceRequests.Add(request);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetServiceRequest), new { id = request.Id }, request);
        }

        // ✅ Assign a Technician to a Service Request
        [HttpPut("assign/{id:int}/{technicianId:int}")]
        public async Task<IActionResult> AssignTechnician(int id, int technicianId)
        {
            var request = await _dbContext.ServiceRequests.FindAsync(id);
            if (request == null) return NotFound();

            request.TechnicianId = technicianId;
            request.Status = "In Progress";
            await _dbContext.SaveChangesAsync();
            return Ok($"Technician {technicianId} assigned to Service Request {id}");
        }

        // ✅ Update service request status (Technician/Customer)
        [HttpPut("status/{id:int}")]
        public async Task<IActionResult> UpdateServiceStatus(int id, [FromBody] string newStatus)
        {
            var request = await _dbContext.ServiceRequests.FindAsync(id);
            if (request == null) return NotFound();

            request.Status = newStatus;
            await _dbContext.SaveChangesAsync();
            return Ok($"Service Request {id} status updated to {newStatus}");
        }

        // ✅ Delete a service request (Admin only)
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteServiceRequest(int id)
        {
            var request = await _dbContext.ServiceRequests.FindAsync(id);
            if (request == null) return NotFound();

            _dbContext.ServiceRequests.Remove(request);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}