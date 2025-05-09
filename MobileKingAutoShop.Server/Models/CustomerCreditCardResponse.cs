namespace MobileKingAutoShop.Server.Models
{
    public class CustomerCreditCardResponse: ServiceResponse
    {

        public CustomerCreditCard CustomerCreditCard { get; set; } = new CustomerCreditCard();

        public CustomerCreditCardResponse(bool isSuccessful, string result, CustomerCreditCard customerCreditCard): base(isSuccessful, result)
        {
            CustomerCreditCard = customerCreditCard;
        }
    }
}