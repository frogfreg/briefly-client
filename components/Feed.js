import SmallBrief from "./SmallBrief";
import { loggedUserFavoritesVar } from "../cache";

export default function Feed({ briefs, favorites }) {
  loggedUserFavoritesVar(favorites);
  return (
    <div className="flex flex-col w-full h-full border border-white text-white overflow-y-auto">
      <form className="flex flex-col text-xl sticky top-0 bg-dark">
        <label>What are you thinking ?</label>
        <textarea
          className="text-black m-4 p-2 rounded-lg"
          placeholder="Tell us what is on  your mind!"
        ></textarea>
      </form>
      {briefs.length === 0 ? (
        <p className="text-lg text-center">
          Not much to see here, go follow someone else
        </p>
      ) : null}
      {briefs.map((briefData) => {
        return <SmallBrief key={briefData.briefId} briefData={briefData} />;
      })}
    </div>
  );
}
