import React, { ChangeEvent } from 'react'

interface InputProps {
    isInvalid?: boolean;
    errorMessage?: string | null;
    type?: string;
    label?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>
    className?:string
}

const Input = ({ type = 'text', label, name, value = '', placeholder, errorMessage, isInvalid = false, onChange,className }: InputProps) => {
    return (
        <>
            {label && <label htmlFor={name} className="form-label text-default">{label}</label>}
            <div className="relative">
                <input type={type} id={name} className={`form-control form-control-lg w-full !rounded-md ${isInvalid && '!border-danger focus:border-danger focus:ring-danger'} ${className}`} name={name} value={value} placeholder={placeholder} onChange={onChange} />

            </div>
            {isInvalid && <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">{errorMessage}</p>}
        </>
    )
}

export default Input
