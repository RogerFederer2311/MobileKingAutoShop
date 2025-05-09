using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MobileKingAutoShop.Server.Services;
using MobileKingAutoShop.Server.Utilities;

namespace MobileKingAutoShop.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class TechnicianSpecialtiesController : ControllerBase
{
    // Get Methods
    [HttpGet]
    public IActionResult GetTechnicianSpecialties()
    {
        return TechnicianSpecialtiesServices.GetTechnicianSpecialties();
    }
    [HttpGet("by-email/{email}")]
    public IActionResult GetTechnicianSpecialtiesByTechnicianEmail(string email)
    {
        return TechnicianSpecialtiesServices.GetTechnicianSpecialtiesByTechnicianEmail(email);
    }
    [HttpGet("by-id/{id}")]
    public IActionResult GetTechnicianSpecialtyByID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return TechnicianSpecialtiesServices.GetTechnicianSpecialtyByID(idNumber);
    }
    // Post Methods
    [HttpPost("add")]
    public IActionResult AddTechnicianSpecialty()
    {
        Task<TechnicianSpecialtyResponse> technicianSpecialtyModelValidation = TechnicianSpecialtiesValidation.CheckAddTechnicianSpecialtyModel(Request);
        TechnicianSpecialtyResponse technicianSpecialtyModelValidationResult = technicianSpecialtyModelValidation.Result;
        if (!technicianSpecialtyModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = technicianSpecialtyModelValidationResult.Result });
        }
        CommonResponse technicianSpecialtyAddValidation = TechnicianSpecialtiesServices.AddTechnicianSpecialty(technicianSpecialtyModelValidationResult.TechnicianSpecialty);
        if (!technicianSpecialtyAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = technicianSpecialtyAddValidation.Result });
        }
        return Ok(new { response = technicianSpecialtyAddValidation.Result });
    }
    // Put Methods
    [HttpPut("edit/{id}")]
    public IActionResult EditTechnicianSpecialty()
    {
        Task<TechnicianSpecialtyResponse> technicianSpecialtyModelValidation = TechnicianSpecialtiesValidation.CheckEditTechnicianSpecialtyModel(Request);
        TechnicianSpecialtyResponse technicianSpecialtyModelValidationResult = technicianSpecialtyModelValidation.Result;
        if (!technicianSpecialtyModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = technicianSpecialtyModelValidationResult.Result });
        }
        CommonResponse technicianSpecialtyEditValidation = TechnicianSpecialtiesServices.EditTechnicianSpecialty(technicianSpecialtyModelValidationResult.TechnicianSpecialty);
        if (!technicianSpecialtyEditValidation.IsSuccessful)
        {
            return BadRequest(new { response = technicianSpecialtyEditValidation.Result });
        }
        return Ok(new { response = technicianSpecialtyEditValidation.Result });
    }
    // Delete Methods
    [HttpDelete("delete/{id}")]
    public IActionResult DeleteTechnicianSpecialty(string id)
    {
        int idNumber = Convert.ToInt32(id);
        CommonResponse technicianSpecialtyDeleteValidation = TechnicianSpecialtiesServices.DeleteTechnicianSpecialtyByID(idNumber);
        if (!technicianSpecialtyDeleteValidation.IsSuccessful)
        {
            return BadRequest(new { response = technicianSpecialtyDeleteValidation.Result });
        }
        return Ok(new { response = technicianSpecialtyDeleteValidation.Result });
    }
}