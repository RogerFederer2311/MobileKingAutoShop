export default interface IJobAssignment {
    JobAssignmentID: number;
    ServiceRequestID: number;
    TechnicianEmail: string;
    Status: string;
    StartTime: Date | null;
    EndTime: Date | null;
}