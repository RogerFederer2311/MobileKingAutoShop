
import IInvoice from "../../interfaces/IInvoice";
import IGetInvoices from "../../interfaces/services/invoices/IGetInvoices";
import { INVOICES_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getInvoices(props: IGetInvoices) {
    const { language } = props;
    console.log(language);
    let invoices: IInvoice[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${INVOICES_URI}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                invoices = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { invoices, doesErrorExist, errorMessage };
}
