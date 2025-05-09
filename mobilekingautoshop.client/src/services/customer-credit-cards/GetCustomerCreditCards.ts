
import ICustomerCreditCard from "../../interfaces/ICustomerCreditCard";
import IGetCustomerCreditCards from "../../interfaces/services/customer-credit-cards/IGetCustomerCreditCards";
import { CUSTOMER_CREDIT_CARDS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getCustomerCreditCards(props: IGetCustomerCreditCards) {
    const { language } = props;
    console.log(language);
    let customerCreditCards: ICustomerCreditCard[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${CUSTOMER_CREDIT_CARDS_URI}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                customerCreditCards = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { customerCreditCards, doesErrorExist, errorMessage };
}
