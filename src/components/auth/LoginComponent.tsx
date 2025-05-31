"use client";

import React, { useContext, useState } from "react";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import Link from "next/link";
import { auth, db, provider } from "../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { contextData } from "../context/context";
import EyeIcon from "../UI/icons/eye/EyeIcon";
import Cookies from "js-cookie";
import MyGoogleButton from "@/components/UI/my-buttons/MyGoogleButton";
import { doc, setDoc } from "firebase/firestore";

function LoginComponent() {
  const { checkIfUserLogged, mainLanguage, users } = useContext(contextData);

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

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userIdArray = users.map((user: any) => {
        return user.userId;
      });

      if (userIdArray.includes(result.user.uid)) {
        Cookies.set("userId", result.user.uid);

        checkIfUserLogged();
        router.push("/profile");
      } else {
        Cookies.set("userId", result.user.uid);

        checkIfUserLogged();
        router.push("/profile");
        addUserFirebase(result);
      }
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

  const addUserFirebase = async (userInfocb: any) => {
    await setDoc(doc(db, "users", userInfocb.user.uid), {
      userName: userInfocb.user.displayName,
      userId: userInfocb.user.uid,
      userLogin: userInfocb.user.email,
      userPassword: "google account",
      role: "user",
      gender: "Не хочу говорить",
      image: userInfocb.user.photoURL,
      birthdate: "Неизвестно",
      friends: [],
      verified: userInfocb.user.emailVerified,
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
          <div onClick={() => signInWithGoogle()}>
            <MyGoogleButton />
          </div>
          <p className="text-center cursor-pointer text-red-600">
            {stateForm.error}
          </p>
        </div>
      </div>
    </form>
  );
}

export default LoginComponent;
