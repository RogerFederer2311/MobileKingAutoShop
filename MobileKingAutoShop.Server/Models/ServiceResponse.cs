namespace MobileKingAutoShop.Server.Models
{
    public class ServiceResponse
    {
        public bool IsSuccessful { get; } = false;
        public string Result { get; } = string.Empty;

        public ServiceResponse(bool isSuccessful, string result)
        {
            IsSuccessful = isSuccessful;
            Result = result;
        }
    }
}
