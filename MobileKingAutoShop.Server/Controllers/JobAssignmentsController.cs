using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MobileKingAutoShop.Server.Services;
using MobileKingAutoShop.Server.Utilities;

namespace MobileKingAutoShop.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class JobAssignmentsController : ControllerBase
{
    // Get Methods
    [HttpGet]
    public IActionResult GetJobAssignments()
    {
        return JobAssignmentsServices.GetJobAssignments();
    }
    [HttpGet("by-service-request/{id}")]
    public IActionResult GetJobAssignmentsByServiceRequestID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return JobAssignmentsServices.GetJobAssignmentsByServiceRequestID(idNumber);
    }
    [HttpGet("by-technician-email/{email}")]
    public IActionResult GetJobAssignmentsByTechnicianEmail(string email)
    {
        return JobAssignmentsServices.GetJobAssignmentsByTechnicianEmail(email);
    }
    [HttpGet("by-id/{id}")]
    public IActionResult GetJobAssignmentByID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return JobAssignmentsServices.GetJobAssignmentByID(idNumber);
    }
    // Post Methods
    [HttpPost("add")]
    public IActionResult AddJobAssignment()
    {
        Task<JobAssignmentResponse> jobAssignmentModelValidation = JobAssignmentsValidation.CheckAddJobAssignmentModel(Request);
        JobAssignmentResponse jobAssignmentModelValidationResult = jobAssignmentModelValidation.Result;
        if (!jobAssignmentModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = jobAssignmentModelValidationResult.Result });
        }
        CommonResponse jobAssignmentAddValidation = JobAssignmentsServices.AddJobAssignment(jobAssignmentModelValidationResult.JobAssignment);
        if (!jobAssignmentAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = jobAssignmentAddValidation.Result });
        }
        return Ok(new { response = jobAssignmentAddValidation.Result });
    }
    // Put Methods
    [HttpPut("edit/{id}")]
    public IActionResult EditJobAssignment()
    {
        Task<JobAssignmentResponse> jobAssignmentModelValidation = JobAssignmentsValidation.CheckEditJobAssignmentModel(Request);
        JobAssignmentResponse jobAssignmentModelValidationResult = jobAssignmentModelValidation.Result;
        if (!jobAssignmentModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = jobAssignmentModelValidationResult.Result });
        }
        CommonResponse jobAssignmentEditValidation = JobAssignmentsServices.EditJobAssignment(jobAssignmentModelValidationResult.JobAssignment);
        if (!jobAssignmentEditValidation.IsSuccessful)
        {
            return BadRequest(new { response = jobAssignmentEditValidation.Result });
        }
        return Ok(new { response = jobAssignmentEditValidation.Result });
    }
}