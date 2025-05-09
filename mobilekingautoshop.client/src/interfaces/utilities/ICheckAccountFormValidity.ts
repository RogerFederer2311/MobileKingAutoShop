export default interface ICheckAccountFormValidity {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    otherGender: string;
    address: string;
    language: "English" | "Spanish";
}