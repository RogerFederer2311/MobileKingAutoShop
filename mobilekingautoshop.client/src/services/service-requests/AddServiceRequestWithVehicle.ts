import IAddServiceRequestWithVehicle from "../../interfaces/services/service-requests/IAddServiceRequestWithVehicle";
import { SERVICE_REQUESTS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function addServiceRequestWithVehicle(props: IAddServiceRequestWithVehicle) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${SERVICE_REQUESTS_URI}/add-with-vehicle`, {
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