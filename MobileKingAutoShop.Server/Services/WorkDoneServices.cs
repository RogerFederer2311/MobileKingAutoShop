using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MySqlConnector;

namespace MobileKingAutoShop.Server.Services
{
    public static class WorkDoneServices
    {
        private static MySqlConnection mySqlConnection = new MySqlConnection(Secrets.SQL_CONNECTION_STRING);
        // Gets
        internal static IActionResult GetWorkDone()
        {
            List<WorkDone> workDone = new List<WorkDone>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_WORK_DONE_COLUMNS} FROM {AppSettings.WORK_DONE_TABLE}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    workDone.Add
                        (
                        new WorkDone
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
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
            return new OkObjectResult(workDone);
        }
        internal static IActionResult GetWorkDoneByJobAssignmentID(int jobAssignmentID)
        {
            List<WorkDone> workDone = new List<WorkDone>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_WORK_DONE_COLUMNS} FROM {AppSettings.WORK_DONE_TABLE} WHERE job_assignment_id = {jobAssignmentID}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    workDone.Add
                        (
                        new WorkDone
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
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
            return new OkObjectResult(workDone);
        }
        internal static IActionResult GetWorkDoneByID(int id)
        {
            WorkDone workDone = new WorkDone();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_WORK_DONE_COLUMNS} FROM {AppSettings.WORK_DONE_TABLE} WHERE work_done_id = {id}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    workDone = new WorkDone
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
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
            return new OkObjectResult(workDone);
        }
        // Posts
        internal static CommonResponse AddWorkDone(WorkDone workDone)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.WORK_DONE_TABLE} ({AppSettings.ADD_WORK_DONE_COLUMNS}) VALUES (@jobAssignmentID, @description)", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@jobAssignmentID", MySqlDbType.Int32).Value = workDone.JobAssignmentID;
                mySqlCommand.Parameters.Add("@description", MySqlDbType.Int32).Value = workDone.Description;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "WorkDone was added successfully!";
            }
            catch (Exception e)
            {
                result = "WorkDone was not added: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Put
        internal static CommonResponse EditWorkDone(WorkDone workDone)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"UPDATE {AppSettings.WORK_DONE_TABLE} SET job_assignment_id = @jobAssignmentID, description = @description WHERE work_done_id = @workDoneID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@workDoneID", MySqlDbType.Int32).Value = workDone.WorkDoneID;
                mySqlCommand.Parameters.Add("@jobAssignmentID", MySqlDbType.Int32).Value = workDone.JobAssignmentID;
                mySqlCommand.Parameters.Add("@description", MySqlDbType.Int32).Value = workDone.Description;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "WorkDone was edited successfully!";
            }
            catch (Exception e)
            {
                result = "WorkDone was not edited: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Delete
        internal static CommonResponse DeleteWorkDoneByID(int workDoneID)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"DELETE FROM {AppSettings.WORK_DONE_TABLE} WHERE work_done_id = @workDoneID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@workDoneID", MySqlDbType.Int32).Value = workDoneID;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "WorkDone was deleted successfully!";
            }
            catch (Exception e)
            {
                result = "WorkDone was not deleted: " + e.Message;
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
