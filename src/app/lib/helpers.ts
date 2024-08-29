import { FormikErrors, FormikTouched } from "formik";
import { get } from "lodash";
import { DateTime } from 'luxon';


export const isFieldInvalid = <T>(name: string, formik: { touched: FormikTouched<T>, errors: FormikErrors<T> }): boolean => {
    return Boolean(get(formik.touched, name) && get(formik.errors, name));
};

export const fieldErrorMessage = <T>(name: string, formik: { touched: FormikTouched<T>, errors: FormikErrors<T> }): string => {
    return get(formik.touched, name) && get(formik.errors, name) ? String(get(formik.errors, name)) : '';
};



/**
 * Formats an ISO date string into a specified format.
 * @param dateString - The ISO date string to format.
 * @param format - The format string, defaults to 'dd-MM-yyyy'.
 * @returns The formatted date string.
 */
export function formatDate(dateString: string, format: string = 'dd-MM-yyyy'): string {
    const dt = DateTime.fromISO(dateString);
    return dt.toFormat(format);
}

export function formatPriceINR(amount: number): string {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formatter.format(amount);
}