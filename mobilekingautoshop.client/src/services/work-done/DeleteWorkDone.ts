import IDeleteWorkDone from "../../interfaces/services/work-done/IDeleteWorkDone";
import { WORK_DONE_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function deleteWorkDone(props: IDeleteWorkDone) {
    const { id } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${WORK_DONE_URI}/delete/${id}`, {
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