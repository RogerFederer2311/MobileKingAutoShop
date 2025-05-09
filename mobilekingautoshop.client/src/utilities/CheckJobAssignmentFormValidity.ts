/* eslint-disable no-extra-boolean-cast */

import ICheckJobAssignmentFormValidity from "../interfaces/utilities/ICheckJobAssignmentFormValidity";
import EnglishStrings from "../strings/EnglishStrings";
import SpanishStrings from "../strings/SpanishStrings";

export default function checkJobAssignmentFormValidity(props: ICheckJobAssignmentFormValidity) {
    const {
        language,
        technicianEmail,
    } = props;

    let doErrorsExist = false;

    const errors = {
        technicianEmail: ""
    };

    if (!technicianEmail) {
        errors.technicianEmail = language === "English" ?
            EnglishStrings.Technician + EnglishStrings.IsRequired :
            SpanishStrings.Technician + SpanishStrings.IsRequired;
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