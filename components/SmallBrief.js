import { useEffect } from "react";
import Image from "next/image";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { loggedUserFavoritesVar } from "../cache.js";
//THIS COMPONENT NEEDS TO RERENDER WHEN TOGGLEFAVORITE IS UPDATED

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($briefId: ID!) {
    toggleFavorite(id: $briefId)
  }
`;

export default function SmallBrief({ briefData }) {
  const [toggleFavorite, { error }] = useMutation(TOGGLE_FAVORITE);

  const loggedUserFavorites = useReactiveVar(loggedUserFavoritesVar);

  useEffect(() => {
    if (error) {
      console.trace();
      console.log(error);
    }
  }, [error]);
  useEffect(() => {
    console.dir(loggedUserFavorites);
  }, [loggedUserFavorites]);

  function handleFavClick() {
    console.log("Updating favorites");
    toggleFavorite({ variables: { briefId: briefData.briefId } });
    console.log("Emptying favs");
  }

  return (
    <article className="flex  border-t-2 border-main-clear py-2">
      <div className="w-1/5 flex flex-col items-center">
        {briefData.author.picture ? (
          <img
            className="w-20 min-48 rounded-full"
            src={briefData.author.picture}
            width="80px"
          />
        ) : (
          <Image
            src="/stock-profile.jpeg"
            alt="profile picture"
            width="80"
            height="80"
          />
        )}
      </div>
      <div className="text-lg px-2">
        <p>
          <b>@{briefData.author.username}</b>{" "}
        </p>
        <p>{briefData.text}</p>
        <div>
          <button onClick={handleFavClick} className="mr-4">
            <img
              className="w-6 inline"
              src={
                loggedUserFavorites.find(
                  (element) => element.briefId === briefData.briefId
                )
                  ? "/filled-heart.svg"
                  : "/heart.svg"
              }
            />{" "}
            {briefData.favoriteCount}
          </button>{" "}
          <button>
            <img className="w-6 inline" src="/comment-icon.svg" /> 0
          </button>
        </div>
      </div>
    </article>
  );
}
