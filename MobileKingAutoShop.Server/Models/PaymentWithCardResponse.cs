namespace MobileKingAutoShop.Server.Models
{
    public class PaymentWithCardResponse: ServiceResponse
    {

        public PaymentWithCard PaymentWithCard { get; set; } = new PaymentWithCard();

        public PaymentWithCardResponse(bool isSuccessful, string result, PaymentWithCard paymentWithCard): base(isSuccessful, result)
        {
            PaymentWithCard = paymentWithCard;
        }
    }
}