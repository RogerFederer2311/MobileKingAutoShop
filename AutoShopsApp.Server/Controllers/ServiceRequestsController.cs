using AutoShopsApp.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AutoShopsApp.Server.Controllers
{


    public class ServiceRequestsController : ControllerBase
    {


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceRequest>>> GetServiceRequests()
        {
            return new OkObjectResult(new { });
        }


    }
}

