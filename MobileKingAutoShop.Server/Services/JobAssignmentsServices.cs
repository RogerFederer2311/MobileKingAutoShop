using Microsoft.AspNetCore.Mvc;
using MobileKingAutoShop.Server.Models;
using MySqlConnector;

namespace MobileKingAutoShop.Server.Services
{
    public static class JobAssignmentsServices
    {
        private static MySqlConnection mySqlConnection = new MySqlConnection(Secrets.SQL_CONNECTION_STRING);
        // Gets
        internal static IActionResult GetJobAssignments()
        {
            List<JobAssignment> jobAssignments = new List<JobAssignment>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_JOB_ASSIGNMENTS_COLUMNS} FROM {AppSettings.JOB_ASSIGNMENTS_TABLE}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    jobAssignments.Add
                        (
                        new JobAssignment
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.IsDBNull(4) ? null : reader.GetDateTime(4),
                            reader.IsDBNull(5) ? null : reader.GetDateTime(5)
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
            return new OkObjectResult(jobAssignments);
        }
        internal static IActionResult GetJobAssignmentsByServiceRequestID(int serviceRequestID)
        {
            List<JobAssignment> jobAssignments = new List<JobAssignment>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_JOB_ASSIGNMENTS_COLUMNS} FROM {AppSettings.JOB_ASSIGNMENTS_TABLE} WHERE service_request_id = {serviceRequestID} AND status != 'Rejected'", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    jobAssignments.Add
                        (
                        new JobAssignment
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.IsDBNull(4) ? null : reader.GetDateTime(4),
                            reader.IsDBNull(5) ? null : reader.GetDateTime(5)
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
            return new OkObjectResult(jobAssignments);
        }
        internal static IActionResult GetJobAssignmentsByTechnicianEmail(string technicianEmail)
        {
            List<JobAssignment> jobAssignments = new List<JobAssignment>();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_JOB_ASSIGNMENTS_COLUMNS} FROM {AppSettings.JOB_ASSIGNMENTS_TABLE} WHERE technician_email = '{technicianEmail}'", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    jobAssignments.Add
                        (
                        new JobAssignment
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.IsDBNull(4) ? null : reader.GetDateTime(4),
                            reader.IsDBNull(5) ? null : reader.GetDateTime(5)
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
            return new OkObjectResult(jobAssignments);
        }
        internal static IActionResult GetJobAssignmentByID(int id)
        {
            JobAssignment jobAssignment = new JobAssignment();
            try
            {
                mySqlConnection.Open();
                MySqlCommand mySqlCommand;
                mySqlCommand = new MySqlCommand($"SELECT {AppSettings.SELECT_JOB_ASSIGNMENTS_COLUMNS} FROM {AppSettings.JOB_ASSIGNMENTS_TABLE} WHERE job_assignment_id = {id}", mySqlConnection);
                MySqlDataReader reader = mySqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    jobAssignment = new JobAssignment
                            (
                            reader.GetInt32(0),
                            reader.GetInt32(1),
                            reader.GetString(2),
                            reader.GetString(3),
                            reader.IsDBNull(4) ? null : reader.GetDateTime(4),
                            reader.IsDBNull(5) ? null : reader.GetDateTime(5)
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
            return new OkObjectResult(jobAssignment);
        }
        // Posts
        internal static CommonResponse AddJobAssignment(JobAssignment jobAssignment)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"INSERT INTO {AppSettings.JOB_ASSIGNMENTS_TABLE} ({AppSettings.ADD_JOB_ASSIGNMENTS_COLUMNS}) VALUES (@serviceRequestID, @technicianEmail, @status, @startTime, @endTime)", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@serviceRequestID", MySqlDbType.Int32).Value = jobAssignment.ServiceRequestID;
                mySqlCommand.Parameters.Add("@technicianEmail", MySqlDbType.VarChar).Value = jobAssignment.TechnicianEmail;
                mySqlCommand.Parameters.Add("@status", MySqlDbType.VarChar).Value = jobAssignment.Status;
                mySqlCommand.Parameters.Add("@startTime", MySqlDbType.DateTime).Value = jobAssignment.StartTime;
                mySqlCommand.Parameters.Add("@endTime", MySqlDbType.DateTime).Value = jobAssignment.EndTime;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;
                result = "JobAssignment was added successfully!";
            }
            catch (Exception e)
            {
                result = "JobAssignment was not added: " + e.Message;
                isSuccessful = false;
            }
            finally
            {
                mySqlConnection.Close();
            }

            return new CommonResponse(isSuccessful, result);
        }
        // Put
        internal static CommonResponse EditJobAssignment(JobAssignment jobAssignment)
        {
            bool isSuccessful = true;
            string result = string.Empty;
            mySqlConnection.Open();
            MySqlCommand mySqlCommand;
            mySqlCommand = new MySqlCommand($"UPDATE {AppSettings.JOB_ASSIGNMENTS_TABLE} SET service_request_id = @serviceRequestID, technician_email = @technicianEmail, status = @status, start_time = @startTime, end_time = @endTime WHERE job_assignment_id = @jobAssignmentID", mySqlConnection);
            try
            {
                mySqlCommand.Parameters.Add("@jobAssignmentID", MySqlDbType.Int32).Value = jobAssignment.JobAssignmentID;
                mySqlCommand.Parameters.Add("@serviceRequestID", MySqlDbType.Int32).Value = jobAssignment.ServiceRequestID;
                mySqlCommand.Parameters.Add("@technicianEmail", MySqlDbType.VarChar).Value = jobAssignment.TechnicianEmail;
                mySqlCommand.Parameters.Add("@status", MySqlDbType.VarChar).Value = jobAssignment.Status;
                mySqlCommand.Parameters.Add("@startTime", MySqlDbType.DateTime).Value = jobAssignment.StartTime;
                mySqlCommand.Parameters.Add("@endTime", MySqlDbType.DateTime).Value = jobAssignment.EndTime;
                mySqlCommand.Connection = mySqlConnection;
                mySqlCommand.ExecuteNonQuery();
                isSuccessful = true;

                if (jobAssignment.Status == "Completed" || jobAssignment.Status == "In Progress" || jobAssignment.Status == "Pending")
                {
                    MySqlCommand mySqlServiceRequestCommand = new MySqlCommand($"UPDATE {AppSettings.SERVICE_REQUESTS_TABLE} SET status = @status WHERE service_request_id = @serviceRequestID");
                    try
                    {
                        mySqlServiceRequestCommand.Parameters.Add("@status", MySqlDbType.VarChar).Value = jobAssignment.Status;
                        mySqlServiceRequestCommand.Parameters.Add("@serviceRequestID", MySqlDbType.Int32).Value = jobAssignment.ServiceRequestID;
                        mySqlServiceRequestCommand.Connection = mySqlConnection;
                        mySqlServiceRequestCommand.ExecuteNonQuery();
                        isSuccessful = true;
                        result = "JobAssignment was edited successfully!";
                    }
                    catch (Exception e)
                    {
                        result = "ServiceRequest was not modified: " + e.Message;
                        isSuccessful = false;
                    }
                }
            }
            catch (Exception e)
            {
                result = "JobAssignment was not edited: " + e.Message;
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
