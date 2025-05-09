import IAddTechnicianSpecialty from "../../interfaces/services/technician-specialties/IAddTechnicianSpecialty";
import { TECHNICIAN_SPECIALTIES_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function editTechnicianSpecialty(props: IAddTechnicianSpecialty) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${TECHNICIAN_SPECIALTIES_URI}/edit/${item.SpecialtyID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
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