"use client"
import { basePath } from "@next.config";
import { auth } from "@/shared/firebase/firebaseapi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@/components/ui/button/button";
import * as Yup from 'yup';
import Input from "@/components/ui/input/input";
import { fieldErrorMessage, isFieldInvalid } from "../lib/helpers";
import axios from "axios";

export default function Home() {


  const [passwordshow1, setpasswordshow1] = useState(false);

  const [err, setError] = useState("");
  const [data, setData] = useState({
    "email": "adminnextjs@gmail.com",
    "password": "1234567890",
  });
  const { email, password } = data;
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  const Login = (e: any) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then(
      user => { console.log(user); RouteChange(); }).catch(err => { setError(err.message); });
  };

  const Login1 = (_e: any) => {
    if (data.email == "adminnextjs@gmail.com" && data.password == "1234567890") {
      RouteChange();
    }
    else {
      setError("The Auction details did not Match");
      setData({
        "email": "adminnextjs@gmail.com",
        "password": "1234567890",
      });
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const RouteChange = () => {
    let path = "/dashboards";
    router.push(path);
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      const res = await axios.post(`${process.env.NEXT_BACKEND_URL}/api/login`, values);
    }
  });

  return (
    <>
      <html>
        <body>
          <div className="container">
            <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
              <div className="grid grid-cols-12">
                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
                  <div className="my-[2.5rem] flex justify-center">
                    <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} alt="logo" className="desktop-logo w-40" />
                    <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-dark.png`} alt="logo" className="desktop-dark w-40" />
                  </div>

                  <div className="box !p-[3rem]">
                    <div className="box-body" role="tabpanel" id="pills-with-brand-color-01" aria-labelledby="pills-with-brand-color-item-1">

                      <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                      {err && <div className="p-4 mb-4 bg-danger/40 text-sm  border-t-4 border-danger text-danger/60 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {err}
                      </div>}

                      <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">Welcome back</p>
                      <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-12 gap-y-4">
                          <div className="xl:col-span-12 col-span-12">
                            <Input label="Email" placeholder="Email" {...formik.getFieldProps('email')} isInvalid={isFieldInvalid('email', formik)} errorMessage={fieldErrorMessage('email', formik)} />
                          </div>
                          <div className="xl:col-span-12 col-span-12 mb-2">
                            <label htmlFor="signin-password" className="form-label text-default block">Password</label>
                            <div className="input-group">
                              <input type={(passwordshow1) ? 'text' : "password"} className={`form-control  !border-s form-control-lg !rounded-s-md ${isFieldInvalid('password', formik) && '!border-danger focus:border-danger focus:ring-danger'}`} id="signin-password" placeholder="Password" {...formik.getFieldProps('password')} />
                              <button onClick={() => setpasswordshow1(!passwordshow1)} aria-label="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2"><i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i></button>
                            </div>
                            {isFieldInvalid('password', formik) && <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">{fieldErrorMessage('password', formik)}</p>}
                            <div className="mt-2">
                              <div className="form-check !ps-0">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="defaultCheck1" />
                                <label className="form-check-label text-[#8c9097] dark:text-white/50 font-normal" htmlFor="defaultCheck1">
                                  Remember password ?
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="xl:col-span-12 col-span-12 grid mt-0">
                            <Button type="submit" label="Login" loading={isLoading} color="primary" />
                          </div>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
