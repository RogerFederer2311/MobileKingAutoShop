using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MySqlConnector;

namespace MobileKingAutoShop.Server.Services
{
    public static class PaymentsServices
    {
        private static MySqlConnection mySqlConnection = new MySqlConnection(Secrets.SQL_CONNECTION_STRING);
        // Gets
        internal static IActionResult GetPayments()
        {
            List<Payment> payments = new List<Payment>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_PAYMENTS_COLUMNS} FROM {AppSettings.PAYMENTS_TABLE}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    payments.Add
                        (
                        new Payment
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetInt32(2),
                            reader.GetDecimal(3),
                            reader.GetDateTime(4)
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
            return new OkObjectResult(payments);
        }
        internal static IActionResult GetPaymentsByInvoiceID(int invoiceID)
        {
            List<Payment> payments = new List<Payment>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_PAYMENTS_COLUMNS} FROM {AppSettings.PAYMENTS_TABLE} WHERE invoice_id = {invoiceID}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    payments.Add
                        (
                        new Payment
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetInt32(2),
                            reader.GetDecimal(3),
                            reader.GetDateTime(4)
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
            return new OkObjectResult(payments);
        }
        internal static IActionResult GetPaymentByID(int id)
        {
            Payment payment = new Payment();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_PAYMENTS_COLUMNS} FROM {AppSettings.PAYMENTS_TABLE} WHERE payment_id = {id}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    payment = new Payment
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetInt32(2),
                            reader.GetDecimal(3),
                            reader.GetDateTime(4)
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
            return new OkObjectResult(payment);
        }
        // Posts
        internal static CommonResponse AddPayment(Payment payment)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.PAYMENTS_TABLE} ({AppSettings.ADD_PAYMENTS_COLUMNS}) VALUES (@creditCardID, @invoiceID, @amount, @paymentDate)", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@creditCardID", MySqlDbType.Int32).Value = payment.CreditCardID;
                mySqlCommand.Parameters.Add("@invoiceID", MySqlDbType.Int32).Value = payment.InvoiceID;
                mySqlCommand.Parameters.Add("@amount", MySqlDbType.Decimal).Value = payment.Amount;
                mySqlCommand.Parameters.Add("@paymentDate", MySqlDbType.Decimal).Value = payment.PaymentDate;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "Payment was added successfully!";
            }
            catch (Exception e)
            {
                result = "Payment was not added: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        internal static CommonResponse AddPaymentWithCard(PaymentWithCard paymentWithCard)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCardCommand;
            mySqlCardCommand = new MySqlCommand($"INSERT INTO {AppSettings.CUSTOMER_CREDIT_CARDS_TABLE} ({AppSettings.ADD_CUSTOMER_CREDIT_CARDS_COLUMNS}) VALUES (@customerEmail, @cardNumber, @securityCode, @expirationDate, @isHidden)", mySqlConnection);
            try
            {
                mySqlCardCommand.Parameters.Add("@customerEmail", MySqlDbType.VarChar).Value = paymentWithCard.CustomerEmail;
                mySqlCardCommand.Parameters.Add("@cardNumber", MySqlDbType.VarChar).Value = paymentWithCard.CardNumber;
                mySqlCardCommand.Parameters.Add("@securityCode", MySqlDbType.VarChar).Value = paymentWithCard.SecurityCode;
                mySqlCardCommand.Parameters.Add("@expirationDate", MySqlDbType.DateTime).Value = paymentWithCard.ExpirationDate;
                mySqlCardCommand.Parameters.Add("@isHidden", MySqlDbType.Bool).Value = false;
                mySqlCardCommand.Connection = mySqlConnection;
                mySqlCardCommand.ExecuteNonQuery();
                isSuccessful = true;

                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.PAYMENTS_TABLE} ({AppSettings.ADD_PAYMENTS_COLUMNS}) VALUES (@creditCardID, @invoiceID, @amount, @paymentDate)", mySqlConnection);
                try
                {
                    mySqlCommand.Parameters.Add("@creditCardID", MySqlDbType.Int32).Value = mySqlCardCommand.LastInsertedId;
                    mySqlCommand.Parameters.Add("@invoiceID", MySqlDbType.Int32).Value = paymentWithCard.InvoiceID;
                    mySqlCommand.Parameters.Add("@amount", MySqlDbType.Decimal).Value = paymentWithCard.Amount;
                    mySqlCommand.Parameters.Add("@paymentDate", MySqlDbType.Decimal).Value = paymentWithCard.PaymentDate;
                    mySqlCommand.Connection = mySqlConnection;
                    mySqlCommand.ExecuteNonQuery();
                    isSuccessful = true;
                    result = "Payment was added successfully!";
                }
                catch (Exception e)
                {
                    result = "Payment was not added: " + e.Message;
                    isSuccessful = false;
                }
            }
            catch (Exception e)
            {
                result = "CreditCard was not added: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Put
        internal static CommonResponse EditPayment(Payment payment)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"UPDATE {AppSettings.PAYMENTS_TABLE} SET credit_card_id = @creditCardID, invoice_id = @invoiceID, amount = @amount, payment = @payment WHERE payment_id = @paymentID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@paymentID", MySqlDbType.Int32).Value = payment.PaymentID;
                mySqlCommand.Parameters.Add("@creditCardID", MySqlDbType.Int32).Value = payment.CreditCardID;
                mySqlCommand.Parameters.Add("@invoiceID", MySqlDbType.Int32).Value = payment.InvoiceID;
                mySqlCommand.Parameters.Add("@amount", MySqlDbType.Decimal).Value = payment.Amount;
                mySqlCommand.Parameters.Add("@paymentDate", MySqlDbType.Decimal).Value = payment.PaymentDate;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "Payment was edited successfully!";
            }
            catch (Exception e)
            {
                result = "Payment was not edited: " + e.Message;
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
