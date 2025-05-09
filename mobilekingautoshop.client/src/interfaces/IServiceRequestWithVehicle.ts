export default interface IServiceRequestWithVehicle {
    ServiceRequestID: number;
    CustomerEmail: string;
    Make: string;
    Model: string;
    Year: number;
    Color: string;
    IssueDescription: string;
    ServiceDate: Date;
    Status: string;
    Address: string;
    City: string;
    State: string;
    ZipCode: string;
    Country: string;
}