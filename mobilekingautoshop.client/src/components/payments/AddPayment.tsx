/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TextFieldControl from "../../controls/TextFieldControl";
import EnglishStrings from "../../strings/EnglishStrings";
import SpanishStrings from "../../strings/SpanishStrings";
import React from "react";
import DateTimeControl from "../../controls/DateTimeControl";
import IAddPayment from "../../interfaces/components/payments/IAddPayment";
import ICustomerCreditCard from "../../interfaces/ICustomerCreditCard";
import getCustomerCreditCards from "../../services/customer-credit-cards/GetCustomerCreditCards";
import getCookie from "../../utilities/GetCookie";
import addPayment from "../../services/payments/AddPayment";
import DropdownControl from "../../controls/DropdownControl";
import addPaymentWithCard from "../../services/payments/AddPaymentWithCard";
import createChoices from "../../utilities/CreateChoices";
import convertDateTimeISO from "../../utilities/ConvertDateTimeISO";

export default function AddPayment(props: IAddPayment) {
    const { language } = props;
    const [paymentInformation, setPaymentInformation] = React.useState<any>({
        paymentID: 0,
        customerEmail: "",
        creditCardID: 0,
        cardNumber: "",
        securityCode: 0,
        expirationDate: new Date(),
        expirationDateString: "",
        isHidden: false,
        invoiceID: 0,
        amount: 0,
        paymentDate: new Date(),
        paymentDateString: "",
    });
    const [isNewCard, setIsNewCard] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [customerCreditCards, setCustomerCreditCards] = React.useState<ICustomerCreditCard[]>([]);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({
        creditCardID: "",
        cardNumber: "",
        securityCode: "",
        expirationDate: "",
        amount: "",
        dueDate: "",
    });
    const [invoiceID, setInvoiceID] = React.useState(0);
    const [email, setEmail] = React.useState("");

    React.useEffect(() => {
        async function getCustomerCreditCardsResponse() {
            const customerCreditCardsResponse = await getCustomerCreditCards({ language: language });
            if (!customerCreditCardsResponse.doesErrorExist) {
                const emailCookie = getCookie("email");
                setEmail(emailCookie);
                const loadedCards = customerCreditCardsResponse.customerCreditCards.filter(card => card.CustomerEmail === emailCookie);
                setCustomerCreditCards(loadedCards);
            }
            else {
                setErrorMessage(customerCreditCardsResponse.errorMessage);
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const invoiceIDQuery = urlParams.get('ID');
        if (!!invoiceIDQuery) {
            setInvoiceID(parseInt(invoiceIDQuery));
            getCustomerCreditCardsResponse();
        }
    }, []);

    const handleTextChange = (event: any) => {
        setPaymentInformation({
            ...paymentInformation,
            [event.target.id]: event.target.value
        })
    }

    const handleCardChange = (event: any) => {
        const cardID = parseInt(event.target.value);
        const filteredCard = customerCreditCards.filter(card => card.CreditCardID === cardID)[0];
        console.log(filteredCard.ExpirationDate);
        setPaymentInformation({
            ...paymentInformation,
            creditCardID: cardID,
            cardNumber: filteredCard.CardNumber,
            securityCode: filteredCard.SecurityCode,
            expirationDate: new Date(filteredCard.ExpirationDate),
            expirationDateString: convertDateTimeISO(new Date(filteredCard.ExpirationDate + "Z"))
        })
    }

    const handleExpirationDateTimeChange = (event: any) => {
        setPaymentInformation({
            ...paymentInformation,
            expirationDateString: event.target.value,
            expirationDate: new Date(event.target.value)
        })
    }

    const submitForm = async () => {
        setIsLoading(true);
        setFormErrors({
            creditCardID: "",
            cardNumber: "",
            securityCode: "",
            expirationDate: "",
            amount: "",
            dueDate: "",
        });
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
        if (!isNewCard) {
            const addPaymentResponse = await addPayment({
                item: {
                    PaymentID: 0,
                    InvoiceID: invoiceID,
                    CreditCardID: paymentInformation.creditCardID,
                    Amount: paymentInformation.amount,
                    PaymentDate: new Date(),
                }
            });
            if (addPaymentResponse.doesErrorExist) {
                setErrorMessage(addPaymentResponse.errorMessage);
            }
            else {
                setErrorMessage("");
                setIsSuccessful(true);
            }
        }
        else {
            const addPaymentWithCardResponse = await addPaymentWithCard({
                item: {
                    PaymentID: 0,
                    InvoiceID: invoiceID,
                    CustomerEmail: email,
                    CardNumber: paymentInformation.cardNumber,
                    SecurityCode: paymentInformation.securityCode,
                    ExpirationDate: paymentInformation.expirationDate,
                    IsHidden: false,
                    Amount: paymentInformation.amount,
                    PaymentDate: new Date()
                }
            });
            if (addPaymentWithCardResponse.doesErrorExist) {
                setErrorMessage(addPaymentWithCardResponse.errorMessage);
            }
            else {
                setErrorMessage("");
                setIsSuccessful(true);
            }
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
                        <span>{language === "English" ? EnglishStrings.NewPaymentSuccess : SpanishStrings.NewPaymentSuccess
                    } </span>
                </div>
            }
            <div hidden={isSuccessful || !invoiceID}>
                <h2>{language === "English" ?
                    EnglishStrings.Payment :
                    SpanishStrings.Payment
                }</h2>
                <div className="actionButtonsContainer">
                    {!isNewCard &&
                        <button onClick={() => setIsNewCard(true)}>
                            {language === "English" ?
                                EnglishStrings.NewCard :
                                SpanishStrings.NewCard}
                        </button>
                    }
                    {isNewCard &&
                        <button onClick={() => setIsNewCard(false)}>
                            {language === "English" ?
                                EnglishStrings.ExistingCard :
                                SpanishStrings.ExistingCard}
                        </button>
                    }
                </div>
                {!isNewCard &&
                    <DropdownControl
                        fieldLabel={language === "English" ?
                            EnglishStrings.CreditCard : SpanishStrings.CreditCard}
                        onChangeDropdown={handleCardChange}
                        currentValue={paymentInformation.creditCardID}
                        dropdownOptions={createChoices({
                            items: customerCreditCards,
                            labelProperty: "CardNumber",
                            valueProperty: "CreditCardID"
                        })}
                        inputID="creditCardID"
                        isDisabled={isNewCard}
                    />
                }
                <div
                    className="errorContainer"
                    hidden={!formErrors.creditCardID}
                >
                    <span>{formErrors.creditCardID}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.CardNumber : SpanishStrings.CardNumber}
                    onChangeTextField={handleTextChange}
                    currentValue={paymentInformation.cardNumber}
                    inputID="cardNumber"
                    isExpandable={false}
                    isDisabled={!isNewCard}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.cardNumber}
                >
                    <span>{formErrors.cardNumber}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.SecurityCode : SpanishStrings.SecurityCode}
                    onChangeTextField={handleTextChange}
                    currentValue={paymentInformation.securityCode}
                    inputID="securityCode"
                    isExpandable={false}
                    isDisabled={!isNewCard}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.securityCode}
                >
                    <span>{formErrors.securityCode}</span>
                </div>
                <DateTimeControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.ExpirationDate : SpanishStrings.ExpirationDate}
                    onChangeDateTime={handleExpirationDateTimeChange}
                    currentValue={paymentInformation.expirationDateString}
                    inputID="expirationDateString"
                    isDisabled={!isNewCard}
                />
                <div
                    className="errorContainer"
                    hidden={!formErrors.expirationDate}
                >
                    <span>{formErrors.expirationDate}</span>
                </div>
                <TextFieldControl
                    fieldLabel={language === "English" ?
                        EnglishStrings.Amount : SpanishStrings.Amount}
                    onChangeTextField={handleTextChange}
                    currentValue={paymentInformation.amount}
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