using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MySqlConnector;

namespace MobileKingAutoShop.Server.Services
{
    public static class CustomerCreditCardsServices
    {
        private static MySqlConnection mySqlConnection = new MySqlConnection(Secrets.SQL_CONNECTION_STRING);
        // Gets
        internal static IActionResult GetCustomerCreditCards()
        {
            List<CustomerCreditCard> customerCreditCards = new List<CustomerCreditCard>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_CUSTOMER_CREDIT_CARDS_COLUMNS} FROM {AppSettings.CUSTOMER_CREDIT_CARDS_TABLE}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    customerCreditCards.Add
                        (
                        new CustomerCreditCard
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetInt32(3),
                            reader.GetDateTime(4),
                            reader.GetBoolean(5)
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
            return new OkObjectResult(customerCreditCards);
        }
        internal static IActionResult GetCustomerCreditCardsByEmail(string email)
        {
            List<CustomerCreditCard> customerCreditCards = new List<CustomerCreditCard>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_CUSTOMER_CREDIT_CARDS_COLUMNS} FROM {AppSettings.CUSTOMER_CREDIT_CARDS_TABLE} WHERE customer_email = '{email}'", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    customerCreditCards.Add
                        (
                        new CustomerCreditCard
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetInt32(3),
                            reader.GetDateTime(4),
                            reader.GetBoolean(5)
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
            return new OkObjectResult(customerCreditCards);
        }
        internal static IActionResult GetCustomerCreditCardByID(int id)
        {
            CustomerCreditCard customerCreditCard = new CustomerCreditCard();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_CUSTOMER_CREDIT_CARDS_COLUMNS} FROM {AppSettings.CUSTOMER_CREDIT_CARDS_TABLE} WHERE credit_card_id = {id}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    customerCreditCard = new CustomerCreditCard
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetInt32(3),
                            reader.GetDateTime(4),
                            reader.GetBoolean(5)
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
            return new OkObjectResult(customerCreditCard);
        }
        // Posts
        internal static CommonResponse AddCustomerCreditCard(CustomerCreditCard customerCreditCard)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.CUSTOMER_CREDIT_CARDS_TABLE} ({AppSettings.ADD_CUSTOMER_CREDIT_CARDS_COLUMNS}) VALUES (@customerEmail, @cardNumber, @securityCode, @expirationDate, @isHidden)", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@customerEmail", MySqlDbType.VarChar).Value = customerCreditCard.CustomerEmail;
                mySqlCommand.Parameters.Add("@cardNumber", MySqlDbType.VarChar).Value = customerCreditCard.CardNumber;
                mySqlCommand.Parameters.Add("@securityCode", MySqlDbType.VarChar).Value = customerCreditCard.SecurityCode;
                mySqlCommand.Parameters.Add("@expirationDate", MySqlDbType.DateTime).Value = customerCreditCard.ExpirationDate;
                mySqlCommand.Parameters.Add("@isHidden", MySqlDbType.Bool).Value = customerCreditCard.IsHidden;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "CreditCard was added successfully!";
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
        internal static CommonResponse EditCustomerCreditCard(CustomerCreditCard customerCreditCard)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"UPDATE {AppSettings.CUSTOMER_CREDIT_CARDS_TABLE} SET customer_email = @customerEmail, card_number = @cardNumber, security_code = @securityCode, expiration_date = @expirationDate, is_hidden = @isHidden WHERE credit_card_id = @creditCardID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@creditCardID", MySqlDbType.Int32).Value = customerCreditCard.CreditCardID;
                mySqlCommand.Parameters.Add("@customerEmail", MySqlDbType.VarChar).Value = customerCreditCard.CustomerEmail;
                mySqlCommand.Parameters.Add("@cardNumber", MySqlDbType.VarChar).Value = customerCreditCard.CardNumber;
                mySqlCommand.Parameters.Add("@securityCode", MySqlDbType.VarChar).Value = customerCreditCard.SecurityCode;
                mySqlCommand.Parameters.Add("@expirationDate", MySqlDbType.DateTime).Value = customerCreditCard.ExpirationDate;
                mySqlCommand.Parameters.Add("@isHidden", MySqlDbType.Bool).Value = customerCreditCard.IsHidden;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "CreditCard was edited successfully!";
            }
            catch (Exception e)
            {
                result = "CreditCard was not edited: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Delete
        internal static CommonResponse DeleteCustomerCreditCardByID(int customerCreditCardID)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"DELETE FROM {AppSettings.CUSTOMER_CREDIT_CARDS_TABLE} WHERE credit_card_id = @creditCardID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@creditCardID", MySqlDbType.Int32).Value = customerCreditCardID;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "CreditCard was deleted successfully!";
            }
            catch (Exception e)
            {
                result = "CreditCard was not deleted: " + e.Message;
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
