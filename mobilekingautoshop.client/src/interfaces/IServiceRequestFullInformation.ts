export default interface IServiceRequestFullInformation {
    ServiceRequestID: number;
    CustomerEmail: string;
    VehicleVIN: string;
    VehicleLicensePlate: string;
    VehicleMake: string;
    VehicleModel: string;
    VehicleYear: number | string;
    VehicleColor: string;
    TechnicianFirstName: string;
    TechnicianLastName: string;
    TechnicianEmail: string;
    JobAssignmentID: number;
    JobAssignmentStatus: string;
    IssueDescription: string;
    ServiceDate: Date;
    Status: string;
    InvoiceID: number;
    InvoiceAmount: string;
    IsInvoicePaid: boolean;
    Address: string;
    City: string;
    State: string;
    ZipCode: string;
    Country: string;
}