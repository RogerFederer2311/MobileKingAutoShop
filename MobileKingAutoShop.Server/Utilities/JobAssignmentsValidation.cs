using MobileKingAutoShop.Server.Models;
using Newtonsoft.Json;
using System.Text;

namespace MobileKingAutoShop.Server.Utilities
{
    public class JobAssignmentsValidation
    {
        public static async Task<JobAssignmentResponse> CheckAddJobAssignmentModel(HttpRequest request)
        {
            JobAssignment jobAssignment = new JobAssignment();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new JobAssignmentResponse(isValid, result, jobAssignment);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            JobAssignment requestData = JsonConvert.DeserializeObject<JobAssignment>(requestBody);
            
            int serviceRequestID = requestData.ServiceRequestID;
            jobAssignment.ServiceRequestID = serviceRequestID;

            string technicianEmail = requestData.TechnicianEmail;
            jobAssignment.TechnicianEmail = technicianEmail;

            string status = requestData.Status;
            jobAssignment.Status = status;

            DateTime? startTime = requestData.StartTime;
            jobAssignment.StartTime = startTime;

            DateTime? endTime = requestData.EndTime;
            jobAssignment.EndTime = endTime;

            return new JobAssignmentResponse(isValid, result, jobAssignment);
        }
        public static async Task<JobAssignmentResponse> CheckEditJobAssignmentModel(HttpRequest request)
        {
            JobAssignment jobAssignment = new JobAssignment();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new JobAssignmentResponse(isValid, result, jobAssignment);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            JobAssignment requestData = JsonConvert.DeserializeObject<JobAssignment>(requestBody);

            int jobAssignmentID = requestData.JobAssignmentID;
            jobAssignment.JobAssignmentID = jobAssignmentID;

            int serviceRequestID = requestData.ServiceRequestID;
            jobAssignment.ServiceRequestID = serviceRequestID;

            string technicianEmail = requestData.TechnicianEmail;
            jobAssignment.TechnicianEmail = technicianEmail;

            string status = requestData.Status;
            jobAssignment.Status = status;

            DateTime? startTime = requestData.StartTime;
            jobAssignment.StartTime = startTime;

            DateTime? endTime = requestData.EndTime;
            jobAssignment.EndTime = endTime;

            return new JobAssignmentResponse(isValid, result, jobAssignment);
        }
    }
}