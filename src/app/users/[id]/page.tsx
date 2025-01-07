import React from "react";
import UserPage from "@/components/users/UserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользователь",
};

type UserPageProps = {
  params: { id: string };
};

const Page = ({ params }: UserPageProps) => {
  const { id } = params;

  return <UserPage id={id} />;
};

export default Page;
