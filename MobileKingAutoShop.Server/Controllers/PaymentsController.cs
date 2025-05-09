using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MobileKingAutoShop.Server.Services;
using MobileKingAutoShop.Server.Utilities;

namespace MobileKingAutoShop.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class PaymentsController : ControllerBase
{
    // Get Methods
    [HttpGet]
    public IActionResult GetPayments()
    {
        return PaymentsServices.GetPayments();
    }
    [HttpGet("by-invoice/{id}")]
    public IActionResult GetPaymentsByInvoiceID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return PaymentsServices.GetPaymentsByInvoiceID(idNumber);
    }
    [HttpGet("by-id/{id}")]
    public IActionResult GetPaymentByID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return PaymentsServices.GetPaymentByID(idNumber);
    }
    // Post Methods
    [HttpPost("add")]
    public IActionResult AddPayment()
    {
        Task<PaymentResponse> paymentModelValidation = PaymentsValidation.CheckAddPaymentModel(Request);
        PaymentResponse paymentModelValidationResult = paymentModelValidation.Result;
        if (!paymentModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = paymentModelValidationResult.Result });
        }
        CommonResponse paymentAddValidation = PaymentsServices.AddPayment(paymentModelValidationResult.Payment);
        if (!paymentAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = paymentAddValidation.Result });
        }
        return Ok(new { response = paymentAddValidation.Result });
    }
    [HttpPost("add-with-card")]
    public IActionResult AddPaymentWithCard()
    {
        Task<PaymentWithCardResponse> paymentWithCardModelValidation = PaymentsValidation.CheckAddPaymentWithCardModel(Request);
        PaymentWithCardResponse paymentWithCardModelValidationResult = paymentWithCardModelValidation.Result;
        if (!paymentWithCardModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = paymentWithCardModelValidationResult.Result });
        }
        CommonResponse paymentWithCardAddValidation = PaymentsServices.AddPaymentWithCard(paymentWithCardModelValidationResult.PaymentWithCard);
        if (!paymentWithCardAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = paymentWithCardAddValidation.Result });
        }
        return Ok(new { response = paymentWithCardAddValidation.Result });
    }
    // Put Methods
    [HttpPut("edit/{id}")]
    public IActionResult EditPayment()
    {
        Task<PaymentResponse> paymentModelValidation = PaymentsValidation.CheckEditPaymentModel(Request);
        PaymentResponse paymentModelValidationResult = paymentModelValidation.Result;
        if (!paymentModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = paymentModelValidationResult.Result });
        }
        CommonResponse paymentEditValidation = PaymentsServices.EditPayment(paymentModelValidationResult.Payment);
        if (!paymentEditValidation.IsSuccessful)
        {
            return BadRequest(new { response = paymentEditValidation.Result });
        }
        return Ok(new { response = paymentEditValidation.Result });
    }
}