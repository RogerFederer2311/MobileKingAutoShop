import IEditWorkDone from "../../interfaces/services/work-done/IEditWorkDone";
import { WORK_DONE_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function editWorkDone(props: IEditWorkDone) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${WORK_DONE_URI}/edit/${item.WorkDoneID}`, {
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