import IInvoice from "../../interfaces/IInvoice";
import IGetInvoiceByID from "../../interfaces/services/invoices/IGetInvoiceByID";
import { INVOICES_URI } from "../../Settings";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getInvoiceByID(props: IGetInvoiceByID) {
    const { language, id } = props;
    let invoice: IInvoice = {
        InvoiceID: 0,
        ServiceRequestID: 0,
        Amount: 0,
        DueDate: new Date()
    };
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${INVOICES_URI}/by-id/${id}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                invoice = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    if (invoice.InvoiceID === 0) {
        doesErrorExist = true;
        errorMessage = language === "English" ?
            EnglishStrings.NoInvoices : SpanishStrings.NoInvoices;
    }
    return { invoice, doesErrorExist, errorMessage };
}
