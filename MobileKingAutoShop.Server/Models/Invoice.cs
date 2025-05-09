namespace MobileKingAutoShop.Server.Models 
{
    public class Invoice
    {
        public int InvoiceID { get; set; } = 0;
        public int ServiceRequestID { get; set; } = 0;
        public decimal Amount { get; set; } = 0;
        public DateTime DueDate { get; set; } = DateTime.Now;

        public Invoice()
        {

        }
        public Invoice(
            int invoiceID,
            int serviceRequestID,
            decimal amount,
            DateTime dueDate
        )
        {
            InvoiceID = invoiceID;
            ServiceRequestID = serviceRequestID;
            Amount = amount;
            DueDate = dueDate;
        }
    }
}