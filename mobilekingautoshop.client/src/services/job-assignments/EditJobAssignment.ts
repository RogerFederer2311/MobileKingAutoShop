import IEditJobAssignment from "../../interfaces/services/job-assignments/IEditJobAssignment";
import { JOB_ASSIGNMENTS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function editJobAssignment(props: IEditJobAssignment) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${JOB_ASSIGNMENTS_URI}/edit/${item.JobAssignmentID}`, {
        method: "PUT",
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