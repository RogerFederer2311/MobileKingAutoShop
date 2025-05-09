using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MySqlConnector;

namespace MobileKingAutoShop.Server.Services
{
    public static class TechnicianSpecialtiesServices
    {
        private static MySqlConnection mySqlConnection = new MySqlConnection(Secrets.SQL_CONNECTION_STRING);
        // Gets
        internal static IActionResult GetTechnicianSpecialties()
        {
            List<TechnicianSpecialty> technicianSpecialties = new List<TechnicianSpecialty>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_TECHNICIAN_SPECIALTIES_COLUMNS} FROM {AppSettings.TECHNICIAN_SPECIALTIES_TABLE}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    technicianSpecialties.Add
                        (
                        new TechnicianSpecialty
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2)
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
            return new OkObjectResult(technicianSpecialties);
        }
        internal static IActionResult GetTechnicianSpecialtiesByTechnicianEmail(string technicianEmail)
        {
            List<TechnicianSpecialty> technicianSpecialties = new List<TechnicianSpecialty>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_TECHNICIAN_SPECIALTIES_COLUMNS} FROM {AppSettings.TECHNICIAN_SPECIALTIES_TABLE} WHERE technician_email = '{technicianEmail}'", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    technicianSpecialties.Add
                        (
                        new TechnicianSpecialty
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2)
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
            return new OkObjectResult(technicianSpecialties);
        }
        internal static IActionResult GetTechnicianSpecialtyByID(int id)
        {
            TechnicianSpecialty technicianSpecialty = new TechnicianSpecialty();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_TECHNICIAN_SPECIALTIES_COLUMNS} FROM {AppSettings.TECHNICIAN_SPECIALTIES_TABLE} WHERE specialty_id = {id}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    technicianSpecialty = new TechnicianSpecialty
                            (
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2)
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
            return new OkObjectResult(technicianSpecialty);
        }
        // Posts
        internal static CommonResponse AddTechnicianSpecialty(TechnicianSpecialty technicianSpecialty)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.TECHNICIAN_SPECIALTIES_TABLE} ({AppSettings.ADD_TECHNICIAN_SPECIALTIES_COLUMNS}) VALUES (@technicianEmail, @specialty)", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@technicianEmail", MySqlDbType.VarChar).Value = technicianSpecialty.TechnicianEmail;
                mySqlCommand.Parameters.Add("@specialty", MySqlDbType.VarChar).Value = technicianSpecialty.Specialty;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "TechnicianSpecialty was added successfully!";
            }
            catch (Exception e)
            {
                result = "TechnicianSpecialty was not added: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Put
        internal static CommonResponse EditTechnicianSpecialty(TechnicianSpecialty technicianSpecialty)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"UPDATE {AppSettings.TECHNICIAN_SPECIALTIES_TABLE} SET technician_email = @technicianEmail, specialty = @specialty WHERE specialty_id = @specialtyID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@specialtyID", MySqlDbType.Int32).Value = technicianSpecialty.SpecialtyID;
                mySqlCommand.Parameters.Add("@technicianEmail", MySqlDbType.VarChar).Value = technicianSpecialty.TechnicianEmail;
                mySqlCommand.Parameters.Add("@specialty", MySqlDbType.VarChar).Value = technicianSpecialty.Specialty;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "TechnicianSpecialty was edited successfully!";
            }
            catch (Exception e)
            {
                result = "TechnicianSpecialty was not edited: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Delete
        internal static CommonResponse DeleteTechnicianSpecialtyByID(int specialtyID)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"DELETE FROM {AppSettings.TECHNICIAN_SPECIALTIES_TABLE} WHERE specialty_id = @specialtyID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@specialtyID", MySqlDbType.Int32).Value = specialtyID;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "TechnicianSpecialty was deleted successfully!";
            }
            catch (Exception e)
            {
                result = "TechnicianSpecialty was not deleted: " + e.Message;
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
