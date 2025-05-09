using MobileKingAutoShop.Server.Models;
using Newtonsoft.Json;
using System.Text;

namespace MobileKingAutoShop.Server.Utilities
{
    public class UsersValidation
    {
        public static async Task<UserResponse> CheckAddEditUserModel(HttpRequest request)
        {
            User user = new User();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new UserResponse(isValid, result, user);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            User requestData = JsonConvert.DeserializeObject<User>(requestBody);

            string email = requestData.Email;
            user.Email = email;
            
            string firstName = requestData.FirstName;
            user.FirstName = firstName;

            string lastName = requestData.LastName;
            user.LastName = lastName;

            string phoneNumber = requestData.PhoneNumber;
            user.PhoneNumber = phoneNumber;

            string gender = requestData.Gender;
            user.Gender = gender;

            string otherGender = requestData.OtherGender;
            user.OtherGender = otherGender;
            
            string password = requestData.Password;
            user.Password = password;

            string role = requestData.Role;
            user.Role = role;

            string address = requestData.Address;
            user.Address = address;

            string city = requestData.City;
            user.City = city;

            string state = requestData.State;
            user.State = state;

            string zipCode = requestData.ZipCode;
            user.ZipCode = zipCode;

            string country = requestData.Country;
            user.Country = country;

            return new UserResponse(isValid, result, user);
        }
    }
}