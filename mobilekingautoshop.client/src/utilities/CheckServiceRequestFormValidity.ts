/* eslint-disable no-extra-boolean-cast */

import ICheckServiceRequestFormValidity from "../interfaces/utilities/ICheckServiceRequestFormValidity";
import EnglishStrings from "../strings/EnglishStrings";
import SpanishStrings from "../strings/SpanishStrings";

export default function checkServiceRequestFormValidity(props: ICheckServiceRequestFormValidity) {
    const {
        vehicleID,
        isNewCar,
        make,
        model,
        year,
        color,
        issue,
        serviceDate,
        address,
        language
    } = props;

    let doErrorsExist = false;

    const errors = {
        vehicleID: "",
        make: "",
        model: "",
        year: "",
        color: "",
        issue: "",
        serviceDate: "",
        location: ""
    };

    if (!vehicleID && !isNewCar) {
        errors.vehicleID = language === "English" ?
            EnglishStrings.Vehicle + EnglishStrings.IsRequired :
            SpanishStrings.Vehicle + SpanishStrings.IsRequired;
    }
    if (!make && isNewCar) {
        errors.make = language === "English" ?
            EnglishStrings.Make + EnglishStrings.IsRequired :
            SpanishStrings.Make + SpanishStrings.IsRequired;
    }
    if (!model && isNewCar) {
        errors.model = language === "English" ?
            EnglishStrings.Model + EnglishStrings.IsRequired :
            SpanishStrings.Model + SpanishStrings.IsRequired;
    }
    if (!year) {
        errors.year = language === "English" ?
            EnglishStrings.Year + EnglishStrings.IsRequired :
            SpanishStrings.Year + SpanishStrings.IsRequired;
    }
    if (!color) {
        errors.color = language === "English" ?
            EnglishStrings.Color + EnglishStrings.IsRequired :
            SpanishStrings.Color + SpanishStrings.IsRequired;
    }
    if (!issue) {
        errors.issue = language === "English" ?
            EnglishStrings.Issue + EnglishStrings.IsRequired :
            SpanishStrings.Issue + SpanishStrings.IsRequired;
    }
    if (!serviceDate) {
        errors.serviceDate = language === "English" ?
            EnglishStrings.ServiceDate + EnglishStrings.IsRequired :
            SpanishStrings.ServiceDate + SpanishStrings.IsRequired;
    }
    if (!address) {
        errors.location = language === "English" ?
            EnglishStrings.Location + EnglishStrings.IsRequired :
            SpanishStrings.Location + SpanishStrings.IsRequired;
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