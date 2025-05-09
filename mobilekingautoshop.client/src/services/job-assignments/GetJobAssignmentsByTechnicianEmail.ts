
import IJobAssignment from "../../interfaces/IJobAssignment";
import IGetJobAssignmentsByTechnicianEmail from "../../interfaces/services/job-assignments/IGetJobAssignmentsByTechnicianEmail";
import { JOB_ASSIGNMENTS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getJobAssignmentsByTechnicianEmail(props: IGetJobAssignmentsByTechnicianEmail) {
    const { language } = props;
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
    if (jobAssignments.length === 0 && !errorMessage) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoJobAssignments : SpanishStrings.NoJobAssignments;
    }
    return { jobAssignments, doesErrorExist, errorMessage };
}
