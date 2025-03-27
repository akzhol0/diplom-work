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
  const { userInfo, mainLanguage, checkIfUserLogged, auth } =
    useContext(contextData);
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userChangedData = {
      userName: name === "" ? userInfo.userName : name,
      userId: userInfo.userId,
      userLogin: userInfo.userLogin,
      userPassword: userInfo.userPassword,
      role: userInfo.role,
      gender: gender === "" ? userInfo.gender : gender,
      image: image === "" ? userInfo.image : image,
      birthdate: birthdate === "" ? userInfo.birthdate : birthdate,
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

  return auth ? (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="w-[95%] md:w-[80%] min-h-[500px] flex flex-col items-center justify-center py-8"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col">
            <p className="text-gray-700 text-lg">
              {mainLanguage.edit.nameLname}
            </p>
            <input
              className="w-[300px] h-[60px] border-b border-1 focus:outline-0"
              placeholder="Новое имя пользователя"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="w-full flex gap-2 justify-center items-center pt-3">
              <label className="text-gray-700 text-md whitespace-nowrap">
                Дата рождения
              </label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/*<div className="flex flex-col">*/}
          {/*  <p className="text-xl">{mainLanguage.edit.changePhoto}</p>*/}
          {/*  <input*/}
          {/*    className="w-[300px] h-[60px] border-b border-1 focus:outline-0"*/}
          {/*    placeholder={mainLanguage.edit.changePhotoPlaceholder}*/}
          {/*    type="text"*/}
          {/*    id="image"*/}
          {/*    onChange={(e) => setImage(e.target.value)}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="w-full flex justify-start gap-2 pb-4 items-center border-b">
            <p className="pe-2">{mainLanguage.loginAndRegsitration.gender}:</p>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="focus:outline-0"
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
        </div>
        <p className="max-w-[300px] text-center py-2">
          {mainLanguage.edit.comment}
        </p>
        <div className="flex gap-3">
          <span onClick={() => router.push("/profile")}>
            <MyDangerButton>{mainLanguage.edit.btn2}</MyDangerButton>
          </span>
          <MyPrimaryButton type="submit">
            {mainLanguage.edit.btn}
          </MyPrimaryButton>
        </div>
      </form>
    </div>
  ) : (
    <LoadingUi />
  );
};

export default EditPage;
