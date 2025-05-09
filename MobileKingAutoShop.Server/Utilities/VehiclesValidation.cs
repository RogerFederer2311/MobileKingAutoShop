using MobileKingAutoShop.Server.Models;
using Newtonsoft.Json;
using System.Text;

namespace MobileKingAutoShop.Server.Utilities
{
    public class VehiclesValidation
    {
        public static async Task<VehicleResponse> CheckAddVehicleModel(HttpRequest request)
        {
            Vehicle vehicle = new Vehicle();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new VehicleResponse(isValid, result, vehicle);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            Vehicle requestData = JsonConvert.DeserializeObject<Vehicle>(requestBody);

            string customerEmail = requestData.CustomerEmail;
            vehicle.CustomerEmail = customerEmail;
            
            string vin = requestData.VIN;
            vehicle.VIN = vin;

            string licensePlate = requestData.LicensePlate;
            vehicle.LicensePlate = licensePlate;

            string make = requestData.Make;
            vehicle.Make = make;

            string model = requestData.Model;
            vehicle.Model = model;

            int year = requestData.Year;
            vehicle.Year = year;

            string color = requestData.Color;
            vehicle.Color = color;

            bool isHidden = requestData.IsHidden;
            vehicle.IsHidden = isHidden;

            return new VehicleResponse(isValid, result, vehicle);
        }
        public static async Task<VehicleResponse> CheckEditVehicleModel(HttpRequest request)
        {
            Vehicle vehicle = new Vehicle();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new VehicleResponse(isValid, result, vehicle);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            Vehicle requestData = JsonConvert.DeserializeObject<Vehicle>(requestBody);

            int vehicleID = requestData.VehicleID;
            vehicle.VehicleID = vehicleID;
            
            string customerEmail = requestData.CustomerEmail;
            vehicle.CustomerEmail = customerEmail;
            
            string vin = requestData.VIN;
            vehicle.VIN = vin;

            string licensePlate = requestData.LicensePlate;
            vehicle.LicensePlate = licensePlate;

            string make = requestData.Make;
            vehicle.Make = make;

            string model = requestData.Model;
            vehicle.Model = model;

            int year = requestData.Year;
            vehicle.Year = year;

            string color = requestData.Color;
            vehicle.Color = color;

            bool isHidden = requestData.IsHidden;
            vehicle.IsHidden = isHidden;

            return new VehicleResponse(isValid, result, vehicle);
        }
    }
}