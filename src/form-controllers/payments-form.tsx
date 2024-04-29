import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {PaymentTypes} from "../enums";
import {PaymentMethod} from "../App";
import Input from "../components/input";
import Radio, {RadioOptions} from "../components/radio";

const radioOptions: RadioOptions = [
    {label: "PayPal", value: PaymentTypes.PAYPAL},
    {label: "Credit card", value: PaymentTypes.CREDIT_CARD}
];

const schema = yup.object({
    type: yup.string().required(),
    email: yup.string().email()
        .when("type", {
            is: (type: PaymentTypes) => type === PaymentTypes.PAYPAL,
            then: (schema) => schema.required("Email field is required"),
            otherwise: (schema) => schema.notRequired()
        }),
    cardNumber: yup.string()
        .when("type", {
            is: (type: PaymentTypes) => type === PaymentTypes.CREDIT_CARD,
            then: (schema) => schema.required("Card number field is required").matches(/^(?:\d{4}){3}\d{4}$/, "Card number is wrong"),
            otherwise: (schema) => schema.notRequired()
        })
});

function PaymentsForm({email, cardNumber, type = PaymentTypes.PAYPAL, onChange, onBackButtonClick}: {
    email?: string,
    cardNumber?: string,
    type?: PaymentTypes,
    onChange: (data: PaymentMethod) => void,
    onBackButtonClick: () => void
}) {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors}
    } = useForm({
        defaultValues: {
            type: PaymentTypes.PAYPAL,
            email: "",
            cardNumber: ""
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        setValue("type", type);
        if (type === PaymentTypes.PAYPAL) {
            setValue("email", email);
        }
        if (type === PaymentTypes.CREDIT_CARD) {
            setValue("cardNumber", cardNumber);
        }
    }, []);

    const onSubmit = (data: any) => onChange(data);

    return <form onSubmit={handleSubmit(onSubmit)}>
        <Radio options={radioOptions} register={register("type")}/>
        {watch("type") === PaymentTypes.PAYPAL &&
            <Input label="Email:" type="text" register={register("email")} errorText={errors?.email?.message}/>
        }
        {watch("type") === PaymentTypes.CREDIT_CARD &&
            <Input label="Card number:" type="text" register={register("cardNumber")}
                   errorText={errors?.cardNumber?.message}/>
        }
        <button onClick={onBackButtonClick} type="button">Back</button>
        <button type="submit">Submit</button>
    </form>;
}

export default PaymentsForm;