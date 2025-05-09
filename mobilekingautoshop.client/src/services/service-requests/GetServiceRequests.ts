
import IServiceRequest from "../../interfaces/IServiceRequest";
import IGetServiceRequests from "../../interfaces/services/service-requests/IGetServiceRequests";
import { SERVICE_REQUESTS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getServiceRequests(props: IGetServiceRequests) {
    const { language } = props;
    console.log(language);
    let serviceRequests: IServiceRequest[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${SERVICE_REQUESTS_URI}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                serviceRequests = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { serviceRequests, doesErrorExist, errorMessage };
}
