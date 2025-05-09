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
import Cookies from "js-cookie";

type ContextProps = {
  isAuth: boolean;
  setIsAuth: (arg0: boolean) => void;
  burgerMenu: boolean;
  setBurgerMenu: (arg0: boolean) => void;
  checkIfUserLogged: () => void;
  userInfo: any;
  setLanguageChanger: (arg0: string) => void;
  mainLanguage: any;
  languageChanger: string;
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
  feedbacks: FeedbacksTypes[];
  setFeedbacks: (arg0: any) => void;
  loadedFeedbacks: boolean;
  setUserInfo: (arg0: any) => void;
  users: UserInfoTypes[];
  getFeedbacks: () => void;
  isBotVisible: boolean;
  setIsBotVisible: (arg0: boolean) => void;
  allUsersMessages: any;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [userInfo, setUserInfo] = useState<any>();
  const [feedbacks, setFeedbacks] = useState<FeedbacksTypes[]>([]);
  const [users, setUsers] = useState<UserInfoTypes[]>([]);
  const [allUsersMessages, setAllUsersMessages] = useState<any>([]);

  const [isAuth, setIsAuth] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedFeedbacks, setLoadedFeedbacks] = useState(false);
  const [isBotVisible, setIsBotVisible] = useState(false);

  const [languageChanger, setLanguageChanger] = useState("ru");
  const [mainLanguage, setMainLanguage] = useState<any>(ru);

  // to get all registered users
  const getUsers = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUsers((prev: any) => [...prev, doc.data()]);
    });
  };

  // to get all-users feedbacks
  async function getFeedbacks() {
    setFeedbacks([]);
    setLoadedFeedbacks(false);

    const q = query(collection(db, "feedbacks"), orderBy("date", "asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFeedbacks((prev: any) => [{ ...doc.data(), id: doc.id }, ...prev]);
    });

    setLoadedFeedbacks(true);
  }

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
    !isAuth && checkIfUserLogged();
    !loadedFeedbacks && getFeedbacks();
    users.length === 0 && getUsers();
    allUsersMessages.length === 0 && getAllUserMessages();

    const localstorageMainLanguage = Cookies.get("lang");
    setLanguageChanger(localstorageMainLanguage || "ru");
  }, []);

  useEffect(() => {
    languageHelper.map((item) => {
      if (languageChanger === item.languageString) {
        setMainLanguage(item.languageMain);
      }
    });
  }, [languageChanger]);

  // get all user's messages
  const getAllUserMessages = async () => {
    onSnapshot(collection(db, "userMessages"), (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUsersMessages(messages); // Overwrite the full state with new data
    });
  };

  const checkIfUserLogged = async () => {
    const result = Cookies.get("userId");
    // const userId = result ? JSON.parse(result) : null;

    if (result !== undefined) {
      const docRef = doc(db, "users", result);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
        setIsAuth(true);
      }
    }
  };

  return (
    <contextData.Provider
      value={{
        isAuth,
        setIsAuth,
        burgerMenu,
        setBurgerMenu,
        checkIfUserLogged,
        userInfo,
        setLanguageChanger,
        mainLanguage,
        languageChanger,
        isVisible,
        setIsVisible,
        feedbacks,
        setFeedbacks,
        loadedFeedbacks,
        setUserInfo,
        users,
        getFeedbacks,
        setIsBotVisible,
        isBotVisible,
        allUsersMessages,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
