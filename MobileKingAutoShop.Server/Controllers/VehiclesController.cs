using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MobileKingAutoShop.Server.Services;
using MobileKingAutoShop.Server.Utilities;

namespace MobileKingAutoShop.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class VehiclesController : ControllerBase
{
    // Get Methods
    [HttpGet]
    public IActionResult GetVehicles()
    {
        return VehiclesServices.GetVehicles();
    }
    [HttpGet("by-email/{email}")]
    public IActionResult GetVehiclesByEmail(string email)
    {
        return VehiclesServices.GetVehiclesByEmail(email);
    }
    [HttpGet("by-id/{id}")]
    public IActionResult GetVehicleByID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return VehiclesServices.GetVehicleByID(idNumber);
    }
    // Post Methods
    [HttpPost("add")]
    public IActionResult AddVehicle()
    {
        Task<VehicleResponse> vehicleModelValidation = VehiclesValidation.CheckAddVehicleModel(Request);
        VehicleResponse vehicleModelValidationResult = vehicleModelValidation.Result;
        if (!vehicleModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = vehicleModelValidationResult.Result });
        }
        CommonResponse vehicleAddValidation = VehiclesServices.AddVehicle(vehicleModelValidationResult.Vehicle);
        if (!vehicleAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = vehicleAddValidation.Result });
        }
        return Ok(new { response = vehicleAddValidation.Result });
    }
    // Put Methods
    [HttpPut("edit/{id}")]
    public IActionResult EditVehicle()
    {
        Task<VehicleResponse> vehicleModelValidation = VehiclesValidation.CheckEditVehicleModel(Request);
        VehicleResponse vehicleModelValidationResult = vehicleModelValidation.Result;
        if (!vehicleModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = vehicleModelValidationResult.Result });
        }
        CommonResponse vehicleEditValidation = VehiclesServices.EditVehicle(vehicleModelValidationResult.Vehicle);
        if (!vehicleEditValidation.IsSuccessful)
        {
            return BadRequest(new { response = vehicleEditValidation.Result });
        }
        return Ok(new { response = vehicleEditValidation.Result });
    }
}