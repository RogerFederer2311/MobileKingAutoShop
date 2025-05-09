using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MySqlConnector;

namespace MobileKingAutoShop.Server.Services
{
    public static class InvoicesServices
    {
        private static MySqlConnection mySqlConnection = new MySqlConnection(Secrets.SQL_CONNECTION_STRING);
        // Gets
        internal static IActionResult GetInvoices()
        {
            List<Invoice> invoices = new List<Invoice>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_INVOICES_COLUMNS} FROM {AppSettings.INVOICES_TABLE}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    invoices.Add
                        (
                        new Invoice
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetDecimal(2),
                            reader.GetDateTime(3)
                            )
                        );
                }
            }
            catch (Exception error)
            {
                return new BadRequestObjectResult(error.Message);
            }
            finally
            {
                mySqlConnection.Close();
            }
            return new OkObjectResult(invoices);
        }
        internal static IActionResult GetInvoicesByServiceRequestID(int serviceRequestID)
        {
            List<Invoice> invoices = new List<Invoice>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_INVOICES_COLUMNS} FROM {AppSettings.INVOICES_TABLE} WHERE service_request_id = {serviceRequestID}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    invoices.Add
                        (
                        new Invoice
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetDecimal(2),
                            reader.GetDateTime(3)
                            )
                        );
                }
            }
            catch (Exception error)
            {
                return new BadRequestObjectResult(error.Message);
            }
            finally
            {
                mySqlConnection.Close();
            }
            return new OkObjectResult(invoices);
        }
        internal static IActionResult GetInvoiceByID(int id)
        {
            Invoice invoice = new Invoice();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_INVOICES_COLUMNS} FROM {AppSettings.INVOICES_TABLE} WHERE invoice_id = {id}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    invoice = new Invoice
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetDecimal(2),
                            reader.GetDateTime(3)
                            );
                }
            }
            catch (Exception error)
            {
                return new BadRequestObjectResult(error.Message);
            }
            finally
            {
                mySqlConnection.Close();
            }
            return new OkObjectResult(invoice);
        }
        // Posts
        internal static CommonResponse AddInvoice(Invoice invoice)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.INVOICES_TABLE} ({AppSettings.ADD_INVOICES_COLUMNS}) VALUES (@serviceRequestID, @amount, @dueDate)", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@serviceRequestID", MySqlDbType.Int32).Value = invoice.ServiceRequestID;
                mySqlCommand.Parameters.Add("@amount", MySqlDbType.Decimal).Value = invoice.Amount;
                mySqlCommand.Parameters.Add("@dueDate", MySqlDbType.DateTime).Value = invoice.DueDate;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "Invoice was added successfully!";
            }
            catch (Exception e)
            {
                result = "Invoice was not added: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Put
        internal static CommonResponse EditInvoice(Invoice invoice)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"UPDATE {AppSettings.INVOICES_TABLE} SET service_request_id = @serviceRequestID, amount = @amount, due_date = @dueDate, WHERE invoice_id = @invoiceID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@invoiceID", MySqlDbType.Int32).Value = invoice.InvoiceID;
                mySqlCommand.Parameters.Add("@serviceRequestID", MySqlDbType.Int32).Value = invoice.ServiceRequestID;
                mySqlCommand.Parameters.Add("@amount", MySqlDbType.Decimal).Value = invoice.Amount;
                mySqlCommand.Parameters.Add("@dueDate", MySqlDbType.DateTime).Value = invoice.DueDate;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "Invoice was edited successfully!";
            }
            catch (Exception e)
            {
                result = "Invoice was not edited: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Delete
        internal static CommonResponse DeleteInvoiceByID(int invoiceID)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"DELETE FROM {AppSettings.INVOICES_TABLE} WHERE invoice_id = @invoiceID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@invoiceID", MySqlDbType.Int32).Value = invoiceID;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "Invoice was deleted successfully!";
            }
            catch (Exception e)
            {
                result = "Invoice was not deleted: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
    }
}
