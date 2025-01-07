import React from "react";

type IframeProps = {
  ytid: string;
};

function Iframe({ ytid }: IframeProps) {
  return (
    <div className="w-full flex justify-center bg-[#f8f8f8]">
      <div className="w-[95%] md:w-[80%] flex justify-center py-[40px]">
        <iframe
          width="900"
          height="506"
          src={`https://www.youtube.com/embed/${ytid}?autoplay=1&loop=1&playlist=${ytid}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Iframe;
