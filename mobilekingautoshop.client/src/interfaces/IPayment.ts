export default interface IPayment {
    PaymentID: number;
    CreditCardID: number;
    InvoiceID: number;
    Amount: number;
    PaymentDate: Date;
}