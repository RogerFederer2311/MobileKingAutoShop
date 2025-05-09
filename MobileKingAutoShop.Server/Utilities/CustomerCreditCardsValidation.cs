using MobileKingAutoShop.Server.Models;
using Newtonsoft.Json;
using System.Text;

namespace MobileKingAutoShop.Server.Utilities
{
    public class CustomerCreditCardsValidation
    {
        public static async Task<CustomerCreditCardResponse> CheckAddCustomerCreditCardModel(HttpRequest request)
        {
            CustomerCreditCard customerCreditCard = new CustomerCreditCard();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new CustomerCreditCardResponse(isValid, result, customerCreditCard);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            CustomerCreditCard requestData = JsonConvert.DeserializeObject<CustomerCreditCard>(requestBody);

            string customerEmail = requestData.CustomerEmail;
            customerCreditCard.CustomerEmail = customerEmail;

            string cardNumber = requestData.CardNumber;
            customerCreditCard.CardNumber = cardNumber;

            int securityCode = requestData.SecurityCode;
            customerCreditCard.SecurityCode = securityCode;

            DateTime expirationDate = requestData.ExpirationDate;
            customerCreditCard.ExpirationDate = expirationDate;

            bool isHidden = requestData.IsHidden;
            customerCreditCard.IsHidden = isHidden;

            return new CustomerCreditCardResponse(isValid, result, customerCreditCard);
        }
        public static async Task<CustomerCreditCardResponse> CheckEditCustomerCreditCardModel(HttpRequest request)
        {
            CustomerCreditCard customerCreditCard = new CustomerCreditCard();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new CustomerCreditCardResponse(isValid, result, customerCreditCard);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            CustomerCreditCard requestData = JsonConvert.DeserializeObject<CustomerCreditCard>(requestBody);

            int customerCreditCardID = requestData.CreditCardID;
            customerCreditCard.CreditCardID = customerCreditCardID;
            
            string customerEmail = requestData.CustomerEmail;
            customerCreditCard.CustomerEmail = customerEmail;

            string cardNumber = requestData.CardNumber;
            customerCreditCard.CardNumber = cardNumber;

            int securityCode = requestData.SecurityCode;
            customerCreditCard.SecurityCode = securityCode;

            DateTime expirationDate = requestData.ExpirationDate;
            customerCreditCard.ExpirationDate = expirationDate;

            bool isHidden = requestData.IsHidden;
            customerCreditCard.IsHidden = isHidden;

            return new CustomerCreditCardResponse(isValid, result, customerCreditCard);
        }
    }
}