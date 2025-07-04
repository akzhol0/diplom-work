import React from "react";

type InformationProps = {
  title: string;
  small: string;
};

function Information({ title, small }: InformationProps) {
  return (
    <div className="w-[95%] md:w-[80%]">
      <div className="flex flex-col items-center justify-center my-[40px] gap-3">
        <p className="w-full flex items-start text-[30px] lg:text-[40px] font-semibold">
          {title}
        </p>
        <p className="text-[16px] md:text-[18px]">{small}</p>
      </div>
    </div>
  );
}

export default Information;
