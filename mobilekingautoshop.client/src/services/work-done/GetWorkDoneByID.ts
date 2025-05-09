import IWorkDone from "../../interfaces/IWorkDone";
import IGetWorkDoneByID from "../../interfaces/services/work-done/IGetWorkDoneByID";
import { WORK_DONE_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getWorkDoneByID(props: IGetWorkDoneByID) {
    const { language, id } = props;
    let workDone: IWorkDone = {
        WorkDoneID: 0,
        JobAssignmentID: 0,
        Description: ""
    };
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${WORK_DONE_URI}/by-id/${id}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                workDone = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    if (workDone.WorkDoneID === 0) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoWorkDone : SpanishStrings.NoWorkDone;
    }
    return { workDone, doesErrorExist, errorMessage };
}
