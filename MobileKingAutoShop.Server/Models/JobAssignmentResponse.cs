namespace MobileKingAutoShop.Server.Models
{
    public class JobAssignmentResponse: ServiceResponse
    {

        public JobAssignment JobAssignment { get; set; } = new JobAssignment();

        public JobAssignmentResponse(bool isSuccessful, string result, JobAssignment jobAssignment): base(isSuccessful, result)
        {
            JobAssignment = jobAssignment;
        }
    }
}