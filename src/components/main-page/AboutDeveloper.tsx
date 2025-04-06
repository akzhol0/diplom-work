import Image from "next/image";
import React, { useContext } from "react";
import { contextData } from "@/components/context/context";

const AboutDeveloper = () => {
  const { mainLanguage } = useContext(contextData);

  return (
    <div className="w-[95%] md:w-[80%] py-5 flex flex-col items-center text-black ">
      <p className="text-center">{mainLanguage.mainPage.codeDevText}</p>
      <div className="flex items-center gap-4">
        <p>{mainLanguage.mainPage.source}</p>
        <a
          className="hover:scale-110 duration-200"
          href="https://github.com/akzhol0/diplom-work"
          target="_blank"
        >
          <Image
            src="/images/github-logo.png"
            width={40}
            height={40}
            alt="gh"
          />
        </a>
      </div>
    </div>
  );
};

export default AboutDeveloper;
