export default interface ICheckServiceRequestFormValidity {
    vehicleID: number;
    isNewCar: boolean;
    make: string;
    model: string;
    year: number;
    color: string;
    issue: string;
    serviceDate: Date;
    address: string;
    language: "English" | "Spanish";
}