using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MySqlConnector;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;

namespace MobileKingAutoShop.Server.Services
{
    public static class UsersServices
    {
        private static MySqlConnection mySqlConnection = new MySqlConnection(Secrets.SQL_CONNECTION_STRING);
        // Gets
        internal static IActionResult GetUsers()
        {
            List<User> users = new List<User>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_USERS_COLUMNS} FROM {AppSettings.USERS_TABLE}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    users.Add
                        (
                        new User
                            (
                            reader.GetString(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.GetString(4),
                            reader.GetString(5),
                            reader.GetString(6),
                            reader.GetString(7),
                            reader.GetString(8),
                            reader.GetString(9),
                            reader.GetString(10),
                            reader.GetString(11),
                            reader.GetString(12)
                            )
                        );
                }
            }
            catch (Exception error)
            {
                return new BadRequestObjectResult(new { response = error.Message });
            }
            finally
            {
                mySqlConnection.Close();
            }
            return new OkObjectResult(users);
        }
        internal static IActionResult GetUserByEmail(string email)
        {
            User user = new User();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_USERS_COLUMNS} FROM {AppSettings.USERS_TABLE} WHERE email = '{email}'", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    user = new User
                            (
                            reader.GetString(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.GetString(4),
                            reader.GetString(5),
                            reader.GetString(6),
                            reader.GetString(7),
                            reader.GetString(8),
                            reader.GetString(9),
                            reader.GetString(10),
                            reader.GetString(11),
                            reader.GetString(12)
                            );
                }
            }
            catch (Exception error)
            {
                return new BadRequestObjectResult(new { response = error.Message });
            }
            finally
            {
                mySqlConnection.Close();
            }
            return new OkObjectResult(user);
        }
        // Posts
        internal static CommonResponse AddUser(User user)
        {
            SHA256 sha256 = SHA256.Create();
            byte[] computedHash;
            UTF8Encoding objUtf8 = new UTF8Encoding();
            computedHash = sha256.ComputeHash(objUtf8.GetBytes(user.Password));
            string passwordHash = BitConverter.ToString(computedHash).Replace("-", "").ToLower();

            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;

            mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.USERS_TABLE} ({AppSettings.ADD_USERS_COLUMNS}) VALUES (@email, @firstName, @lastName, @phoneNumber, @gender, @otherGender, @password, @role, @address, @city, @state, @zipCode, @country)", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@email", MySqlDbType.VarChar).Value = user.Email;
                mySqlCommand.Parameters.Add("@firstName", MySqlDbType.VarChar).Value = user.FirstName;
                mySqlCommand.Parameters.Add("@lastName", MySqlDbType.VarChar).Value = user.LastName;
                mySqlCommand.Parameters.Add("@phoneNumber", MySqlDbType.VarChar).Value = user.PhoneNumber;
                mySqlCommand.Parameters.Add("@gender", MySqlDbType.VarChar).Value = user.Gender;
                mySqlCommand.Parameters.Add("@otherGender", MySqlDbType.VarChar).Value = user.OtherGender;
                mySqlCommand.Parameters.Add("@password", MySqlDbType.VarChar).Value = passwordHash;
                mySqlCommand.Parameters.Add("@role", MySqlDbType.VarChar).Value = user.Role;
                mySqlCommand.Parameters.Add("@address", MySqlDbType.VarChar).Value = user.Address;
                mySqlCommand.Parameters.Add("@city", MySqlDbType.VarChar).Value = user.City;
                mySqlCommand.Parameters.Add("@state", MySqlDbType.VarChar).Value = user.State;
                mySqlCommand.Parameters.Add("@zipCode", MySqlDbType.VarChar).Value = user.ZipCode;
                mySqlCommand.Parameters.Add("@country", MySqlDbType.VarChar).Value = user.Country;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "User was added successfully!";
            }
            catch (Exception e)
            {
                result = "User was not added: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        internal static IActionResult LoginUser(User userToLogin)
        {
            SHA256 sha256 = SHA256.Create();
            byte[] computedHash;
            UTF8Encoding objUtf8 = new UTF8Encoding();
            computedHash = sha256.ComputeHash(objUtf8.GetBytes(userToLogin.Password));
            string passwordHash = BitConverter.ToString(computedHash).Replace("-", "").ToLower();

            User user = new User();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_USERS_COLUMNS} FROM {AppSettings.USERS_TABLE} WHERE email = '{userToLogin.Email}' AND password = '{passwordHash}'", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    user = new User
                            (
                            reader.GetString(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.GetString(4),
                            reader.GetString(5),
                            reader.GetString(6),
                            reader.GetString(7),
                            reader.GetString(8),
                            reader.GetString(9),
                            reader.GetString(10),
                            reader.GetString(11),
                            reader.GetString(12)
                            );
                }
            }
            catch (Exception error)
            {
                return new BadRequestObjectResult(new { response = error.Message });
            }
            finally
            {
                mySqlConnection.Close();
            }

            if (user.Email == string.Empty)
            {
                return new BadRequestObjectResult(new { response = "User not found" });
            }
            return new OkObjectResult(user);
        }
        // Put
        internal static CommonResponse EditUser(User user)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"UPDATE {AppSettings.USERS_TABLE} SET first_name = @firstName, last_name = @lastName, phone_number = @phoneNumber, gender = @gender, other_gender = @otherGender, role = @role, address = @address, city = @city, state = @state, zip_code = @zipCode, country = @country WHERE email = @email", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@email", MySqlDbType.VarChar).Value = user.Email;
                mySqlCommand.Parameters.Add("@firstName", MySqlDbType.VarChar).Value = user.FirstName;
                mySqlCommand.Parameters.Add("@lastName", MySqlDbType.VarChar).Value = user.LastName;
                mySqlCommand.Parameters.Add("@phoneNumber", MySqlDbType.VarChar).Value = user.PhoneNumber;
                mySqlCommand.Parameters.Add("@gender", MySqlDbType.VarChar).Value = user.Gender;
                mySqlCommand.Parameters.Add("@otherGender", MySqlDbType.VarChar).Value = user.OtherGender;
                mySqlCommand.Parameters.Add("@role", MySqlDbType.VarChar).Value = user.Role;
                mySqlCommand.Parameters.Add("@address", MySqlDbType.VarChar).Value = user.Address;
                mySqlCommand.Parameters.Add("@city", MySqlDbType.VarChar).Value = user.City;
                mySqlCommand.Parameters.Add("@state", MySqlDbType.VarChar).Value = user.State;
                mySqlCommand.Parameters.Add("@zipCode", MySqlDbType.VarChar).Value = user.ZipCode;
                mySqlCommand.Parameters.Add("@country", MySqlDbType.VarChar).Value = user.Country;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "User was edited successfully!";
            }
            catch (Exception e)
            {
                result = "User was not edited: " + e.Message;
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
