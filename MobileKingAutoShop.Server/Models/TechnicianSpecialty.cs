namespace MobileKingAutoShop.Server.Models
{
    public class TechnicianSpecialty
    {
        public int SpecialtyID { get; set; } = 0;
        public string TechnicianEmail { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;

        public TechnicianSpecialty()
        {

        }
        public TechnicianSpecialty(
            int specialtyID,
            string technicianEmail,
            string specialty
            )
        {
            SpecialtyID = specialtyID;
            TechnicianEmail = technicianEmail;
            Specialty = specialty;
        }
    }
}
