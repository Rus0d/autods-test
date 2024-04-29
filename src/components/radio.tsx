import React from "react";
import {PaymentTypes} from "../enums";

export type RadioOptions = Array<{
    label?: string,
    value: PaymentTypes,
}>;

function Radio({options, register}: { options: RadioOptions, register: any }) {
    return (
        <div style={{marginBottom: "1rem"}}>
            {
                options.length && (
                    options.map(({label, value}: any) =>
                        <label style={{display: "block"}} key={`key-${value}`}>
                            <input {...{
                                ...register,
                                type: "radio",
                                value
                            }} />
                            {label}
                        </label>
                    )
                )
            }
        </div>
    );
}

export default Radio;