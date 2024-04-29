import React, {useState} from "react";
import AcquaintanceForm from "./form-controllers/acquaintance-form";
import CredentialsForm from "./form-controllers/credentials-form";
import PaymentsForm from "./form-controllers/payments-form";
import {PaymentTypes, Steps} from "./enums";
import "./App.css";

export type PaymentMethod = {
    type: PaymentTypes,
    email?: string,
    cardNumber?: string,
}

type RegistrationData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    paymentMethod?: PaymentMethod
}

function App() {
    const [step, setStep] = useState<Steps>(Steps.ACQUAINTANCE);
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        paymentMethod: {
            type: PaymentTypes.PAYPAL,
            email: ""
        }
    });
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        paymentMethod
    } = registrationData;

    const onAcquaintanceChange = ({fullName}: { fullName: string }) => {
        const [firstName, ...lastNames]: string[] = fullName.split(" ");
        const lastName = lastNames.join(" ");

        setRegistrationData({
            ...registrationData,
            firstName,
            lastName
        });
        setStep(Steps.CREDENTIALS);
    };

    const onCredentialsChange = ({email, password, confirmPassword}: {
        email: string,
        password: string,
        confirmPassword: string
    }) => {
        setRegistrationData({
            ...registrationData,
            email,
            password,
            confirmPassword
        });
        setStep(Steps.PAYMENTS);
    };

    const onPaymentsChange = ({type, email, cardNumber}: PaymentMethod) => {
        let form = registrationData;
        if (type === PaymentTypes.PAYPAL && email) {
            form = {
                ...registrationData,
                paymentMethod: {
                    type,
                    email
                }
            };
        }
        if (type === PaymentTypes.CREDIT_CARD && cardNumber) {
            form = {
                ...registrationData,
                paymentMethod: {
                    type,
                    cardNumber
                }
            };
        }
        console.log(form);
        setRegistrationData(form);
    };

    const onBackButtonClick = () => {
        switch (step) {
            case Steps.PAYMENTS:
                setStep(Steps.CREDENTIALS);
                break;
            case Steps.CREDENTIALS:
                setStep(Steps.ACQUAINTANCE);
                break;
        }
    };

    return (
        <div className="App">
            <div className="form-wrapper">
                {step === Steps.ACQUAINTANCE && <AcquaintanceForm {...{
                    fullName: `${firstName} ${lastName}`.trim(),
                    onChange: onAcquaintanceChange
                }} />}
                {step === Steps.CREDENTIALS &&
                    <CredentialsForm {...{
                        email,
                        password,
                        confirmPassword,
                        onChange: onCredentialsChange,
                        onBackButtonClick: onBackButtonClick
                    }} />}
                {step === Steps.PAYMENTS &&
                    <PaymentsForm {...{
                        email: paymentMethod?.email,
                        cardNumber: paymentMethod?.cardNumber,
                        type: paymentMethod?.type,
                        onChange: onPaymentsChange,
                        onBackButtonClick: onBackButtonClick
                    }} />}
            </div>
        </div>
    );
}

export default App;
