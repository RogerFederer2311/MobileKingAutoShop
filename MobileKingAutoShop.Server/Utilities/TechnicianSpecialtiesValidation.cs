using MobileKingAutoShop.Server.Models;
using Newtonsoft.Json;
using System.Text;

namespace MobileKingAutoShop.Server.Utilities
{
    public class TechnicianSpecialtiesValidation
    {
        public static async Task<TechnicianSpecialtyResponse> CheckAddTechnicianSpecialtyModel(HttpRequest request)
        {
            TechnicianSpecialty technicianSpecialty = new TechnicianSpecialty();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new TechnicianSpecialtyResponse(isValid, result, technicianSpecialty);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            TechnicianSpecialty requestData = JsonConvert.DeserializeObject<TechnicianSpecialty>(requestBody);
            
            string technicianEmail = requestData.TechnicianEmail;
            technicianSpecialty.TechnicianEmail = technicianEmail;

            string specialty = requestData.Specialty;
            technicianSpecialty.Specialty = specialty;

            return new TechnicianSpecialtyResponse(isValid, result, technicianSpecialty);
        }
        public static async Task<TechnicianSpecialtyResponse> CheckEditTechnicianSpecialtyModel(HttpRequest request)
        {
            TechnicianSpecialty technicianSpecialty = new TechnicianSpecialty();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new TechnicianSpecialtyResponse(isValid, result, technicianSpecialty);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            TechnicianSpecialty requestData = JsonConvert.DeserializeObject<TechnicianSpecialty>(requestBody);

            int specialtyID = requestData.SpecialtyID;
            technicianSpecialty.SpecialtyID = specialtyID;

            string technicianEmail = requestData.TechnicianEmail;
            technicianSpecialty.TechnicianEmail = technicianEmail;

            string specialty = requestData.Specialty;
            technicianSpecialty.Specialty = specialty;

            return new TechnicianSpecialtyResponse(isValid, result, technicianSpecialty);
        }
    }
}