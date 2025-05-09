import IDeleteTechnicianSpecialty from "../../interfaces/services/technician-specialties/IDeleteTechnicianSpecialty";
import { TECHNICIAN_SPECIALTIES_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function deleteTechnicianSpecialty(props: IDeleteTechnicianSpecialty) {
    const { id } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${TECHNICIAN_SPECIALTIES_URI}/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ TechnicianSpecialtyID: id })
    })
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { doesErrorExist, errorMessage };
}