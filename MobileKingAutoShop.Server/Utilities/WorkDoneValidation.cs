using MobileKingAutoShop.Server.Models;
using Newtonsoft.Json;
using System.Text;

namespace MobileKingAutoShop.Server.Utilities
{
    public class WorkDoneValidation
    {
        public static async Task<WorkDoneResponse> CheckAddWorkDoneModel(HttpRequest request)
        {
            WorkDone workDone = new WorkDone();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new WorkDoneResponse(isValid, result, workDone);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            WorkDone requestData = JsonConvert.DeserializeObject<WorkDone>(requestBody);
            
            int jobAssignmentID = requestData.JobAssignmentID;
            workDone.JobAssignmentID = jobAssignmentID;

            string description = requestData.Description;
            workDone.Description = description;

            return new WorkDoneResponse(isValid, result, workDone);
        }
        public static async Task<WorkDoneResponse> CheckEditWorkDoneModel(HttpRequest request)
        {
            WorkDone workDone = new WorkDone();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new WorkDoneResponse(isValid, result, workDone);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            WorkDone requestData = JsonConvert.DeserializeObject<WorkDone>(requestBody);

            int workDoneID = requestData.WorkDoneID;
            workDone.WorkDoneID = workDoneID;
            
            int jobAssignmentID = requestData.JobAssignmentID;
            workDone.JobAssignmentID = jobAssignmentID;

            string description = requestData.Description;
            workDone.Description = description;

            return new WorkDoneResponse(isValid, result, workDone);
        }
    }
}