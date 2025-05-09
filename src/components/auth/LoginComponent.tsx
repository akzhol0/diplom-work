"use client";

import React, { useContext, useState } from "react";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import Link from "next/link";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { contextData } from "../context/context";
import EyeIcon from "../UI/icons/eye/EyeIcon";
import Cookies from "js-cookie";

function LoginComponent() {
  const { checkIfUserLogged, mainLanguage } = useContext(contextData);

  const [stateForm, setStateForm] = useState({
    login: "",
    password: "",
    passwordEye: false,
    error: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (stateForm.login === "" || stateForm.password === "") {
      setStateForm({ ...stateForm, error: "Пажалуйста заполните все поля" });
      return;
    }

    signInWithEmailAndPassword(auth, stateForm.login, stateForm.password)
      .then((userCredential) => {
        Cookies.set("userId", userCredential.user.uid);

        checkIfUserLogged();
        router.push("/profile");
      })
      .catch((err) => {
        setStateForm({ ...stateForm, error: err.message });
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center rounded-xl text-black"
    >
      <p className="text-3xl py-4">
        {mainLanguage.loginAndRegsitration.titleLogin}
      </p>
      <div className="flex flex-col gap-4">
        <input
          className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
          placeholder={mainLanguage.loginAndRegsitration.email}
          type="text"
          id="login"
          name="login"
          value={stateForm.login}
          onChange={handleChange}
        />
        <div className="flex relative">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder={mainLanguage.loginAndRegsitration.password}
            type={stateForm.passwordEye ? "text" : "password"}
            name="password"
            value={stateForm.password}
            onChange={handleChange}
          />
          <div
            onClick={() =>
              setStateForm({
                ...stateForm,
                passwordEye: !stateForm.passwordEye,
              })
            }
            className="absolute right-4 bottom-4 cursor-pointer"
          >
            <EyeIcon />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm ">
          <Link href="/register">
            <p className="text-center cursor-pointer hover:underline">
              {mainLanguage.loginAndRegsitration.labelLogin}
            </p>
          </Link>
          <MyButtonDanger
            type="submit"
            className="bg-[#131313] border-white hover:bg-red-600 duration-300 text-white"
          >
            {mainLanguage.loginAndRegsitration.btnLogin}
          </MyButtonDanger>
          {/*<MyGoogleButton />*/}
          <p className="text-center cursor-pointer text-red-600">
            {stateForm.error}
          </p>
        </div>
      </div>
    </form>
  );
}

export default LoginComponent;
