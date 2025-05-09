using MobileKingAutoShop.Server.Models;
using Newtonsoft.Json;
using System.Text;

namespace MobileKingAutoShop.Server.Utilities
{
    public class InvoicesValidation
    {
        public static async Task<InvoiceResponse> CheckAddInvoiceModel(HttpRequest request)
        {
            Invoice invoice = new Invoice();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new InvoiceResponse(isValid, result, invoice);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            Invoice requestData = JsonConvert.DeserializeObject<Invoice>(requestBody);
            
            int serviceRequestID = requestData.ServiceRequestID;
            invoice.ServiceRequestID = serviceRequestID;

            decimal amount = requestData.Amount;
            invoice.Amount = amount;

            DateTime dueDate = requestData.DueDate;
            invoice.DueDate = dueDate;

            return new InvoiceResponse(isValid, result, invoice);
        }
        public static async Task<InvoiceResponse> CheckEditInvoiceModel(HttpRequest request)
        {
            Invoice invoice = new Invoice();
            bool isValid = true;
            string result = string.Empty;
            if (request.Body == null)
            {
                isValid = false;
                result = "There is no body";
                return new InvoiceResponse(isValid, result, invoice);
            }

            StreamReader reader = new StreamReader(request.Body, Encoding.UTF8);
            string requestBody = await reader.ReadToEndAsync();
            Invoice requestData = JsonConvert.DeserializeObject<Invoice>(requestBody);

            int invoiceID = requestData.InvoiceID;
            invoice.InvoiceID = invoiceID;
            
            int serviceRequestID = requestData.ServiceRequestID;
            invoice.ServiceRequestID = serviceRequestID;

            decimal amount = requestData.Amount;
            invoice.Amount = amount;

            DateTime dueDate = requestData.DueDate;
            invoice.DueDate = dueDate;

            return new InvoiceResponse(isValid, result, invoice);
        }
    }
}