import IAddJobAssignment from "../../interfaces/services/job-assignments/IAddJobAssignment";
import { JOB_ASSIGNMENTS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function addJobAssignment(props: IAddJobAssignment) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${JOB_ASSIGNMENTS_URI}/add`, {
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