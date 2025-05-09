import IEditInvoice from "../../interfaces/services/invoices/IEditInvoice";
import { INVOICES_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function editInvoice(props: IEditInvoice) {
    const { item } = props;
    let doesErrorExist = false;
    let errorMessage = "";
    await fetch(`${INVOICES_URI}/edit${item.InvoiceID}`, {
        method: "PUT",
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