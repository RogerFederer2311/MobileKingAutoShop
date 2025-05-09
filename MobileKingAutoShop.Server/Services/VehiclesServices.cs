using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MySqlConnector;

namespace MobileKingAutoShop.Server.Services
{
    public static class VehiclesServices
    {
        private static MySqlConnection mySqlConnection = new MySqlConnection(Secrets.SQL_CONNECTION_STRING);
        // Gets
        internal static IActionResult GetVehicles()
        {
            List<Vehicle> vehicles = new List<Vehicle>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_VEHICLES_COLUMNS} FROM {AppSettings.VEHICLES_TABLE}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    vehicles.Add
                        (
                        new Vehicle
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.GetString(4),
                            reader.GetString(5),
                            reader.GetInt32(6),
                            reader.GetString(7),
                            reader.GetBoolean(8)
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
            return new OkObjectResult(vehicles);
        }
        internal static IActionResult GetVehiclesByEmail(string email)
        {
            List<Vehicle> vehicles = new List<Vehicle>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_VEHICLES_COLUMNS} FROM {AppSettings.VEHICLES_TABLE} WHERE customer_email = '{email}'", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    vehicles.Add
                        (
                        new Vehicle
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.GetString(4),
                            reader.GetString(5),
                            reader.GetInt32(6),
                            reader.GetString(7),
                            reader.GetBoolean(8)
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
            return new OkObjectResult(vehicles);
        }
        internal static IActionResult GetVehicleByID(int id)
        {
            Vehicle vehicle = new Vehicle();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_VEHICLES_COLUMNS} FROM {AppSettings.VEHICLES_TABLE} WHERE vehicle_id = {id}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    vehicle = new Vehicle
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.GetString(4),
                            reader.GetString(5),
                            reader.GetInt32(6),
                            reader.GetString(7),
                            reader.GetBoolean(8)
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
            return new OkObjectResult(vehicle);
        }
        // Posts
        internal static CommonResponse AddVehicle(Vehicle vehicle)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.VEHICLES_TABLE} ({AppSettings.ADD_VEHICLES_COLUMNS}) VALUES (@customerEmail, @VIN, @licensePlate, @make, @model, @year, @color, @isHidden)", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@customerEmail", MySqlDbType.VarChar).Value = vehicle.CustomerEmail;
                mySqlCommand.Parameters.Add("@VIN", MySqlDbType.VarChar).Value = vehicle.VIN;
                mySqlCommand.Parameters.Add("@licensePlate", MySqlDbType.VarChar).Value = vehicle.LicensePlate;
                mySqlCommand.Parameters.Add("@make", MySqlDbType.VarChar).Value = vehicle.Make;
                mySqlCommand.Parameters.Add("@model", MySqlDbType.VarChar).Value = vehicle.Model;
                mySqlCommand.Parameters.Add("@year", MySqlDbType.Int32).Value = vehicle.Year;
                mySqlCommand.Parameters.Add("@color", MySqlDbType.VarChar).Value = vehicle.Color;
                mySqlCommand.Parameters.Add("@isHidden", MySqlDbType.Bool).Value = vehicle.IsHidden;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "Vehicle was added successfully!";
            }
            catch (Exception e)
            {
                result = "Vehicle was not added: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Put
        internal static CommonResponse EditVehicle(Vehicle vehicle)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"UPDATE {AppSettings.VEHICLES_TABLE} SET customer_email = @customerEmail, vin = @VIN, license_plate = @licensePlate, make = @make, model = @model, year = @year, color = @color, is_hidden = @isHidden WHERE vehicle_id = @vehicleID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@vehicleID", MySqlDbType.Int32).Value = vehicle.VehicleID;
                mySqlCommand.Parameters.Add("@customerEmail", MySqlDbType.VarChar).Value = vehicle.CustomerEmail;
                mySqlCommand.Parameters.Add("@VIN", MySqlDbType.VarChar).Value = vehicle.VIN;
                mySqlCommand.Parameters.Add("@licensePlate", MySqlDbType.VarChar).Value = vehicle.LicensePlate;
                mySqlCommand.Parameters.Add("@make", MySqlDbType.VarChar).Value = vehicle.Make;
                mySqlCommand.Parameters.Add("@model", MySqlDbType.VarChar).Value = vehicle.Model;
                mySqlCommand.Parameters.Add("@year", MySqlDbType.Int32).Value = vehicle.Year;
                mySqlCommand.Parameters.Add("@color", MySqlDbType.VarChar).Value = vehicle.Color;
                mySqlCommand.Parameters.Add("@isHidden", MySqlDbType.Bool).Value = vehicle.IsHidden;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "Vehicle was edited successfully!";
            }
            catch (Exception e)
            {
                result = "Vehicle was not edited: " + e.Message;
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
