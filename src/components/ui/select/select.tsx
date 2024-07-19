import dynamic from 'next/dynamic';
import React from 'react'
import { ActionMeta } from 'react-select';
const SelectReact = dynamic(() => import("react-select"), { ssr: false });


interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    isSearchable?: boolean;
    placeholder?: string;
    isInvalid?: boolean;
    name?: string;
    id?: string;
    errorMessage?: string | null;
    label?: string;
    onChange: ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void) | undefined;
    isMulti?: boolean;
    className?:string


}

const Select = ({ options, isSearchable = false, label, isInvalid, errorMessage, onChange, name, id, isMulti = false,className,placeholder }: SelectProps) => {
    return (
        <>
            <label className="form-label">{label}</label>
            <SelectReact id="product-category-add" options={options} name={name} className={`w-full !rounded-md ${isInvalid && '!border-danger focus:border-danger focus:ring-danger'} ${className}`} isMulti={isMulti} isSearchable={isSearchable}
                menuPlacement='auto' classNamePrefix="Select2" placeholder={placeholder} onChange={onChange}
            />
            {isInvalid && <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">{errorMessage}</p>}
        </>
    )
}

export default Select
