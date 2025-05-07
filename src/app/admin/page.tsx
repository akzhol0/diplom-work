import { Metadata } from "next";
import React from "react";
import AdminPage from "@/components/admin/AdminPage";

export const metadata: Metadata = {
  title: "Страницы админа",
};

function Profile() {
  return (
    <div className="w-full min-h-[700px] flex justify-center">
      <div className="w-[95%] md:w-[80%] min-h-[600px]">
        <div>Страница Админа</div>
        <AdminPage />
      </div>
    </div>
  );
}

export default Profile;
