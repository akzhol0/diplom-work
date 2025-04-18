import React from "react";
import Image from "next/image";

type ParallaxProps = {
  title: string;
  small: string;
};

function Parallax({ title, small }: ParallaxProps) {
  return (
    <div className="h-auto lg:h-[700px] flex flex-col gap-4 justify-center">
      <p className="max-w-[800px] text-[30px] sm:text-[40px] md:text-[60px] font-bold">
        {title}
      </p>
      <div className="max-w-[600px] text-[18px] md:text-[20px]">
        <p>{small}</p>
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
