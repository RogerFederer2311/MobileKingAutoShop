namespace MobileKingAutoShop.Server.Models 
{
    public class Payment
    {
        public int PaymentID { get; set; } = 0;
        public int CreditCardID { get; set; } = 0;
        public int InvoiceID { get; set; } = 0;
        public decimal Amount { get; set; } = 0;
        public DateTime PaymentDate { get; set; } = DateTime.Now;

        public Payment()
        {

        }
        public Payment(
            int paymentID,
            int creditCardID,
            int invoiceID,
            decimal amount,
            DateTime paymentDate
        )
        {
            PaymentID = paymentID;
            CreditCardID = creditCardID;
            InvoiceID = invoiceID;
            Amount = amount;
            PaymentDate = paymentDate;
        }
    }
}