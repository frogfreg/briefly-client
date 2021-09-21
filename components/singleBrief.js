export default function SingleBrief({ briefData, faved }) {
  return (
    <article className="flex w-full border-b-2 border-white">
      <div className="w-1/5 flex-col items-center">
        <img
          className="m-auto rounded-full w-14 max-h-full text-white text-base"
          alt="user profile picture"
          src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      <div className="w-3/4 text-white text-base">
        <p>
          <b className="text-lg">@username</b>
          <span className="ml-2">00/00/00</span>
        </p>
        <p>
          Occaecat quis ut nostrud tempor sint ullamco ipsum sit elit quis
          proident Lorem. Occaecat quis ut nostrud tempor sint ullamco ipsum sit
          elit quis proident Lorem.
        </p>
        <div className="flex py-2">
          <button className="mx-2 flex">
            <img
              className="w-6 mx-2"
              src={faved ? "filled-heart.svg" : "heart.svg"}
              alt="like button"
            />
            <span>{briefData.favoriteCount}</span>
          </button>
          <div className="flex">
            <img
              className="w-6 mx-2"
              src="/comment-icon.svg"
              alt="like button"
            />
            <span>0</span>
          </div>
        </div>
      </div>
    </article>
  );
}
