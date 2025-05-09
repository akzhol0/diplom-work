import LoginComponent from "@/components/auth/LoginComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Войти в аккаунт",
};

function Login() {
  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <LoginComponent />
    </div>
  );
}

export default Login;
