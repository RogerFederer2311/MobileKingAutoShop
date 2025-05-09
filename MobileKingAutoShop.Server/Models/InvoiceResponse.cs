namespace MobileKingAutoShop.Server.Models
{
    public class InvoiceResponse: ServiceResponse
    {

        public Invoice Invoice { get; set; } = new Invoice();

        public InvoiceResponse(bool isSuccessful, string result, Invoice invoice): base(isSuccessful, result)
        {
            Invoice = invoice;
        }
    }
}