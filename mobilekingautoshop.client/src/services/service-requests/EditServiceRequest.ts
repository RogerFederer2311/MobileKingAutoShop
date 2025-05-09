import IEditServiceRequest from "../../interfaces/services/service-requests/IEditServiceRequest";
import { SERVICE_REQUESTS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function editServiceRequest(props: IEditServiceRequest) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${SERVICE_REQUESTS_URI}/edit/${item.ServiceRequestID}`, {
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