export default interface IServiceRequest{
    ServiceRequestID: number;
    CustomerEmail: string;
    VehicleID: number;
    IssueDescription: string;
    ServiceDate: Date;
    Status: string;
    Address: string;
    City: string;
    State: string;
    ZipCode: string;
    Country: string;
}