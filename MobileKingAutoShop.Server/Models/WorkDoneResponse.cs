namespace MobileKingAutoShop.Server.Models
{
    public class WorkDoneResponse: ServiceResponse
    {

        public WorkDone WorkDone { get; set; } = new WorkDone();

        public WorkDoneResponse(bool isSuccessful, string result, WorkDone workDone): base(isSuccessful, result)
        {
            WorkDone = workDone;
        }
    }
}