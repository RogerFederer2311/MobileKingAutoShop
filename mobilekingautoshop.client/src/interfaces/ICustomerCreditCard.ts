export default interface ICustomerCreditCard {
    CreditCardID: number;
    CustomerEmail: string;
    CardNumber: string;
    SecurityCode: number;
    ExpirationDate: Date;
    IsHidden: boolean;
}