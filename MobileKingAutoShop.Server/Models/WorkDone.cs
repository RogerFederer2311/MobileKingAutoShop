namespace MobileKingAutoShop.Server.Models 
{
    public class WorkDone
    {
        public int WorkDoneID { get; set; } = 0;
        public int JobAssignmentID { get; set; } = 0;
        public string Description { get; set; } = string.Empty;

        public WorkDone()
        {

        }
        public WorkDone(
            int workDoneID,
            int jobAssignmentID,
            string description
        )
        {
            WorkDoneID = workDoneID;
            JobAssignmentID = jobAssignmentID;
            Description = description;
        }
    }
}