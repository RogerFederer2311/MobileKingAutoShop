/* eslint-disable no-extra-boolean-cast */

import ICheckAccountFormValidity from "../interfaces/utilities/ICheckAccountFormValidity";
import EnglishStrings from "../strings/EnglishStrings";
import SpanishStrings from "../strings/SpanishStrings";

export default function checkAccountFormValidity(props: ICheckAccountFormValidity) {
    const {
        email,
        confirmEmail,
        password,
        confirmPassword,
        firstName,
        lastName,
        gender,
        otherGender,
        phoneNumber,
        address,
        language
    } = props;

    let doErrorsExist = false;

    const errors = {
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        gender: "",
        otherGender: "",
        phoneNumber: "",
        location: ""
    };

    if (!email) {
        errors.email = language === "English" ?
            EnglishStrings.Email + EnglishStrings.IsRequired :
            SpanishStrings.Email + SpanishStrings.IsRequired;
    }
    if (confirmEmail !== email) {
        errors.confirmEmail = language === "English" ?
            EnglishStrings.ConfirmEmail + EnglishStrings.MustBeSameAs + EnglishStrings.Email :
            SpanishStrings.ConfirmEmail + SpanishStrings.MustBeSameAs + SpanishStrings.Email;
    }
    if (!password) {
        errors.password = language === "English" ?
            EnglishStrings.Password + EnglishStrings.IsRequired :
            SpanishStrings.Password + SpanishStrings.IsRequired;
    }
    if (confirmPassword !== password) {
        errors.confirmPassword = language === "English" ?
            EnglishStrings.ConfirmPassword + EnglishStrings.MustBeSameAs + EnglishStrings.Password :
            SpanishStrings.ConfirmPassword + SpanishStrings.MustBeSameAs + SpanishStrings.Password;
    }
    if (!firstName) {
        errors.firstName = language === "English" ?
            EnglishStrings.FirstName + EnglishStrings.IsRequired :
            SpanishStrings.FirstName + SpanishStrings.IsRequired;
    }
    if (!lastName) {
        errors.lastName = language === "English" ?
            EnglishStrings.LastName + EnglishStrings.IsRequired :
            SpanishStrings.LastName + SpanishStrings.IsRequired;
    }
    if (!phoneNumber) {
        errors.phoneNumber = language === "English" ?
            EnglishStrings.PhoneNumber + EnglishStrings.IsRequired :
            SpanishStrings.PhoneNumber + SpanishStrings.IsRequired;
    }
    if (!address) {
        errors.location = language === "English" ?
            EnglishStrings.Location + EnglishStrings.IsRequired :
            SpanishStrings.Location + SpanishStrings.IsRequired;
    }
    if (!gender) {
        errors.gender = language === "English" ?
            EnglishStrings.Gender + EnglishStrings.IsRequired :
            SpanishStrings.Gender + SpanishStrings.IsRequired;
    }
    if (gender === "Other" && !otherGender) {
        errors.otherGender = language === "English" ?
            EnglishStrings.OtherGender + EnglishStrings.IsRequired :
            SpanishStrings.OtherGender + SpanishStrings.IsRequired;
    }
    if (!phoneNumber) {
        errors.phoneNumber = language === "English" ?
            EnglishStrings.PhoneNumber + EnglishStrings.IsRequired :
            SpanishStrings.PhoneNumber + SpanishStrings.IsRequired;
    }

    for (const error in errors) {
        // @ts-expect-error error can be used to index the errors object as the keys are all strings
        if (!!errors[error]) {
            doErrorsExist = true;
            break;
        }
    }

    return { doErrorsExist, errors };
}