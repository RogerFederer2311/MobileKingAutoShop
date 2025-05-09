using MobileKingAutoShop.Server.Models;
using Newtonsoft.Json;
using System.Text;

namespace MobileKingAutoShop.Server.Utilities
{
    public class PaymentsValidation
    {
        public static async Task<PaymentResponse> CheckAddPaymentModel(HttpRequest request)
        {
            Payment payment = new Payment();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new PaymentResponse(isValid, result, payment);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            Payment requestData = JsonConvert.DeserializeObject<Payment>(requestBody);

            int creditCardID = requestData.CreditCardID;
            payment.CreditCardID = creditCardID;

            int invoiceID = requestData.InvoiceID;
            payment.InvoiceID = invoiceID;

            decimal amount = requestData.Amount;
            payment.Amount = amount;

            DateTime paymentDate = requestData.PaymentDate;
            payment.PaymentDate = paymentDate;

            return new PaymentResponse(isValid, result, payment);
        }
        public static async Task<PaymentResponse> CheckEditPaymentModel(HttpRequest request)
        {
            Payment payment = new Payment();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new PaymentResponse(isValid, result, payment);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            Payment requestData = JsonConvert.DeserializeObject<Payment>(requestBody);

            int paymentID = requestData.PaymentID;
            payment.PaymentID = paymentID;
            
            int creditCardID = requestData.CreditCardID;
            payment.CreditCardID = creditCardID;

            int invoiceID = requestData.InvoiceID;
            payment.InvoiceID = invoiceID;

            decimal amount = requestData.Amount;
            payment.Amount = amount;

            DateTime paymentDate = requestData.PaymentDate;
            payment.PaymentDate = paymentDate;

            return new PaymentResponse(isValid, result, payment);
        }
        public static async Task<PaymentWithCardResponse> CheckAddPaymentWithCardModel(HttpRequest request)
        {
            PaymentWithCard paymentWithCard = new PaymentWithCard();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new PaymentWithCardResponse(isValid, result, paymentWithCard);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            PaymentWithCard requestData = JsonConvert.DeserializeObject<PaymentWithCard>(requestBody);
            
            string customerEmail = requestData.CustomerEmail;
            paymentWithCard.CustomerEmail = customerEmail;

            string cardNumber = requestData.CardNumber;
            paymentWithCard.CardNumber = cardNumber;

            int securityCode = requestData.SecurityCode;
            paymentWithCard.SecurityCode = securityCode;

            DateTime expirationDate = requestData.ExpirationDate;
            paymentWithCard.ExpirationDate = expirationDate;

            int invoiceID = requestData.InvoiceID;
            paymentWithCard.InvoiceID = invoiceID;

            decimal amount = requestData.Amount;
            paymentWithCard.Amount = amount;

            DateTime paymentDate = requestData.PaymentDate;
            paymentWithCard.PaymentDate = paymentDate;

            return new PaymentWithCardResponse(isValid, result, paymentWithCard);
        }
    }
}