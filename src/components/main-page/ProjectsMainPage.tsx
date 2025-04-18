"use client";

import React, { useContext } from "react";
import PortfolioContainer from "../portfolio/PortfolioContainer";
import Link from "next/link";
import { contextData } from "@/components/context/context";

function ProjectsMainPage() {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="flex flex-col gap-4 my-[50px]">
      <p className="text-[40px] lg:text-[50px] font-bold">
        {mainLanguage.mainPage.projects.title}
      </p>
      <p className="max-w-[500px]  lg:text-lg">
        {mainLanguage.mainPage.projects.small}
      </p>
      <PortfolioContainer filter="Automated Systems" />
      <div className="flex justify-end">
        <Link href="/projects">
          <p className="text-lg text-red-600 cursor-pointer">
            {mainLanguage.mainPage.projects.linkTitle}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ProjectsMainPage;
