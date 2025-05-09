using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MySqlConnector;
using System.Diagnostics;

namespace MobileKingAutoShop.Server.Services
{
    public static class ServiceRequestsServices
    {
        private static MySqlConnection mySqlConnection = new MySqlConnection(Secrets.SQL_CONNECTION_STRING);
        // Gets
        internal static IActionResult GetServiceRequests()
        {
            List<ServiceRequest> serviceRequests = new List<ServiceRequest>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_SERVICE_REQUESTS_COLUMNS} FROM {AppSettings.SERVICE_REQUESTS_TABLE}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    serviceRequests.Add
                        (
                        new ServiceRequest
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetInt32(2),
                            reader.GetString(3),
                            reader.GetDateTime(4),
                            reader.GetString(5),
                            reader.GetString(6),
                            reader.GetString(7),
                            reader.GetString(8),
                            reader.GetString(9),
                            reader.GetString(10)
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
            return new OkObjectResult(serviceRequests);
        }
        internal static IActionResult GetServiceRequestsByEmail(string email)
        {
            List<ServiceRequest> serviceRequests = new List<ServiceRequest>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_SERVICE_REQUESTS_COLUMNS} FROM {AppSettings.SERVICE_REQUESTS_TABLE} WHERE customer_email = '{email}'", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    serviceRequests.Add
                        (
                        new ServiceRequest
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetInt32(2),
                            reader.GetString(3),
                            reader.GetDateTime(4),
                            reader.GetString(5),
                            reader.GetString(6),
                            reader.GetString(7),
                            reader.GetString(8),
                            reader.GetString(9),
                            reader.GetString(10)
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
            return new OkObjectResult(serviceRequests);
        }
        internal static IActionResult GetServiceRequestByID(int id)
        {
            ServiceRequest serviceRequest = new ServiceRequest();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_SERVICE_REQUESTS_COLUMNS} FROM {AppSettings.SERVICE_REQUESTS_TABLE} WHERE service_request_id = {id}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    serviceRequest = new ServiceRequest
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetInt32(2),
                            reader.GetString(3),
                            reader.GetDateTime(4),
                            reader.GetString(5),
                            reader.GetString(6),
                            reader.GetString(7),
                            reader.GetString(8),
                            reader.GetString(9),
                            reader.GetString(10)
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
            return new OkObjectResult(serviceRequest);
        }
        // Posts
        internal static CommonResponse AddServiceRequestWithVehicle(ServiceRequestWithVehicle serviceRequestWithVehicle)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlVehicleCommand;
            mySqlVehicleCommand = new MySqlCommand($"INSERT INTO {AppSettings.VEHICLES_TABLE} ({AppSettings.ADD_VEHICLES_COLUMNS}) VALUES (@customerEmail, '', '', @make, @model, @year, @color, @isHidden)", mySqlConnection);
            try
            {
                mySqlVehicleCommand.Parameters.Add("@customerEmail", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.CustomerEmail;
                mySqlVehicleCommand.Parameters.Add("@make", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.Make;
                mySqlVehicleCommand.Parameters.Add("@model", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.Model;
                mySqlVehicleCommand.Parameters.Add("@year", MySqlDbType.Int32).Value = serviceRequestWithVehicle.Year;
                mySqlVehicleCommand.Parameters.Add("@color", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.Color;
                mySqlVehicleCommand.Parameters.Add("@isHidden", MySqlDbType.Bool).Value = false;
                mySqlVehicleCommand.Connection = mySqlConnection;
                mySqlVehicleCommand.ExecuteNonQuery();
                isSuccessful = true;
                
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.SERVICE_REQUESTS_TABLE} ({AppSettings.ADD_SERVICE_REQUESTS_COLUMNS}) VALUES (@customerEmail, @vehicleID, @issueDescription, @serviceDate, @status, @address, @city, @state, @zipCode, @country)", mySqlConnection);
                try
                {
                    mySqlCommand.Parameters.Add("@customerEmail", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.CustomerEmail;
                    mySqlCommand.Parameters.Add("@vehicleID", MySqlDbType.Int32).Value = mySqlVehicleCommand.LastInsertedId;
                    mySqlCommand.Parameters.Add("@issueDescription", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.IssueDescription;
                    mySqlCommand.Parameters.Add("@serviceDate", MySqlDbType.DateTime).Value = serviceRequestWithVehicle.ServiceDate;
                    mySqlCommand.Parameters.Add("@status", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.Status;
                    mySqlCommand.Parameters.Add("@address", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.Address;
                    mySqlCommand.Parameters.Add("@city", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.City;
                    mySqlCommand.Parameters.Add("@state", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.State;
                    mySqlCommand.Parameters.Add("@zipCode", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.ZipCode;
                    mySqlCommand.Parameters.Add("@country", MySqlDbType.VarChar).Value = serviceRequestWithVehicle.Country;
                    mySqlCommand.Connection = mySqlConnection;
                    mySqlCommand.ExecuteNonQuery();
                    isSuccessful = true;
                    result = "ServiceRequest was added successfully!";
                }
                catch (Exception e)
                {
                    result = "ServiceRequest was not added: " + e.Message;
                    isSuccessful = false;
                }
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
        internal static CommonResponse AddServiceRequest(ServiceRequest serviceRequest)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.SERVICE_REQUESTS_TABLE} ({AppSettings.ADD_SERVICE_REQUESTS_COLUMNS}) VALUES (@customerEmail, @vehicleID, @issueDescription, @serviceDate, @status, @address, @city, @state, @zipCode, @country)", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@customerEmail", MySqlDbType.VarChar).Value = serviceRequest.CustomerEmail;
                mySqlCommand.Parameters.Add("@vehicleID", MySqlDbType.Int32).Value = serviceRequest.VehicleID;
                mySqlCommand.Parameters.Add("@issueDescription", MySqlDbType.VarChar).Value = serviceRequest.IssueDescription;
                mySqlCommand.Parameters.Add("@serviceDate", MySqlDbType.DateTime).Value = serviceRequest.ServiceDate;
                mySqlCommand.Parameters.Add("@status", MySqlDbType.VarChar).Value = serviceRequest.Status;
                mySqlCommand.Parameters.Add("@address", MySqlDbType.VarChar).Value = serviceRequest.Address;
                mySqlCommand.Parameters.Add("@city", MySqlDbType.VarChar).Value = serviceRequest.City;
                mySqlCommand.Parameters.Add("@state", MySqlDbType.VarChar).Value = serviceRequest.State;
                mySqlCommand.Parameters.Add("@zipCode", MySqlDbType.VarChar).Value = serviceRequest.ZipCode;
                mySqlCommand.Parameters.Add("@country", MySqlDbType.VarChar).Value = serviceRequest.Country;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "ServiceRequest was added successfully!";
            }
            catch (Exception e)
            {
                result = "ServiceRequest was not added: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Put
        internal static CommonResponse EditServiceRequest(ServiceRequest serviceRequest)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"UPDATE {AppSettings.SERVICE_REQUESTS_TABLE} SET customer_email = @customerEmail, vehicle_id = @vehicleID, issue_description = @issueDescription, service_Date = @serviceDate, status = @status, address = @address, city = @city, state = @state, zip_code = @zipCode, country = @country WHERE service_request_id = @serviceRequestID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@serviceRequestID", MySqlDbType.Int32).Value = serviceRequest.ServiceRequestID;
                mySqlCommand.Parameters.Add("@customerEmail", MySqlDbType.VarChar).Value = serviceRequest.CustomerEmail;
                mySqlCommand.Parameters.Add("@vehicleID", MySqlDbType.Int32).Value = serviceRequest.VehicleID;
                mySqlCommand.Parameters.Add("@issueDescription", MySqlDbType.VarChar).Value = serviceRequest.IssueDescription;
                mySqlCommand.Parameters.Add("@serviceDate", MySqlDbType.DateTime).Value = serviceRequest.ServiceDate;
                mySqlCommand.Parameters.Add("@status", MySqlDbType.VarChar).Value = serviceRequest.Status;
                mySqlCommand.Parameters.Add("@address", MySqlDbType.VarChar).Value = serviceRequest.Address;
                mySqlCommand.Parameters.Add("@city", MySqlDbType.VarChar).Value = serviceRequest.City;
                mySqlCommand.Parameters.Add("@state", MySqlDbType.VarChar).Value = serviceRequest.State;
                mySqlCommand.Parameters.Add("@zipCode", MySqlDbType.VarChar).Value = serviceRequest.ZipCode;
                mySqlCommand.Parameters.Add("@country", MySqlDbType.VarChar).Value = serviceRequest.Country;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "ServiceRequest was edited successfully!";
            }
            catch (Exception e)
            {
                result = "ServiceRequest was not edited: " + e.Message;
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
