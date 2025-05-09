using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MobileKingAutoShop.Server.Services;
using MobileKingAutoShop.Server.Utilities;
using System.Diagnostics;

namespace MobileKingAutoShop.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ServiceRequestsController : ControllerBase
{
    // Get Methods
    [HttpGet]
    public IActionResult GetServiceRequests()
    {
        return ServiceRequestsServices.GetServiceRequests();
    }
    [HttpGet("by-email/{email}")]
    public IActionResult GetServiceRequestsByEmail(string email)
    {
        return ServiceRequestsServices.GetServiceRequestsByEmail(email);
    }
    [HttpGet("by-id/{id}")]
    public IActionResult GetServiceRequestByID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return ServiceRequestsServices.GetServiceRequestByID(idNumber);
    }
    // Post Methods
    [HttpPost("add")]
    public IActionResult AddServiceRequest()
    {
        Task<ServiceRequestResponse> serviceRequestModelValidation = ServiceRequestsValidation.CheckAddServiceRequestModel(Request);
        ServiceRequestResponse serviceRequestModelValidationResult = serviceRequestModelValidation.Result;
        if (!serviceRequestModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = serviceRequestModelValidationResult.Result });
        }
        CommonResponse serviceRequestAddValidation = ServiceRequestsServices.AddServiceRequest(serviceRequestModelValidationResult.ServiceRequest);
        if (!serviceRequestAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = serviceRequestAddValidation.Result });
        }
        return Ok(new { response = serviceRequestAddValidation.Result });
    }
    [HttpPost("add-with-vehicle")]
    public IActionResult AddServiceRequestWithVehicle()
    {
        Task<ServiceRequestWithVehicleResponse> serviceRequestWithVehicleModelValidation = ServiceRequestsValidation.CheckAddServiceRequestWithVehicleModel(Request);
        ServiceRequestWithVehicleResponse serviceRequestWithVehicleModelValidationResult = serviceRequestWithVehicleModelValidation.Result;
        if (!serviceRequestWithVehicleModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = serviceRequestWithVehicleModelValidationResult.Result });
        }
        CommonResponse serviceRequestWithVehicleAddValidation = ServiceRequestsServices.AddServiceRequestWithVehicle(serviceRequestWithVehicleModelValidationResult.ServiceRequestWithVehicle);
        if (!serviceRequestWithVehicleAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = serviceRequestWithVehicleAddValidation.Result });
        }
        return Ok(new { response = serviceRequestWithVehicleAddValidation.Result });
    }
    // Put Methods
    [HttpPut("edit/{id}")]
    public IActionResult EditServiceRequest()
    {
        Task<ServiceRequestResponse> serviceRequestModelValidation = ServiceRequestsValidation.CheckEditServiceRequestModel(Request);
        ServiceRequestResponse serviceRequestModelValidationResult = serviceRequestModelValidation.Result;
        if (!serviceRequestModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = serviceRequestModelValidationResult.Result });
        }
        CommonResponse serviceRequestEditValidation = ServiceRequestsServices.EditServiceRequest(serviceRequestModelValidationResult.ServiceRequest);
        if (!serviceRequestEditValidation.IsSuccessful)
        {
            return BadRequest(new { response = serviceRequestEditValidation.Result });
        }
        return Ok(new { response = serviceRequestEditValidation.Result });
    }
}