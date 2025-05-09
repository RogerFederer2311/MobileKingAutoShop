namespace MobileKingAutoShop.Server.Models
{
    public class VehicleResponse: ServiceResponse
    {

        public Vehicle Vehicle { get; set; } = new Vehicle();

        public VehicleResponse(bool isSuccessful, string result, Vehicle vehicle): base(isSuccessful, result)
        {
            Vehicle = vehicle;
        }
    }
}
