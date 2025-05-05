import React from "react";
import UserPage from "@/components/users/UserPage";
import { Metadata } from "next";
import UsersListModal from "@/components/usersModal/UsersListModal";

export const metadata: Metadata = {
  title: "Пользователь",
};

type UserPageProps = {
  params: { token: string };
};

const Page = ({ params }: UserPageProps) => {
  const { token } = params;

  return (
    <>
      <UserPage token={token} />
      <UsersListModal />
    </>
  );
};

export default Page;
