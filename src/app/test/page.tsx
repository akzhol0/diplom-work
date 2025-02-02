import React from "react";

const Page = () => {
  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-8 justify-center items-center my-8">
        <iframe
          src="https://widgets.sofascore.com/ru/embed/unique-tournament/329/season/66885/cuptree/10569713?widgetTitle=Copa del Rey 24/25 &showCompetitionLogo=true&widgetTheme=light"
          className="h-[872px] max-w-[700px] w-full"
        ></iframe>
        <iframe
          src="https://widgets.sofascore.com/ru/embed/unique-tournament/7/season/61644/cuptree/10569966?widgetTitle=UEFA Champions League 24/25, Knockout Phase&showCompetitionLogo=true&widgetTheme=light"
          className="h-[900px] max-w-[800px] w-full"
        ></iframe>
      </div>
    </div>
  );
};

export default Page;
