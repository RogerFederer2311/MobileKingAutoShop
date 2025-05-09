
import ICustomerCreditCard from "../../interfaces/ICustomerCreditCard";
import IGetCustomerCreditCardsByEmail from "../../interfaces/services/customer-credit-cards/IGetCustomerCreditCardsByEmail";
import { CUSTOMER_CREDIT_CARDS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getCustomerCreditCardsByEmail(props: IGetCustomerCreditCardsByEmail) {
    const { language, email } = props;
    let customerCreditCards: ICustomerCreditCard[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${CUSTOMER_CREDIT_CARDS_URI}/by-email${email}`)
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
    if (customerCreditCards.length === 0 && !errorMessage) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoCreditCards : SpanishStrings.NoCreditCards;
    }
    return { customerCreditCards, doesErrorExist, errorMessage };
}
