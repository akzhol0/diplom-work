"use client";

import React, { createContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { en } from "../language/en";
import { ru } from "../language/ru";
import { kz } from "../language/kz";
import { FeedbacksTypes, UserInfoTypes } from "@/components/types/types";

type ContextProps = {
  auth: boolean;
  setAuth: (arg0: boolean) => void;
  burgerMenu: boolean;
  setBurgerMenu: (arg0: boolean) => void;
  checkIfUserLogged: () => void;
  userInfo: UserInfoTypes;
  setLanguageChanger: (arg0: string) => void;
  mainLanguage: any;
  languageChanger: string;
  questionChanger: string;
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
  feedbacks: FeedbacksTypes[];
  setFeedbacks: (arg0: any) => void;
  loadedFeedbacks: boolean;
  setUserInfo: (arg0: any) => void;
  users: UserInfoTypes[];
  getFeedbacks: () => void;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [userInfo, setUserInfo] = useState<any>();
  const [feedbacks, setFeedbacks] = useState<FeedbacksTypes[]>([]);

  const [users, setUsers] = useState<UserInfoTypes[]>([]);

  const [auth, setAuth] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [languageChanger, setLanguageChanger] = useState("ru");
  const [mainLanguage, setMainLanguage] = useState<any>(ru);
  const [questionChanger, setQuestionChanger] = useState("");

  const [loadedFeedbacks, setLoadedFeedbacks] = useState(false);

  const getUsers = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUsers((prev: any) => [...prev, doc.data()]);
    });
  };

  const getFeedbacks = async () => {
    const q = query(collection(db, "feedbacks"), orderBy("date", "asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFeedbacks((prev: any) => [{ ...doc.data(), id: doc.id }, ...prev]);
    });

    setLoadedFeedbacks(true);
  };

  const languageHelper = [
    {
      languageString: "ru",
      languageMain: { ...ru },
    },
    {
      languageString: "en",
      languageMain: { ...en },
    },
    {
      languageString: "kz",
      languageMain: { ...kz },
    },
  ];

  useEffect(() => {
    !auth && checkIfUserLogged();
    !loadedFeedbacks && getFeedbacks();
    users.length === 0 && getUsers();

    const localstorageMainLanguage = localStorage.getItem("lang");
    setLanguageChanger(localstorageMainLanguage || "ru");
  }, []);

  useEffect(() => {
    languageHelper.map((item) => {
      if (languageChanger === item.languageString) {
        setMainLanguage(item.languageMain);
        setQuestionChanger(item.languageString);
      }
    });
  }, [languageChanger]);

  const checkIfUserLogged = async () => {
    const result = localStorage.getItem("userId");
    const userId = result ? JSON.parse(result) : null;

    if (userId !== null) {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
        setAuth(true);
      }
    }
  };

  return (
    <contextData.Provider
      value={{
        auth,
        setAuth,
        burgerMenu,
        setBurgerMenu,
        checkIfUserLogged,
        userInfo,
        setLanguageChanger,
        mainLanguage,
        languageChanger,
        questionChanger,
        isVisible,
        setIsVisible,
        feedbacks,
        setFeedbacks,
        loadedFeedbacks,
        setUserInfo,
        users,
        getFeedbacks,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
