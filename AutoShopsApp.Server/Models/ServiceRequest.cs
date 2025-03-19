namespace AutoShopsApp.Server.Models
{
    public class ServiceRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int TechnicianId { get; set; }  // Technician assigned (nullable)
        public string ServiceType { get; set; }
        public string Status { get; set; } // "Pending", "In Progress", "Completed"
        public DateTime AppointmentDate { get; set; }
    }
}
