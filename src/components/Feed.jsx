import React from "react";
import BriefForm from "./BriefForm";
import SingleBrief from "./SingleBrief";

export default function Feed({ userData }) {
  return (
    <div className="flex flex-col border border-yellow-400 h-full overflow-y-auto">
      <BriefForm />
      {userData.feed.map((brief) => {
        const faved = userData.favorites.find(
          (favBrief) => favBrief.briefId === brief.briefId
        );

        return (
          <SingleBrief key={brief.briefId} briefData={brief} faved={faved} />
        );
      })}
    </div>
  );
}
