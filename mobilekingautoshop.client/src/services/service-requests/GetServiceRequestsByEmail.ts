import IServiceRequest from "../../interfaces/IServiceRequest";
import IGetServiceRequestsByEmail from "../../interfaces/services/service-requests/IGetServiceRequestsByEmail";
import { SERVICE_REQUESTS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getServiceRequestsByEmail(props: IGetServiceRequestsByEmail) {
    const { language, email } = props;
    let serviceRequests: IServiceRequest[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${SERVICE_REQUESTS_URI}/by-email/${email}`)
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
    if (serviceRequests.length === 0 && !errorMessage) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoServiceRequests : SpanishStrings.NoServiceRequests;
    }
    return { serviceRequests, doesErrorExist, errorMessage };
}
