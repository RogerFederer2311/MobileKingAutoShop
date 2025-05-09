namespace MobileKingAutoShop.Server.Models
{
    public class PaymentResponse: ServiceResponse
    {

        public Payment Payment { get; set; } = new Payment();

        public PaymentResponse(bool isSuccessful, string result, Payment payment): base(isSuccessful, result)
        {
            Payment = payment;
        }
    }
}