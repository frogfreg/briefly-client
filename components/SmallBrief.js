import { useEffect, useState } from "react";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($briefId: ID!) {
    toggleFavorite(id: $briefId)
  }
`;

export default function SmallBrief({ briefData, faved }) {
  const [toggleFavorite, { error }] = useMutation(TOGGLE_FAVORITE);
  const [isFaved, setIsFaved] = useState(faved);
  const [favoriteCount, setFavoriteCount] = useState(briefData.favoriteCount);

  useEffect(() => {
    if (error) {
      console.trace();
      console.log(error);
    }
  }, [error]);

  function handleFavClick(e) {
    toggleFavorite({ variables: { briefId: briefData.briefId } });
    const newCount = isFaved ? favoriteCount - 1 : favoriteCount + 1;
    setIsFaved(!isFaved);
    setFavoriteCount(newCount);
  }

  return (
    <article className="flex  border-t-2 border-main-clear py-2">
      <div className="w-1/5 flex flex-col items-center">
        <Link href={`/${briefData.author.username}`}>
          <a>
            {" "}
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
          </a>
        </Link>
      </div>
      <div className="text-lg px-2">
        <Link href={`/${briefData.author.username}`}>
          <a>
            <p>
              <b>@{briefData.author.username}</b>{" "}
            </p>
          </a>
        </Link>
        <Link href={`/${briefData.author.username}/${briefData.briefId}`}>
          <a>
            <p>{briefData.text}</p>
          </a>
        </Link>
        <div>
          <button onClick={handleFavClick} className="mr-4">
            <img
              className="w-6 inline"
              src={isFaved ? "/filled-heart.svg" : "/heart.svg"}
            />{" "}
            {favoriteCount}
          </button>{" "}
          <button disabled>
            <img className="w-6 inline" src="/comment-icon.svg" /> 0
          </button>
        </div>
      </div>
    </article>
  );
}
