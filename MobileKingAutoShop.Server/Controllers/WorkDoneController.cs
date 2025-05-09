using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MobileKingAutoShop.Server.Services;
using MobileKingAutoShop.Server.Utilities;

namespace MobileKingAutoShop.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkDoneController : ControllerBase
{
    // Get Methods
    [HttpGet]
    public IActionResult GetWorkDone()
    {
        return WorkDoneServices.GetWorkDone();
    }
    [HttpGet("by-job-assignment/{id}")]
    public IActionResult GetWorkDoneByJobAssignmentID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return WorkDoneServices.GetWorkDoneByJobAssignmentID(idNumber);
    }
    [HttpGet("by-id/{id}")]
    public IActionResult GetWorkDoneByID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return WorkDoneServices.GetWorkDoneByID(idNumber);
    }
    // Post Methods
    [HttpPost("add")]
    public IActionResult AddWorkDone()
    {
        Task<WorkDoneResponse> workDoneModelValidation = WorkDoneValidation.CheckAddWorkDoneModel(Request);
        WorkDoneResponse workDoneModelValidationResult = workDoneModelValidation.Result;
        if (!workDoneModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = workDoneModelValidationResult.Result });
        }
        CommonResponse workDoneAddValidation = WorkDoneServices.AddWorkDone(workDoneModelValidationResult.WorkDone);
        if (!workDoneAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = workDoneAddValidation.Result });
        }
        return Ok(new { response = workDoneAddValidation.Result });
    }
    // Put Methods
    [HttpPut("edit/{id}")]
    public IActionResult EditWorkDone()
    {
        Task<WorkDoneResponse> workDoneModelValidation = WorkDoneValidation.CheckEditWorkDoneModel(Request);
        WorkDoneResponse workDoneModelValidationResult = workDoneModelValidation.Result;
        if (!workDoneModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = workDoneModelValidationResult.Result });
        }
        CommonResponse workDoneEditValidation = WorkDoneServices.EditWorkDone(workDoneModelValidationResult.WorkDone);
        if (!workDoneEditValidation.IsSuccessful)
        {
            return BadRequest(new { response = workDoneEditValidation.Result });
        }
        return Ok(new { response = workDoneEditValidation.Result });
    }
    // Delete Methods
    [HttpDelete("delete/{id}")]
    public IActionResult DeleteWorkDoneByID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        CommonResponse workDoneDeleteValidation = WorkDoneServices.DeleteWorkDoneByID(idNumber);
        if (!workDoneDeleteValidation.IsSuccessful)
        {
            return BadRequest(new { response = workDoneDeleteValidation.Result });
        }
        return Ok(new { response = workDoneDeleteValidation.Result });
    }
}