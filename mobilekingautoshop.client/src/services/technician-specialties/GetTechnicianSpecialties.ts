
import ITechnicianSpecialty from "../../interfaces/ITechnicianSpecialty";
import IGetTechnicianSpecialties from "../../interfaces/services/technician-specialties/IGetTechnicianSpecialties";
import { TECHNICIAN_SPECIALTIES_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getTechnicianSpecialties(props: IGetTechnicianSpecialties) {
    const { language } = props;
    console.log(language);
    let technicianSpecialties: ITechnicianSpecialty[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${TECHNICIAN_SPECIALTIES_URI}`)
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
    return { technicianSpecialties, doesErrorExist, errorMessage };
}
