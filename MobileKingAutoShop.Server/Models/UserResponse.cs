namespace MobileKingAutoShop.Server.Models
{
    public class UserResponse: ServiceResponse
    {

        public User User { get; set; } = new User();

        public UserResponse(bool isSuccessful, string result, User user): base(isSuccessful, result)
        {
            User = user;
        }
    }
}