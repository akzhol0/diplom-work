import React from "react";
import Image from "next/image";
import Link from "next/link";
import MyDangerButton from "@/components/UI/my-buttons/MyDangerButton";
import MyPrimaryButton from "@/components/UI/my-buttons/MyPrimaryButton";

type ParallaxProps = {
  title: string;
  small: string;
  tryNow: string;
};

function Parallax({ title, small, tryNow }: ParallaxProps) {
  return (
    <div className="h-auto lg:h-[700px] flex flex-col gap-4 justify-center">
      <p className="max-w-[800px] text-[30px] sm:text-[40px] md:text-[60px] font-bold">
        {title}
      </p>
      <div className="max-w-[600px] text-[18px] md:text-[20px]">
        <p className="mb-2">{small}</p>
        <Link href="/services">
          <MyPrimaryButton className="text-[16px] px-4 py-2">
            {tryNow}
          </MyPrimaryButton>
        </Link>
        <div className="my-4">
          <Image
            src="https://cloud.githubusercontent.com/assets/835857/14581711/ba623018-0436-11e6-8fce-d2ccd4d379c9.gif"
            alt="logo"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

export default Parallax;
