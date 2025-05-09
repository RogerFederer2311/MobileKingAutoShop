/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import IServiceRequests from '../../interfaces/components/IServiceRequests';
import EnglishStrings from '../../strings/EnglishStrings';
import SpanishStrings from '../../strings/SpanishStrings';
import IServiceRequestFullInformation from '../../interfaces/IServiceRequestFullInformation';
import formatDateTime from '../../utilities/FormatDateTime';
import getVehicles from '../../services/vehicles/GetVehicles';
import getJobAssignments from '../../services/job-assignments/GetJobAssignments';
import getUsers from '../../services/users/GetUsers';
import getServiceRequests from '../../services/service-requests/GetServiceRequests';
import getCookie from '../../utilities/GetCookie';
import getInvoices from '../../services/invoices/GetInvoices';
import getPayments from '../../services/payments/GetPayments';
import newWindow from "../../images/newWindow.svg";

export default function ServiceRequests(props: IServiceRequests) {
    const { language } = props;
    const [serviceRequests, setServiceRequests] = useState<IServiceRequestFullInformation[]>([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [role, setRole] = React.useState("");

    useEffect(() => {
        async function getEverything() {
            const [
                vehiclesResponse,
                jobAssignmentsReponse,
                usersResponse,
                serviceRequestsResponse,
                invoicesResponse,
                paymentsResponse
            ] = await Promise.all([
                getVehicles({ language: language }),
                getJobAssignments({ language: language }),
                getUsers({ language: language }),
                getServiceRequests({ language: language }),
                getInvoices({ language: language }),
                getPayments({ language: language })
            ]);

            if (
                !vehiclesResponse.doesErrorExist &&
                !jobAssignmentsReponse.doesErrorExist &&
                !usersResponse.doesErrorExist &&
                !serviceRequestsResponse.doesErrorExist &&
                !invoicesResponse.doesErrorExist &&
                !paymentsResponse.doesErrorExist
            ) {
                setIsSuccessful(true);
                let loadedServiceRequests: IServiceRequestFullInformation[] = [];
                for (let i = 0; i < serviceRequestsResponse.serviceRequests.length; i++) {
                    const current = serviceRequestsResponse.serviceRequests[i];
                    const filteredJobAssignment = jobAssignmentsReponse.jobAssignments.filter(jobAssignment => jobAssignment.Status !== "Rejected" && jobAssignment.ServiceRequestID === current.ServiceRequestID)[0];
                    const filteredVehicle = vehiclesResponse.vehicles.filter(vehicle => vehicle.VehicleID === current.VehicleID)[0];
                    let isInvoicePaid = false;
                    let filteredTechnician = {
                        FirstName: "",
                        LastName: "",
                        Email: ""
                    };
                    if (!!filteredJobAssignment) {
                        filteredTechnician = usersResponse.users.filter(user => user.Email === filteredJobAssignment.TechnicianEmail)[0];
                    }
                    const filteredInvoice = invoicesResponse.invoices.filter(invoice => invoice.ServiceRequestID === current.ServiceRequestID)[0];
                    let currentAmount = 0;
                    if (!!filteredInvoice) {
                        const filteredPayments = paymentsResponse.payments.filter(payment => payment.InvoiceID === filteredInvoice.InvoiceID);
                        currentAmount = filteredInvoice.Amount;
                        for (let j = 0; j < filteredPayments.length; j++) {
                            currentAmount -= filteredPayments[j].Amount;
                        }
                        if (currentAmount <= 0) {
                            isInvoicePaid = true;
                        }
                    }
                    loadedServiceRequests.push({
                        ServiceRequestID: current.ServiceRequestID,
                        CustomerEmail: current.CustomerEmail,
                        VehicleVIN: !!filteredVehicle ? filteredVehicle.VIN : "",
                        VehicleLicensePlate: !!filteredVehicle ? filteredVehicle.LicensePlate : "",
                        VehicleMake: !!filteredVehicle ? filteredVehicle.Make : "",
                        VehicleModel: !!filteredVehicle ? filteredVehicle.Model : "",
                        VehicleColor: !!filteredVehicle ? filteredVehicle.Color : "",
                        VehicleYear: !!filteredVehicle ? filteredVehicle.Year : "",
                        TechnicianFirstName: filteredTechnician.FirstName,
                        TechnicianLastName: filteredTechnician.LastName,
                        TechnicianEmail: filteredTechnician.Email,
                        IssueDescription: current.IssueDescription,
                        JobAssignmentID: !!filteredJobAssignment ? filteredJobAssignment.JobAssignmentID : 0,
                        JobAssignmentStatus: !!filteredJobAssignment ? filteredJobAssignment.Status : "",
                        ServiceDate: current.ServiceDate,
                        Status: current.Status,
                        InvoiceID: !!filteredInvoice ? filteredInvoice.InvoiceID : 0,
                        InvoiceAmount: !!currentAmount ? "$" + currentAmount.toFixed(2) : "",
                        IsInvoicePaid: isInvoicePaid,
                        Address: current.Address,
                        City: current.City,
                        State: current.State,
                        ZipCode: current.ZipCode,
                        Country: current.Country
                    });
                }
                const receivedRole = getCookie("role");
                const receivedEmail = getCookie("email");
                setRole(receivedRole);
                if (receivedRole === "Customer") {
                    loadedServiceRequests = loadedServiceRequests.filter(loadedServiceRequests => loadedServiceRequests.CustomerEmail === receivedEmail);
                }
                else if (receivedRole === "Technician") {
                    loadedServiceRequests = loadedServiceRequests.filter(loadedServiceRequests => loadedServiceRequests.TechnicianEmail === receivedEmail);
                }
                setServiceRequests(loadedServiceRequests);
            }
            else {
                setErrorMessage(language ? EnglishStrings.NoDataLoaded : SpanishStrings.NoDataLoaded);
            }
            setIsLoading(false);
        }

        getEverything();
    }, []);

    return (
        <div>
            {isLoading &&
                <div className="loadingContainer">
                    <span>{language === "English" ? EnglishStrings.Loading : SpanishStrings.Loading}</span>
                </div>
            }
            {
                !!errorMessage &&
                <div className="errorContainer">
                    <span>{errorMessage}</span>
                </div>
            }
            <div>
                <h2>{language === "English" ?
                    EnglishStrings.ServiceRequests :
                    SpanishStrings.ServiceRequests
                }</h2>
                <div>
                    <a href="/service-requests/add">
                        {language === "English" ? EnglishStrings.AddServiceRequest : SpanishStrings.AddServiceRequest}
                    </a>
                </div>
                <div className="tableContainer" hidden={!isSuccessful}>
                    {role === "Customer" &&
                        <table>
                            <tr>
                                <th>
                                    {language === "English" ? EnglishStrings.Vehicle : SpanishStrings.Vehicle}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Technician : SpanishStrings.Technician}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.ServiceDate : SpanishStrings.ServiceDate}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Issue : SpanishStrings.Issue}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Location : SpanishStrings.Location}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Status : SpanishStrings.Status}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.WorkDone : SpanishStrings.WorkDone}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Invoice : SpanishStrings.Invoice}
                                </th>
                            </tr>
                            {serviceRequests.map((serviceRequest) => {
                                return (
                                    <tr>
                                        <td dangerouslySetInnerHTML={{
                                            __html: (serviceRequest.VehicleColor + " " +
                                                serviceRequest.VehicleYear + "\n" +
                                                serviceRequest.VehicleMake + " " +
                                                serviceRequest.VehicleModel).replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                        <td>{serviceRequest.TechnicianFirstName + " " +
                                            serviceRequest.TechnicianLastName}
                                        </td>
                                        <td>{formatDateTime(new Date(serviceRequest.ServiceDate + "Z"), true)}</td>
                                        <td dangerouslySetInnerHTML={{
                                            __html: serviceRequest.IssueDescription.replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                        <td dangerouslySetInnerHTML={{
                                            __html: (serviceRequest.Address + ",\n" +
                                                serviceRequest.City + ", " +
                                                serviceRequest.State + "\n" +
                                                serviceRequest.ZipCode + " " +
                                                serviceRequest.Country).replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                        <td>{serviceRequest.Status}</td>
                                        <td><a hidden={!serviceRequest.JobAssignmentID} href={`/work-done?ID=${serviceRequest.JobAssignmentID}`}><img src={newWindow} /></a></td>
                                        <td>{serviceRequest.IsInvoicePaid ? language === "English" ? EnglishStrings.FullyPaid: SpanishStrings.FullyPaid: serviceRequest.InvoiceAmount}<br/><a hidden={serviceRequest.IsInvoicePaid || !serviceRequest.InvoiceID} href={`/payments/add?ID=${serviceRequest.InvoiceID}`}><img src={newWindow} /></a></td>
                                    </tr>
                                )
                            })}

                        </table>
                    }
                    {role === "Technician" &&
                        <table>
                            <tr>
                                <th>
                                    {language === "English" ? EnglishStrings.Vehicle : SpanishStrings.Vehicle}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Technician : SpanishStrings.Technician}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.ServiceDate : SpanishStrings.ServiceDate}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Issue : SpanishStrings.Issue}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Location : SpanishStrings.Location}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Status : SpanishStrings.Status}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.JobAssignment : SpanishStrings.JobAssignment}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.WorkDone : SpanishStrings.WorkDone}
                                </th>
                            </tr>
                            {serviceRequests.map((serviceRequest) => {
                                return (
                                    <tr>
                                        <td dangerouslySetInnerHTML={{
                                            __html: (serviceRequest.VehicleColor + " " +
                                                serviceRequest.VehicleYear + "\n" +
                                                serviceRequest.VehicleMake + " " +
                                                serviceRequest.VehicleModel).replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                        <td>{serviceRequest.TechnicianFirstName + " " +
                                            serviceRequest.TechnicianLastName}
                                        </td>
                                        <td>{formatDateTime(new Date(serviceRequest.ServiceDate + "Z"), true)}</td>
                                        <td dangerouslySetInnerHTML={{
                                            __html: serviceRequest.IssueDescription.replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                        <td dangerouslySetInnerHTML={{
                                            __html: (serviceRequest.Address + ",\n" +
                                                serviceRequest.City + ", " +
                                                serviceRequest.State + "\n" +
                                                serviceRequest.ZipCode + " " +
                                                serviceRequest.Country).replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                        <td>{serviceRequest.JobAssignmentStatus}</td>
                                        <td><a href={`/job-assignments/edit?ID=${serviceRequest.JobAssignmentID}`}><img src={newWindow} /></a></td>
                                        <td><a href={`/work-done?ID=${serviceRequest.JobAssignmentID}`}><img src={newWindow} /></a></td>
                                    </tr>
                                )
                            })}
                        </table>
                    }
                    {role === "Admin" &&
                        <table>
                            <tr>
                                <th>
                                    {language === "English" ? EnglishStrings.Vehicle : SpanishStrings.Vehicle}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Technician : SpanishStrings.Technician}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.ServiceDate : SpanishStrings.ServiceDate}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Issue : SpanishStrings.Issue}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Location : SpanishStrings.Location}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Status : SpanishStrings.Status}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.JobAssignment : SpanishStrings.JobAssignment}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.WorkDone : SpanishStrings.WorkDone}
                                </th>
                                <th>
                                    {language === "English" ? EnglishStrings.Invoice : SpanishStrings.Invoice}
                                </th>
                            </tr>
                            {serviceRequests.map((serviceRequest) => {
                                return (
                                    <tr>
                                        <td dangerouslySetInnerHTML={{
                                            __html: (serviceRequest.VehicleColor + " " +
                                                serviceRequest.VehicleYear + "\n" +
                                                serviceRequest.VehicleMake + " " +
                                                serviceRequest.VehicleModel).replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                        <td>{serviceRequest.TechnicianFirstName + " " +
                                            serviceRequest.TechnicianLastName}
                                        </td>
                                        <td>{formatDateTime(new Date(serviceRequest.ServiceDate + "Z"), true)}</td>
                                        <td dangerouslySetInnerHTML={{
                                            __html: serviceRequest.IssueDescription.replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                        <td dangerouslySetInnerHTML={{
                                            __html: (serviceRequest.Address + ",\n" +
                                                serviceRequest.City + ", " +
                                                serviceRequest.State + "\n" +
                                                serviceRequest.ZipCode + " " +
                                                serviceRequest.Country).replace(/\n/g, "<br/>")
                                        }}>
                                        </td>
                                        <td>{serviceRequest.Status}</td>
                                        <td><a hidden={!!serviceRequest.JobAssignmentID} href={`/job-assignments/add?ID=${serviceRequest.ServiceRequestID}`}><img src={newWindow} /></a></td>
                                        <td><a hidden={!serviceRequest.JobAssignmentID} href={`/work-done?ID=${serviceRequest.JobAssignmentID}`}><img src={newWindow} /></a></td>
                                        <td>{serviceRequest.InvoiceAmount} <a hidden={!!serviceRequest.InvoiceID} href={`/invoices/add?ID=${serviceRequest.ServiceRequestID}`}><img src={newWindow} /></a></td>
                                    </tr>
                                )
                            })}

                        </table>
                    }
                </div>
            </div>
        </div>
    );
}
