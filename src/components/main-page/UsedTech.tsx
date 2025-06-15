import React, { useContext } from "react";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiReact,
  SiGit,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGithub,
  SiGraphql,
  SiVercel,
} from "react-icons/si";
import { contextData } from "@/components/context/context";

const UsedTech = () => {
  const tech = [
    { icon: <SiHtml5 size={40} className="text-white" />, name: "HTML5" },
    { icon: <SiCss3 size={40} className="text-white" />, name: "CSS3" },
    {
      icon: <SiTailwindcss size={40} className="text-white" />,
      name: "TailwindCSS",
    },
    {
      icon: <SiJavascript size={40} className="text-white" />,
      name: "JavaScript",
    },
    {
      icon: <SiTypescript size={40} className="text-white" />,
      name: "TypeScript",
    },
    { icon: <SiReact size={40} className="text-white" />, name: "ReactJS" },
    { icon: <SiNextdotjs size={40} className="text-white" />, name: "NextJS" },
    { icon: <SiGit size={40} className="text-white" />, name: "Git" },
    { icon: <SiGithub size={40} className="text-white" />, name: "GitHub" },
    { icon: <SiVercel size={40} className="text-white" />, name: "Vercel" },
    { icon: <SiGraphql size={40} className="text-white" />, name: "GraphQL" },
    { icon: <SiFirebase size={40} className="text-white" />, name: "Firebase" },
  ];
  const { mainLanguage } = useContext(contextData);

  return (
    <>
      <div className="w-full md:w-[80%] flex justify-start ps-2 text-2xl md:text-[40px] font-bold">
        {mainLanguage.leftOut.usedTech}
      </div>
      <div className="w-full overflow-x-auto flex justify-start lg:justify-center items-center gap-4 mt-2 md:mt-8 bg-[#131313]">
        {tech.map((t, i) => (
          <div key={i} className="min-w-[80px] flex flex-col items-center py-6">
            {t.icon}
            <span className="mt-2 text-sm text-white">{t.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsedTech;
