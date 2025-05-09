using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MobileKingAutoShop.Server.Services;
using MobileKingAutoShop.Server.Utilities;

namespace MobileKingAutoShop.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    // Get Methods
    [HttpGet]
    public IActionResult GetUsers()
    {
        return UsersServices.GetUsers();
    }
    [HttpGet("by-email/{email}")]
    public IActionResult GetUserByEmail(string email)
    {
        return UsersServices.GetUserByEmail(email);
    }
    // Post Methods
    [HttpPost("add")]
    public IActionResult AddUser()
    {
        Task<UserResponse> userModelValidation = UsersValidation.CheckAddEditUserModel(Request);
        UserResponse userModelValidationResult = userModelValidation.Result;
        if (!userModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = userModelValidationResult.Result });
        }
        CommonResponse userAddValidation = UsersServices.AddUser(userModelValidationResult.User);
        if (!userAddValidation.IsSuccessful)
        {
            return BadRequest(new { response = userAddValidation.Result });
        }
        return Ok(new { response = userAddValidation.Result });
    }
    [HttpPost("login")]
    public IActionResult LoginUser()
    {
        Task<UserResponse> userModelValidation = UsersValidation.CheckAddEditUserModel(Request);
        UserResponse userModelValidationResult = userModelValidation.Result;
        if (!userModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = userModelValidationResult.Result });
        }
        return UsersServices.LoginUser(userModelValidationResult.User);
    }
    // Put Methods
    [HttpPut("edit/{email}")]
    public IActionResult EditUser()
    {
        Task<UserResponse> userModelValidation = UsersValidation.CheckAddEditUserModel(Request);
        UserResponse userModelValidationResult = userModelValidation.Result;
        if (!userModelValidationResult.IsSuccessful)
        {
            return BadRequest(new { response = userModelValidationResult.Result });
        }
        CommonResponse userEditValidation = UsersServices.EditUser(userModelValidationResult.User);
        if (!userEditValidation.IsSuccessful)
        {
            return BadRequest(new { response = userEditValidation.Result });
        }
        return Ok(new { response = userEditValidation.Result });
    }
}