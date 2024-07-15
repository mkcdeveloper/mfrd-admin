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
}

const Input = ({ type = 'text', label, name, value = '', placeholder, errorMessage, isInvalid = false, onChange }: InputProps) => {
    return (
        <>
            {label && <label htmlFor={name} className="form-label text-default">Email</label>}
            <div className="relative">
                <input type={type} id={name} className={`form-control form-control-lg w-full !rounded-md ${isInvalid && '!border-danger focus:border-danger focus:ring-danger'}`} name={name} value={value} placeholder={placeholder} onChange={onChange} />
                {isInvalid &&
                    <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg className="h-5 w-5 text-danger" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                    </div>
                }
            </div>
            <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">{errorMessage}</p>
        </>
    )
}

export default Input
