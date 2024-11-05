import React from 'react';

type ParallaxProps = {
  title: string;
  small: string;
}

function Parallax({title, small}: ParallaxProps) {
  return (
    <div className="h-auto lg:h-[700px] flex flex-col gap-4 justify-center">
      <p className="max-w-[800px] text-[30px] sm:text-[40px] md:text-[60px] font-bold">
        {title}
      </p>
      <p className="max-w-[600px] text-[18px] md:text-[20px]">
        {small}
      </p>
    </div>
  );
}

export default Parallax;
