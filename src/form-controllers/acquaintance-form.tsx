import React, {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/input";

type Inputs = {
    fullName: string
}

const schema = yup.object({
    fullName: yup.string()
        .required("Full name field is required")
        .matches(/^[a-zA-Z]{3,}(?: [a-zA-Z]{3,}){1,}$/u, "Full name field must consist of at least 2 words, at least 3 characters in each word")
});

function AcquaintanceForm({fullName, onChange}: { fullName: string, onChange: (data: Inputs) => void }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<Inputs>({
        defaultValues: {
            fullName: ""
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        setValue("fullName", fullName);
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => onChange(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input label="Full name:" type="text" register={register("fullName")}
                   errorText={errors?.fullName?.message}/>
            <button
                type="submit">Submit
            </button>
        </form>
    );
}

export default AcquaintanceForm;