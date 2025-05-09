using MobileKingAutoShop.Server.Models;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Text;

namespace MobileKingAutoShop.Server.Utilities
{
    public class ServiceRequestsValidation
    {
        public static async Task<ServiceRequestResponse> CheckAddServiceRequestModel(HttpRequest request)
        {
            ServiceRequest serviceRequest = new ServiceRequest();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new ServiceRequestResponse(isValid, result, serviceRequest);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            ServiceRequest requestData = JsonConvert.DeserializeObject<ServiceRequest>(requestBody);

            string customerEmail = requestData.CustomerEmail;
            serviceRequest.CustomerEmail = customerEmail;

            int vehicleID = requestData.VehicleID;
            serviceRequest.VehicleID = vehicleID;
            
            string issueDescription = requestData.IssueDescription;
            serviceRequest.IssueDescription = issueDescription;

            DateTime serviceDate = requestData.ServiceDate;
            serviceRequest.ServiceDate = serviceDate;

            string status = requestData.Status;
            serviceRequest.Status = status;

            string address = requestData.Address;
            serviceRequest.Address = address;

            string city = requestData.City;
            serviceRequest.City = city;

            string state = requestData.State;
            serviceRequest.State = state;

            string zipCode = requestData.ZipCode;
            serviceRequest.ZipCode = zipCode;

            string country = requestData.Country;
            serviceRequest.Country = country;

            return new ServiceRequestResponse(isValid, result, serviceRequest);
        }
        public static async Task<ServiceRequestResponse> CheckEditServiceRequestModel(HttpRequest request)
        {
            ServiceRequest serviceRequest = new ServiceRequest();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new ServiceRequestResponse(isValid, result, serviceRequest);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            ServiceRequest requestData = JsonConvert.DeserializeObject<ServiceRequest>(requestBody);

            int serviceRequestID = requestData.ServiceRequestID;
            serviceRequest.ServiceRequestID = serviceRequestID;
            
            string customerEmail = requestData.CustomerEmail;
            serviceRequest.CustomerEmail = customerEmail;

            int vehicleID = requestData.VehicleID;
            serviceRequest.VehicleID = vehicleID;
            
            string issueDescription = requestData.IssueDescription;
            serviceRequest.IssueDescription = issueDescription;

            DateTime serviceDate = requestData.ServiceDate;
            serviceRequest.ServiceDate = serviceDate;

            string status = requestData.Status;
            serviceRequest.Status = status;

            string address = requestData.Address;
            serviceRequest.Address = address;

            string city = requestData.City;
            serviceRequest.City = city;

            string state = requestData.State;
            serviceRequest.State = state;

            string zipCode = requestData.ZipCode;
            serviceRequest.ZipCode = zipCode;

            string country = requestData.Country;
            serviceRequest.Country = country;

            return new ServiceRequestResponse(isValid, result, serviceRequest);
        }
        public static async Task<ServiceRequestWithVehicleResponse> CheckAddServiceRequestWithVehicleModel(HttpRequest request)
        {
            ServiceRequestWithVehicle serviceRequestWithVehicle = new ServiceRequestWithVehicle();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new ServiceRequestWithVehicleResponse(isValid, result, serviceRequestWithVehicle);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            ServiceRequestWithVehicle requestData = JsonConvert.DeserializeObject<ServiceRequestWithVehicle>(requestBody);

            string customerEmail = requestData.CustomerEmail;
            serviceRequestWithVehicle.CustomerEmail = customerEmail;
            Debug.WriteLine(serviceRequestWithVehicle.CustomerEmail);

            string make = requestData.Make;
            serviceRequestWithVehicle.Make = make;

            string model = requestData.Model;
            serviceRequestWithVehicle.Model = model;

            string color = requestData.Color;
            serviceRequestWithVehicle.Color = color;

            int year = requestData.Year;
            serviceRequestWithVehicle.Year = year;
            
            string issueDescription = requestData.IssueDescription;
            serviceRequestWithVehicle.IssueDescription = issueDescription;

            DateTime serviceDate = requestData.ServiceDate;
            serviceRequestWithVehicle.ServiceDate = serviceDate;

            string status = requestData.Status;
            serviceRequestWithVehicle.Status = status;

            string address = requestData.Address;
            serviceRequestWithVehicle.Address = address;

            string city = requestData.City;
            serviceRequestWithVehicle.City = city;

            string state = requestData.State;
            serviceRequestWithVehicle.State = state;

            string zipCode = requestData.ZipCode;
            serviceRequestWithVehicle.ZipCode = zipCode;

            string country = requestData.Country;
            serviceRequestWithVehicle.Country = country;

            return new ServiceRequestWithVehicleResponse(isValid, result, serviceRequestWithVehicle);
        }
    }
}