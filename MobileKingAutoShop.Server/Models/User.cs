namespace MobileKingAutoShop.Server.Models
{
    public class User
    {
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string OtherGender {  get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        public User()
        {

        }

        public User(
            string email, 
            string firstName,
            string lastName,
            string phoneNumber,
            string gender,
            string otherGender,
            string password,
            string role,
            string address,
            string city,
            string state,
            string zipCode,
            string country
            )
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            Gender = gender;
            OtherGender = otherGender;
            Password = password;
            Role = role;
            Address = address;
            City = city;
            State = state;
            ZipCode = zipCode;
            Country = country;
        }

    }
}
