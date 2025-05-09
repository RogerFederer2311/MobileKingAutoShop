export default interface IPaymentWithCard {
    PaymentID: number;
    CustomerEmail: string;
    CardNumber: string;
    SecurityCode: number;
    ExpirationDate: Date;
    IsHidden: boolean;
    InvoiceID: number;
    Amount: number;
    PaymentDate: Date;
}