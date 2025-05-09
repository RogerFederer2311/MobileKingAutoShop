/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TextFieldControl from "../../controls/TextFieldControl";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import IAddInvoice from "../../interfaces/components/invoices/IAddInvoice";
import addInvoice from "../../services/invoices/AddInvoice";
import DateTimeControl from "../../controls/DateTimeControl";

export default function AddInvoice(props: IAddInvoice) {
    const { language } = props;
    const [invoiceInformation, setInvoiceInformation] = React.useState<any>({
        invoiceID: 0,
        serviceRequestID: 0,
        amount: 0,
        dueDate: new Date(),
        dueDateString: "",
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({
        amount: "",
        dueDate: "",
    });
    const [serviceRequestID, setServiceRequestID] = React.useState(0);

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceRequestIDQuery = urlParams.get('ID');
        if (!!serviceRequestIDQuery) {
            setServiceRequestID(parseInt(serviceRequestIDQuery));
        }
    }, []);

    const handleTextChange = (event: any) => {
        setInvoiceInformation({
            ...invoiceInformation,
            [event.target.id]: event.target.value
        })
    }

    const handleDateTimeChange = (event: any) => {
        setInvoiceInformation({
            ...invoiceInformation,
            dueDateString: event.target.value,
            dueDate: new Date(event.target.value)
        })
    }

    const submitForm = async () => {
        setIsLoading(true);
        setFormErrors({
            amount: "",
            dueDate: "",
        })
        /*
        const  = checkJobAssignmentFormValidity({
            language: language,
            technicianEmail: jobAssignmentInformation.technicianEmail
        });
        if (jobAssignmentFormValidity.doErrorsExist) {
            setFormErrors(jobAssignmentFormValidity.errors);
        }
        else {
        */
        const addInvoiceResponse = await addInvoice({
            item: {
                InvoiceID: 0,
                ServiceRequestID: serviceRequestID,
                Amount: parseFloat(invoiceInformation.amount.replace(/,*/g, "")),
                DueDate: invoiceInformation.dueDate,
            }
        });
        if (addInvoiceResponse.doesErrorExist) {
            setErrorMessage(addInvoiceResponse.errorMessage);
        }
        else {
            setErrorMessage("");
            setIsSuccessful(true);
        }
        //}
        setIsLoading(false);
    }

    return (
        <div>
            {isLoading &&
                <div className="loadingContainer" >
                    <span>{language === "English" ? EnglishStrings.Loading : SpanishStrings.Loading
                    } </span>
                </div>
            }
            {
                !!errorMessage &&
                <div className="errorContainer" >
                    <span>{errorMessage} </span>
                </div>
            }
            {
                isSuccessful &&
                <div className="successContainer" >
                    <span>{language === "English" ? EnglishStrings.NewInvoiceSuccess : SpanishStrings.NewInvoiceSuccess}</span>
                </div>
            }
            <div hidden={isSuccessful || !serviceRequestID}>
                <h2>{language === "English" ?
                    EnglishStrings.Invoice :
                    SpanishStrings.Invoice
                }</h2>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Amount : SpanishStrings.Amount}
                    onChangeTextField={handleTextChange}
                    currentValue={invoiceInformation.amount}
                    inputID="amount"
                    isExpandable={false}
                    isDisabled={false}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.amount}
                >
                    <span>{formErrors.amount}</span>
                </div>
                <DateTimeControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.DueDate : SpanishStrings.DueDate}
                    onChangeDateTime={handleDateTimeChange}
                    currentValue={invoiceInformation.dueDateString}
                    inputID="dueDateString"
                    isDisabled={false}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.dueDate}
                >
                    <span>{formErrors.dueDate}</span>
                </div>
                < div className="actionButtonsContainer" >
                    <button
                        className="submitButton"
                        onClick={submitForm}
                    >
                        {language === "English" ? EnglishStrings.Submit : SpanishStrings.Submit}
                    </button>
                </div>
            </div>
        </div>
    )
}