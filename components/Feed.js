import SmallBrief from "./SmallBrief";

export default function Feed({ briefsData }) {
  return (
    <div className="flex flex-col w-full h-full border border-white text-white overflow-y-auto">
      <form className="flex flex-col text-xl sticky top-0 bg-dark">
        <label>What are you thinking ?</label>
        <textarea
          className="text-black m-4 p-2 rounded-lg"
          placeholder="Tell us what is on  your mind!"
        ></textarea>
      </form>
      {briefsData.length === 0 ? (
        <p className="text-lg text-center">
          Not much to see here, go follow someone else
        </p>
      ) : null}
      {briefsData.feed.map((briefData) => {
        const favorite = briefsData.favorites.find(
          (item) => item.briefId === briefData.briefId
        );

        return (
          <SmallBrief
            key={briefData.briefId}
            briefData={briefData}
            faved={!!favorite}
          />
        );
      })}
    </div>
  );
}
