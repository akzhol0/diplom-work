"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../firebase/config";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { contextData } from "../context/context";
import EyeIcon from "../UI/icons/eye/EyeIcon";
import Cookies from "js-cookie";
import MyGoogleButton from "@/components/UI/my-buttons/MyGoogleButton";

function RegisterComponent() {
  const { mainLanguage, users, checkIfUserLogged } = useContext(contextData);
  const router = useRouter();

  const [stateForm, setStateForm] = useState({
    userName: "",
    login: "",
    password: "",
    birthdate: "",
    repeatPassword: "",
    passwordEye: false,
    gender: "Неизвестно",
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      [
        stateForm.userName,
        stateForm.login,
        stateForm.gender,
        stateForm.birthdate,
      ].some((field) => field === "")
    ) {
      setStateForm({ ...stateForm, error: mainLanguage.rest.pleaseSignAll });
      return;
    }

    createUserWithEmailAndPassword(auth, stateForm.login, stateForm.password)
      .then((userCredentials) => {
        router.push("/login");
        addUserFirebase(userCredentials);
        sendEmailVerification(userCredentials.user);
      })
      .catch((err) => {
        setStateForm({ ...stateForm, error: err.code });
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
        addUserFirebaseFromGoogle(result);
      }
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

  const addUserFirebase = async (userInfo: any) => {
    await setDoc(doc(db, "users", userInfo.user.uid), {
      userName: stateForm.userName,
      userId: userInfo.user.uid,
      userLogin: stateForm.login,
      userPassword: stateForm.password,
      role: "user",
      gender: stateForm.gender,
      image: "/images/user.png",
      birthdate: stateForm.birthdate,
      friends: [],
      verified: false,
    });
  };

  const addUserFirebaseFromGoogle = async (userInfocb: any) => {
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
        {mainLanguage.loginAndRegsitration.titleRegister}
      </p>
      <div className="flex flex-col gap-4">
        <input
          className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
          placeholder={mainLanguage.loginAndRegsitration.nameLastName}
          type="text"
          id="userName"
          name="userName"
          value={stateForm.userName}
          onChange={handleChange}
        />
        <div className="flex flex-col items-center justify-start bg-white ">
          <div className="w-full flex gap-2 justify-center items-center">
            <label className="text-gray-700 text-sm whitespace-nowrap">
              {mainLanguage.rest.birth}
            </label>
            <input
              type="date"
              name="birthdate"
              value={stateForm.birthdate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="ps-2 text-gray-700 text-sm">
            {mainLanguage.loginAndRegsitration.gender}:
          </p>
          <select
            value={stateForm.gender}
            onChange={(e) =>
              setStateForm({
                ...stateForm,
                gender: e.target.value,
              })
            }
            className="focus:outline-0 text-gray-700 text-sm"
            name="gender"
            id="gender-select"
          >
            {mainLanguage.loginAndRegsitration.genders.map((item: any) => (
              <option key={item.local} value={item.local}>
                {item.local}
              </option>
            ))}
          </select>
        </div>
        <input
          className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
          placeholder={mainLanguage.loginAndRegsitration.email}
          type="text"
          id="email"
          name="login"
          value={stateForm.login}
          onChange={handleChange}
        />
        <div className="relative">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder={mainLanguage.loginAndRegsitration.password}
            type={stateForm.passwordEye ? "text" : "password"}
            id="password"
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
        <div className="relative">
          <input
            className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
            placeholder={mainLanguage.loginAndRegsitration.repeatPassword}
            type={stateForm.passwordEye ? "text" : "password"}
            id="password-repeat"
            name="repeatPassword"
            value={stateForm.repeatPassword}
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
        <div className="flex flex-col gap-2">
          <Link href="/login">
            <p className="text-sm text-center cursor-pointer hover:underline">
              {mainLanguage.loginAndRegsitration.labelRegister}
            </p>
          </Link>
          <MyButtonDanger
            type="submit"
            className="bg-[#131313] border-white hover:bg-red-500 duration-300 text-white"
          >
            {mainLanguage.loginAndRegsitration.btnRegister}
          </MyButtonDanger>
          <div className="w-full flex" onClick={() => signInWithGoogle()}>
            <MyGoogleButton />
          </div>
          <p className="text-sm text-center text-red-600">{stateForm.error}</p>
        </div>
      </div>
    </form>
  );
}

export default RegisterComponent;
