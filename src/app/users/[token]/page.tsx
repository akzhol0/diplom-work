import React from "react";
import UserPage from "@/components/users/UserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользователь",
};

type UserPageProps = {
  params: { token: string };
};

const Page = ({ params }: UserPageProps) => {
  const { token } = params;

  return <UserPage token={token} />;
};

export default Page;
