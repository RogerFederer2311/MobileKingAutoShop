namespace MobileKingAutoShop.Server.Models
{
    public class TechnicianSpecialtyResponse: ServiceResponse
    {
        public TechnicianSpecialty TechnicianSpecialty { get; set; } = new TechnicianSpecialty();

        public TechnicianSpecialtyResponse(bool isSuccessful, string result, TechnicianSpecialty technicianSpecialty): base(isSuccessful, result)
        {
            TechnicianSpecialty = technicianSpecialty;
        }
    }
}