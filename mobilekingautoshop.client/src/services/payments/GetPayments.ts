import IPayment from "../../interfaces/IPayment";
import IGetPayments from "../../interfaces/services/payments/IGetPayments";
import { PAYMENTS_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getPayments(props: IGetPayments) {
    const { language } = props;
    console.log(language);
    let payments: IPayment[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${PAYMENTS_URI}`)
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
    return { payments, doesErrorExist, errorMessage };
}
