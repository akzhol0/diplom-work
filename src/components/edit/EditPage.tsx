"use client";

import React, { useContext, useState } from "react";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";
import { contextData } from "@/components/context/context";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";
import LoadingUi from "@/components/UI/my-loading/LoadingUI";
import { UserInfoTypes } from "@/components/types/types";

const EditPage = () => {
  const { userInfo, mainLanguage, checkIfUserLogged, isAuth } =
    useContext(contextData);
  const router = useRouter();

  const [stateForm, setStateForm] = useState({
    name: "",
    gender: "",
    birthdate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateStr = stateForm.birthdate;
    const milliseconds = new Date(dateStr).getTime();

    const userChangedData = {
      userName: stateForm.name === "" ? userInfo.userName : stateForm.name,
      userId: userInfo.userId,
      userLogin: userInfo.userLogin,
      userPassword: userInfo.userPassword,
      role: userInfo.role,
      gender: stateForm.gender === "" ? userInfo.gender : stateForm.gender,
      image: userInfo.image,
      birthdate: stateForm.birthdate === "" ? userInfo.birthdate : milliseconds,
      friends: userInfo.friends,
      verified: userInfo.verified,
    };

    updateFirebaseData(userChangedData);
    checkIfUserLogged();

    router.push("/profile");
  };

  const updateFirebaseData = async (userChangedData: UserInfoTypes) => {
    const referral = doc(db, "users", `${userInfo.userId}`);

    await updateDoc(referral, {
      ...userChangedData,
    });
  };

  return isAuth ? (
    <form
      onSubmit={submitHandler}
      className="w-[95%] md:w-[80%] min-h-[500px] flex flex-col items-center justify-center py-8"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 border-b">
          <p className="text-gray-700">{mainLanguage.edit.nameLname}:</p>
          <input
            className="w-[200px] h-[40px] focus:outline-0"
            placeholder={mainLanguage.leftOut.newName}
            type="text"
            id="name"
            name="name"
            value={stateForm.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex gap-2 justify-center items-center border-b pb-2">
          <label className="text-gray-700 text-md whitespace-nowrap">
            {mainLanguage.rest.birth}:
          </label>
          <input
            type="date"
            value={stateForm.birthdate}
            onChange={handleChange}
            name="birthdate"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-gray-700 w-full flex justify-between gap-2 pb-2 items-start border-b">
          <p className="pe-2">{mainLanguage.loginAndRegsitration.gender}:</p>
          <select
            value={stateForm.gender}
            onChange={(e) =>
              setStateForm({ ...stateForm, gender: e.target.value })
            }
            className="focus:outline-0"
            name="gender"
            id="gender-select"
          >
            {mainLanguage.loginAndRegsitration.genders.map((item: any) => (
              <option key={item.local} value={item.ru}>
                {item.local}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <span onClick={() => router.push("/profile")}>
          <MyDangerButton>{mainLanguage.edit.btn2}</MyDangerButton>
        </span>
        <MyPrimaryButton type="submit">{mainLanguage.edit.btn}</MyPrimaryButton>
      </div>
    </form>
  ) : (
    <LoadingUi />
  );
};

export default EditPage;
