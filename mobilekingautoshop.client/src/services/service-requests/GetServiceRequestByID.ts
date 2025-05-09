import IServiceRequest from "../../interfaces/IServiceRequest";
import IGetServiceRequestByID from "../../interfaces/services/service-requests/IGetServiceRequestByID";
import { SERVICE_REQUESTS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getServiceRequestByID(props: IGetServiceRequestByID) {
    const { language, id } = props;
    let serviceRequest: IServiceRequest = {
        ServiceRequestID: 0,
        CustomerEmail: "",
        VehicleID: 0,
        IssueDescription: "",
        ServiceDate: new Date(),
        Status: "",
        Address: "",
        City: "",
        State: "",
        ZipCode: "",
        Country: "",
    };
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${SERVICE_REQUESTS_URI}/by-id/${id}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                serviceRequest = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    if (serviceRequest.ServiceRequestID === 0) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoServiceRequests : SpanishStrings.NoServiceRequests;
    }
    return { serviceRequest, doesErrorExist, errorMessage };
}
