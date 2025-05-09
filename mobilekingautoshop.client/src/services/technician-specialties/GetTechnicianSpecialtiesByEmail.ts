
import ITechnicianSpecialty from "../../interfaces/ITechnicianSpecialty";
import IGetTechnicianSpecialtiesByEmail from "../../interfaces/services/technician-specialties/IGetTechnicianSpecialtiesByEmail";
import { TECHNICIAN_SPECIALTIES_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getTechnicianSpecialtiesByEmail(props: IGetTechnicianSpecialtiesByEmail) {
    const { language, email } = props;
    let technicianSpecialties: ITechnicianSpecialty[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${TECHNICIAN_SPECIALTIES_URI}/by-email/${email}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                technicianSpecialties = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    if (technicianSpecialties.length === 0 && !errorMessage) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoSpecialties : SpanishStrings.NoSpecialties;
    }
    return { technicianSpecialties, doesErrorExist, errorMessage };
}
