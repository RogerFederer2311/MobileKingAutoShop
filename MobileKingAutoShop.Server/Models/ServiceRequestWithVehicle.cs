namespace MobileKingAutoShop.Server.Models
{
    public class ServiceRequestWithVehicle
    {
        public int ServiceRequestID { get; set; } = 0;
        public string CustomerEmail { get; set; } = string.Empty;
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public int Year { get; set; } = 0;
        public string IssueDescription { get; set; } = string.Empty;
        public DateTime ServiceDate { get; set; } = DateTime.Now;
        public string Status { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        public ServiceRequestWithVehicle()
        {
            
        }
        public ServiceRequestWithVehicle(
            int serviceRequestID,
            string customerEmail,
            string make,
            string model,
            string color,
            int year,
            string issueDescription,
            DateTime serviceDate,
            string status,
            string address,
            string city,
            string state,
            string zipCode,
            string country
            )
        {
            ServiceRequestID = serviceRequestID;
            CustomerEmail = customerEmail;
            Make = make;
            Model = model;
            Color = color;
            Year = year;
            IssueDescription = issueDescription;
            ServiceDate = serviceDate;
            Status = status;
            Address = address;
            City = city;
            State = state;
            ZipCode = zipCode;
            Country = country;
        }
    }
}
