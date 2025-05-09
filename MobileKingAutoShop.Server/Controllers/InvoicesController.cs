using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MobileKingAutoShop.Server.Services;
using MobileKingAutoShop.Server.Utilities;

namespace MobileKingAutoShop.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class InvoicesController : ControllerBase
{
    // Get Methods
    [HttpGet]
    public IActionResult GetInvoices()
    {
        return InvoicesServices.GetInvoices();
    }
    [HttpGet("by-service-request/{id}")]
    public IActionResult GetInvoicesByServiceRequestID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return InvoicesServices.GetInvoicesByServiceRequestID(idNumber);
    }
    [HttpGet("by-id/{id}")]
    public IActionResult GetInvoiceByID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return InvoicesServices.GetInvoiceByID(idNumber);
    }
    // Post Methods
    [HttpPost("add")]
    public IActionResult AddInvoice()
    {
        Task<InvoiceResponse> invoiceModelValidation = InvoicesValidation.CheckAddInvoiceModel(Request);
        InvoiceResponse invoiceModelValidationResult = invoiceModelValidation.Result;
        if (!invoiceModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = invoiceModelValidationResult.Result });
        }
        CommonResponse invoiceAddValidation = InvoicesServices.AddInvoice(invoiceModelValidationResult.Invoice);
        if (!invoiceAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = invoiceAddValidation.Result });
        }
        return Ok(new { response = invoiceAddValidation.Result });
    }
    // Put Methods
    [HttpPut("edit/{id}")]
    public IActionResult EditInvoice()
    {
        Task<InvoiceResponse> invoiceModelValidation = InvoicesValidation.CheckEditInvoiceModel(Request);
        InvoiceResponse invoiceModelValidationResult = invoiceModelValidation.Result;
        if (!invoiceModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = invoiceModelValidationResult.Result });
        }
        CommonResponse invoiceEditValidation = InvoicesServices.EditInvoice(invoiceModelValidationResult.Invoice);
        if (!invoiceEditValidation.IsSuccessful)
        {
            return BadRequest(new { response = invoiceEditValidation.Result });
        }
        return Ok(new { response = invoiceEditValidation.Result });
    }
    // Delete Methods
    [HttpDelete("delete/{id}")]
    public IActionResult DeleteInvoice(string id)
    {
        int idNumber = Convert.ToInt32(id);
        CommonResponse invoiceDeleteValidation = InvoicesServices.DeleteInvoiceByID(idNumber);
        if (!invoiceDeleteValidation.IsSuccessful)
        {
            return BadRequest(new { response = invoiceDeleteValidation.Result });
        }
        return Ok(new { response = invoiceDeleteValidation.Result });
    }
}