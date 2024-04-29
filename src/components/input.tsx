import React from "react";

function Input({label = "", type, register, errorText}: {
    label?: string,
    type: string,
    errorText?: string,
    register: any
}) {
    return (
        <div style={{marginBottom: "1rem"}}>
            <label>
                {label}
                <input type={type} {...register} aria-invalid={!!errorText} style={{display: "block", width: "100%"}}/>
            </label>
            {errorText && <span>{errorText}</span>}
        </div>
    );
}

export default Input;