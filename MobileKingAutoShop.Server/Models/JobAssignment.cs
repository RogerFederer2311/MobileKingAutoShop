namespace MobileKingAutoShop.Server.Models 
{
    public class JobAssignment
    {
        public int JobAssignmentID { get; set; } = 0;
        public int ServiceRequestID { get; set; } = 0;
        public string TechnicianEmail { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime? StartTime { get; set; } = DateTime.Now;
        public DateTime? EndTime { get; set; } = DateTime.Now;

        public JobAssignment()
        {

        }
        public JobAssignment(
            int jobAssignmentID,
            int serviceRequestID,
            string technicianEmail,
            string status,
            DateTime? startTime,
            DateTime? endTime
        )
        {
            JobAssignmentID = jobAssignmentID;
            ServiceRequestID = serviceRequestID;
            TechnicianEmail = technicianEmail;
            Status = status;
            StartTime = startTime;
            EndTime = endTime;
        }
    }
}