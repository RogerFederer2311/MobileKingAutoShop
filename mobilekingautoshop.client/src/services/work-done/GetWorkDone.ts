
import IWorkDone from "../../interfaces/IWorkDone";
import IGetWorkDone from "../../interfaces/services/work-done/IGetWorkDone";
import { WORK_DONE_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getWorkDone(props: IGetWorkDone) {
    const { language } = props;
    console.log(language);
    let workDone: IWorkDone[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${WORK_DONE_URI}`)
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
    return { workDone, doesErrorExist, errorMessage };
}
