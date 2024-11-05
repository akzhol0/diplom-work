import React from 'react';

type IframeProps = {
  ytid: string;
}

function Iframe({ytid}: IframeProps) {
  return (
    <div className="w-[95%] md:w-[80%] flex justify-center">
      <iframe
        width="900"
        height="506"
        src={`https://www.youtube.com/embed/${ytid}?autoplay=1&mute=1&loop=1&playlist=${ytid}`}></iframe>
    </div>
  );
}

export default Iframe;
