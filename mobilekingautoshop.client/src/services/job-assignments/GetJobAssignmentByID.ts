import IJobAssignment from "../../interfaces/IJobAssignment";
import IGetJobAssignmentByID from "../../interfaces/services/job-assignments/IGetJobAssignmentByID";
import { JOB_ASSIGNMENTS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getJobAssignmentByID(props: IGetJobAssignmentByID) {
    const { language, id } = props;
    let jobAssignment: IJobAssignment = {
        JobAssignmentID: 0,
        ServiceRequestID: 0,
        TechnicianEmail: "",
        Status: "",
        StartTime: new Date(),
        EndTime: new Date()
    };
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${JOB_ASSIGNMENTS_URI}/by-id/${id}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                jobAssignment = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    if (jobAssignment.JobAssignmentID === 0) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoJobAssignments : SpanishStrings.NoJobAssignments;
    }
    return { jobAssignment, doesErrorExist, errorMessage };
}
