import IAddPaymentWithCard from "../../interfaces/services/payments/IAddPaymentWithCard";
import { PAYMENTS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function addPaymentWithCard(props: IAddPaymentWithCard) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${PAYMENTS_URI}/add-with-card`, {
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