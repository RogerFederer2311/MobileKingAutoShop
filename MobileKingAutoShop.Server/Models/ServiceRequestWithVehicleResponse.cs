namespace MobileKingAutoShop.Server.Models
{
    public class ServiceRequestWithVehicleResponse: ServiceResponse
    {

        public ServiceRequestWithVehicle ServiceRequestWithVehicle { get; set; } = new ServiceRequestWithVehicle();

        public ServiceRequestWithVehicleResponse(bool isSuccessful, string result, ServiceRequestWithVehicle serviceRequestAddValidationServiceRequestWithVehicle): base(isSuccessful, result)
        {
            ServiceRequestWithVehicle = serviceRequestAddValidationServiceRequestWithVehicle;
        }
    }
}
