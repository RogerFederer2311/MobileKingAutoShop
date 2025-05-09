import IAddCustomerCreditCard from "../../interfaces/services/customer-credit-cards/IAddCustomerCreditCard";
import { CUSTOMER_CREDIT_CARDS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function addCustomerCreditCard(props: IAddCustomerCreditCard) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${CUSTOMER_CREDIT_CARDS_URI}/add`, {
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