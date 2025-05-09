import IPayment from "../../interfaces/IPayment";
import IGetPaymentsByInvoiceID from "../../interfaces/services/payments/IGetPaymentsByInvoiceID";
import { PAYMENTS_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getPaymentsByInvoiceID(props: IGetPaymentsByInvoiceID) {
    const { language, id } = props;
    let payments: IPayment[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${PAYMENTS_URI}/by-invoice/${id}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                payments = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    if (payments.length === 0 && !errorMessage) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoPayments : SpanishStrings.NoPayments;
    }
    return { payments, doesErrorExist, errorMessage };
}
