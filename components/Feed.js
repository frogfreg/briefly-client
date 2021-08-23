import SmallBrief from "./SmallBrief";

export default function Feed(props) {
  return (
    <div className="flex flex-col w-full h-full border border-white text-white overflow-y-auto">
      <form className="flex flex-col text-xl sticky top-0 bg-dark">
        <label>What are you thinking ?</label>
        <textarea
          className="text-black m-4 p-2 rounded-lg"
          placeholder="Tell us what is on  your mind!"
        ></textarea>
      </form>
      <SmallBrief />
      <SmallBrief />
      <SmallBrief />
      <SmallBrief />
      <SmallBrief />
      <SmallBrief />
      <SmallBrief />
      <SmallBrief />
    </div>
  );
}
