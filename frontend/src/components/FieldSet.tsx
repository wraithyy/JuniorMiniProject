import * as React from "react";

type FieldSetProps = {
    children: React.ReactNode;
    id: string;
    legend: string;
    className?: string;

}

export default function FieldSet({children, id, legend, className}: FieldSetProps) {


    return (
        <>
            <fieldset id={id} className={className}>
                <legend>{legend}</legend>
                {children}
            </fieldset>
        </>
    )
}