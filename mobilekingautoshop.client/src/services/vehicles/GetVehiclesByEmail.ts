
import IVehicle from "../../interfaces/IVehicle";
import IGetVehiclesByEmail from "../../interfaces/services/vehicles/IGetVehiclesByEmail";
import { VEHICLES_URI } from "../../Settings";
import isStatusGood from "../../utilities/IsStatusGood";

export default async function getVehiclesByEmail(props: IGetVehiclesByEmail) {
    const { email } = props;
    let vehicles: IVehicle[] = [];
    let doesErrorExist = false;
    let errorMessage = "";

    await fetch(`${VEHICLES_URI}/by-email/${email}`)
        .then((response) => {
            doesErrorExist = !isStatusGood(response.status);
            return response.json();
        })
        .then((result) => {
            if (doesErrorExist) {
                errorMessage = result.response;
            }
            else {
                vehicles = result;
            }
        })
        .catch((error) => {
            doesErrorExist = true;
            errorMessage = error;
            console.log(error);
        });
    return { vehicles, doesErrorExist, errorMessage };
}
