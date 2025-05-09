namespace MobileKingAutoShop.Server.Models
{
    public class ServiceRequestResponse: ServiceResponse
    {

        public ServiceRequest ServiceRequest { get; set; } = new ServiceRequest();

        public ServiceRequestResponse(bool isSuccessful, string result, ServiceRequest serviceRequest): base(isSuccessful, result)
        {
            ServiceRequest = serviceRequest;
        }
    }
}
