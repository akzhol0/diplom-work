"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import MyButtonDanger from "../UI/my-buttons/MyDangerButton";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase/config";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { contextData } from "../context/context";
import EyeIcon from "../UI/icons/eye/EyeIcon";
import MyGoogleButton from "@/components/UI/my-buttons/MyGoogleButton";

function RegisterComponent() {
  const [userName, setUserName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);
  const [gender, setGender] = useState("Неизвестно");
  const [error, setError] = useState("");

  const { mainLanguage } = useContext(contextData);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError(mainLanguage.rest.registerPass);
      return;
    }

    if (userName === "" || login === "" || gender === "" || birthdate === "") {
      setError(mainLanguage.rest.pleaseSignAll);
      return;
    }

    createUserWithEmailAndPassword(auth, login, password)
      .then((userCredentials) => {
        router.push("/login");
        addUserFirebase(userCredentials);
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  const addUserFirebase = async (userInfo: any) => {
    await setDoc(doc(db, "users", userInfo.user.uid), {
      userName: userName,
      userId: userInfo.user.uid,
      userLogin: login,
      userPassword: password,
      role: "user",
      gender: gender,
      image: "/images/user-img.png",
      birthdate: birthdate,
    });
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      addUserFirebase(result.user);

      router.push("/login");
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
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
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="flex flex-col items-center justify-start bg-white ">
            <div className="w-full flex gap-2 justify-center items-center">
              <label className="text-gray-700 text-sm whitespace-nowrap">
                {mainLanguage.rest.birth}
              </label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="ps-2 text-gray-700 text-sm">
              {mainLanguage.loginAndRegsitration.gender}:
            </p>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <div className="relative">
            <input
              className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
              placeholder={mainLanguage.loginAndRegsitration.password}
              type={passwordEye ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setPasswordEye(!passwordEye)}
              className="absolute right-4 bottom-4 cursor-pointer"
            >
              <EyeIcon />
            </div>
          </div>
          <div className="relative">
            <input
              className="w-[300px] rounded-lg ps-2 h-[60px] border-b border-1 focus:outline-0"
              placeholder={mainLanguage.loginAndRegsitration.repeatPassword}
              type={passwordEye ? "text" : "password"}
              id="password-repeat"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <div
              onClick={() => setPasswordEye(!passwordEye)}
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
            <p className="text-sm text-center cursor-pointer text-red-600">
              {error}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterComponent;
