namespace MobileKingAutoShop.Server.Models 
{
    public class Vehicle
    {
        public int VehicleID { get; set; } = 0;
        public string CustomerEmail { get; set; } = string.Empty;
        public string VIN { get; set; } = string.Empty;
        public string LicensePlate { get; set; } = string.Empty;
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; } = 0;
        public string Color { get; set; } = string.Empty;
        public bool IsHidden { get; set; } = false;

        public Vehicle ()
        {

        }
        public Vehicle (
            int vehicleID,
            string customerEmail,
            string VIN,
            string licensePlate,
            string make,
            string model,
            int year,
            string color,
            bool isHidden
        )
        {
            VehicleID = vehicleID;
            CustomerEmail = customerEmail;
            this.VIN = VIN;
            LicensePlate = licensePlate;
            Make = make;
            Model = model;
            Year = year;
            Color = color;
            IsHidden = isHidden;
        }
    }
}