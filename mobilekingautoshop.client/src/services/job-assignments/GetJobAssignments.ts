
import IJobAssignment from "../../interfaces/IJobAssignment";
import IGetJobAssignments from "../../interfaces/services/job-assignments/IGetJobAssignments";
import { JOB_ASSIGNMENTS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getJobAssignments(props: IGetJobAssignments) {
    const { language } = props;
    console.log(language);
    let jobAssignments: IJobAssignment[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${JOB_ASSIGNMENTS_URI}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                jobAssignments = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { jobAssignments, doesErrorExist, errorMessage };
}
