/* eslint-disable no-extra-boolean-cast */

import ICheckLoginFormValidity from "../interfaces/utilities/ICheckLoginFormValidity";
import EnglishStrings from "../strings/EnglishStrings";
import SpanishStrings from "../strings/SpanishStrings";

export default function checkLoginFormValidity(props: ICheckLoginFormValidity) {
    const {
        email,
        password,
        language
    } = props;

    let doErrorsExist = false;

    const errors = {
        email: "",
        password: ""
    };

    if (!email) {
        errors.email = language === "English" ?
            EnglishStrings.Email + EnglishStrings.IsRequired :
            SpanishStrings.Email + SpanishStrings.IsRequired;
    }
    if (!password) {
        errors.password = language === "English" ?
            EnglishStrings.Password + EnglishStrings.IsRequired :
            SpanishStrings.Password + SpanishStrings.IsRequired;
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