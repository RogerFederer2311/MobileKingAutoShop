namespace MobileKingAutoShop.Server.Models 
{
    public class PaymentWithCard
    {
        public int PaymentID { get; set; } = 0;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CardNumber { get; set; } = string.Empty;
        public int SecurityCode { get; set; } = 0;
        public DateTime ExpirationDate { get; set; } = DateTime.Now;
        public bool IsHidden { get; set; } = true;
        public int InvoiceID { get; set; } = 0;
        public decimal Amount { get; set; } = 0;
        public DateTime PaymentDate { get; set; } = DateTime.Now;

        public PaymentWithCard()
        {

        }
        public PaymentWithCard(
            int paymentID,
            string customerEmail,
            string cardNumber,
            int securityCode,
            DateTime expirationDate,
            int invoiceID,
            decimal amount,
            DateTime paymentDate
        )
        {
            PaymentID = paymentID;
            CustomerEmail = customerEmail;
            CardNumber = cardNumber;
            SecurityCode = securityCode;
            ExpirationDate = expirationDate;
            InvoiceID = invoiceID;
            Amount = amount;
            PaymentDate = paymentDate;
        }
    }
}