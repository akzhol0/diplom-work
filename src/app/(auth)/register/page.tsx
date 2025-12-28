import RegisterComponent from "@/components/auth/RegisterComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Регистрация",
};
// ;LSKENrfae
function Register() {
  return <RegisterComponent />;
}

export default Register;
