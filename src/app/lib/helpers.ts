import { FormikErrors, FormikTouched } from "formik";
import { get } from "lodash";

export const isFieldInvalid = <T>(name: string, formik: { touched: FormikTouched<T>, errors: FormikErrors<T> }): boolean => {
    return Boolean(get(formik.touched, name) && get(formik.errors, name));
};

export const fieldErrorMessage = <T>(name: string, formik: { touched: FormikTouched<T>, errors: FormikErrors<T> }): string => {
    return get(formik.touched, name) && get(formik.errors, name) ? String(get(formik.errors, name)) : '';
};
