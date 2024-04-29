import React, {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/input";

type Inputs = {
    email: string
    password: string
    confirmPassword: string
}

const schema = yup.object({
    email: yup.string().email().required("Email field is required"),
    password: yup.string().required("Password field is required")
        .matches(/^(?=.*\d)(?=.*[A-Z]).{8,}$/, "Password field must consist of at least 8 characters, at least one number, one capital letter"),
    confirmPassword: yup.string().required("Confirm password field is required")
        .oneOf([yup.ref("password")], "Passwords must match")
});

function CredentialsForm({email, password, confirmPassword, onChange, onBackButtonClick}: {
    email: string,
    password: string,
    confirmPassword: string,
    onChange: (data: Inputs) => void,
    onBackButtonClick: () => void
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<Inputs>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "string"
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        setValue("email", email);
        setValue("password", password);
        setValue("confirmPassword", confirmPassword);
    }, []);
    
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => onChange(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input label="Email:" type="text" register={register("email")} errorText={errors?.email?.message}/>
            <Input label="Password:" type="password" register={register("password")}
                   errorText={errors?.password?.message}/>
            <Input label="Confirm password:" type="password" register={register("confirmPassword")}
                   errorText={errors?.confirmPassword?.message}/>
            <button onClick={onBackButtonClick} type="button">Back</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CredentialsForm;