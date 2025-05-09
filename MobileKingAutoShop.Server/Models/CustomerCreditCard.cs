namespace MobileKingAutoShop.Server.Models 
{
    public class CustomerCreditCard
    {
        public int CreditCardID { get; set; } = 0;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CardNumber { get; set; } = string.Empty;
        public int SecurityCode { get; set; } = 0;
        public DateTime ExpirationDate { get; set; } = DateTime.Now;
        public bool IsHidden { get; set; } = false;

        public CustomerCreditCard()
        {

        }
        public CustomerCreditCard(
            int creditCardID,
            string customerEmail,
            string cardNumber,
            int securityCode,
            DateTime expirationDate,
            bool isHidden
        )
        {
            CreditCardID = creditCardID;
            CustomerEmail = customerEmail;
            CardNumber = cardNumber;
            SecurityCode = securityCode;
            ExpirationDate = expirationDate;
            IsHidden = isHidden;
        }
    }
}