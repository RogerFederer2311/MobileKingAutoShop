using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MobileKingAutoShop.Server.Services;
using MobileKingAutoShop.Server.Utilities;

namespace MobileKingAutoShop.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerCreditCardsController : ControllerBase
{
    // Get Methods
    [HttpGet]
    public IActionResult GetCustomerCreditCards()
    {
        return CustomerCreditCardsServices.GetCustomerCreditCards();
    }
    [HttpGet("by-email/{email}")]
    public IActionResult GetCustomerCreditCardsByEmail(string email)
    {
        return CustomerCreditCardsServices.GetCustomerCreditCardsByEmail(email);
    }
    [HttpGet("by-id/{id}")]
    public IActionResult GetCustomerCreditCardByID(string id)
    {
        int idNumber = Convert.ToInt32(id);
        return CustomerCreditCardsServices.GetCustomerCreditCardByID(idNumber);
    }
    // Post Methods
    [HttpPost("add")]
    public IActionResult AddCustomerCreditCard()
    {
        Task<CustomerCreditCardResponse> customerCreditCardModelValidation = CustomerCreditCardsValidation.CheckAddCustomerCreditCardModel(Request);
        CustomerCreditCardResponse customerCreditCardModelValidationResult = customerCreditCardModelValidation.Result;
        if (!customerCreditCardModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = customerCreditCardModelValidationResult.Result });
        }
        CommonResponse customerCreditCardAddValidation = CustomerCreditCardsServices.AddCustomerCreditCard(customerCreditCardModelValidationResult.CustomerCreditCard);
        if (!customerCreditCardAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = customerCreditCardAddValidation.Result });
        }
        return Ok(new { response = customerCreditCardAddValidation.Result });
    }
    // Put Methods
    [HttpPut("edit/{id}")]
    public IActionResult EditCustomerCreditCard()
    {
        Task<CustomerCreditCardResponse> customerCreditCardModelValidation = CustomerCreditCardsValidation.CheckEditCustomerCreditCardModel(Request);
        CustomerCreditCardResponse customerCreditCardModelValidationResult = customerCreditCardModelValidation.Result;
        if (!customerCreditCardModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = customerCreditCardModelValidationResult.Result });
        }
        CommonResponse customerCreditCardEditValidation = CustomerCreditCardsServices.EditCustomerCreditCard(customerCreditCardModelValidationResult.CustomerCreditCard);
        if (!customerCreditCardEditValidation.IsSuccessful)
        {
            return BadRequest(new { response = customerCreditCardEditValidation.Result });
        }
        return Ok(new { response = customerCreditCardEditValidation.Result });
    }
    // Delete Methods
    [HttpDelete("delete/{id}")]
    public IActionResult DeleteCustomerCreditCard(string id)
    {
        int idNumber = Convert.ToInt32(id);
        CommonResponse customerCreditCardDeleteValidation = CustomerCreditCardsServices.DeleteCustomerCreditCardByID(idNumber);
        if (!customerCreditCardDeleteValidation.IsSuccessful)
        {
            return BadRequest(new { response = customerCreditCardDeleteValidation.Result });
        }
        return Ok(new { response = customerCreditCardDeleteValidation.Result });
    }
}