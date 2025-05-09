/* eslint-disable no-extra-boolean-cast */

import ICheckWorkDoneFormValidity from "../interfaces/utilities/ICheckWorkDoneFormValidity";
import EnglishStrings from "../strings/EnglishStrings";
import SpanishStrings from "../strings/SpanishStrings";

export default function checkWorkDoneFormValidity(props: ICheckWorkDoneFormValidity) {
    const {
        description,
        language
    } = props;

    let doErrorsExist = false;

    const errors = {
        description: ""
    };

    if (!description) {
        errors.description = language === "English" ?
            EnglishStrings.Description + EnglishStrings.IsRequired :
            SpanishStrings.Description + SpanishStrings.IsRequired;
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