import ICustomerCreditCard from "../../interfaces/ICustomerCreditCard";
import IGetCustomerCreditCardByID from "../../interfaces/services/customer-credit-cards/IGetCustomerCreditCardByID";
import { CUSTOMER_CREDIT_CARDS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getCustomerCreditCardByID(props: IGetCustomerCreditCardByID) {
    const { language, id } = props;
    let customerCreditCard: ICustomerCreditCard= {
        CreditCardID: 0,
        CustomerEmail: "",
        CardNumber: "",
        SecurityCode: 0,
        ExpirationDate: new Date(),
        IsHidden: false
    };
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${CUSTOMER_CREDIT_CARDS_URI}/by-id/${id}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                customerCreditCard = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    if (customerCreditCard.CreditCardID === 0) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoCreditCards : SpanishStrings.NoCreditCards;
    }
    return { customerCreditCard, doesErrorExist, errorMessage };
}
