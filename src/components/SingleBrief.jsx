import React, { useEffect, useState } from "react";
import heartIcon from "../assets/heart.svg";
import filledHeartIcon from "../assets/filled-heart.svg";
import commentIcon from "../assets/comment-icon.svg";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { refetchFavoritesVar } from "../cache";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";

const FAV = gql`
  mutation toggleFavorite($briefId: ID!) {
    toggleFavorite(id: $briefId)
  }
`;

export default function SingleBrief({ briefData, faved }) {
  const [toggleFavorite, { data: response, error }] = useMutation(FAV, {
    errorPolicy: "all",
  });
  const [filledHeart, setFilledHeart] = useState(!!faved);
  const [toggle, setToggle] = useState(false);
  const refetchFavorites = useReactiveVar(refetchFavoritesVar);
  let favCount;
  const formattedDate = formatDate(briefData.dateCreated);

  if (toggle && !filledHeart) {
    favCount = briefData.favoriteCount - 1;
  } else if (toggle && filledHeart) {
    favCount = briefData.favoriteCount + 1;
  } else if (!toggle) {
    favCount = briefData.favoriteCount;
  }

  useEffect(() => {
    if (response) {
      setFilledHeart(response.toggleFavorite);
    }
    if (error) {
      console.error(error);
    }
  }, [response, error]);

  function handleHeartClick() {
    toggleFavorite({ variables: { briefId: briefData.briefId } });
    setToggle(!toggle);
    refetchFavorites();
  }

  return (
    <article className="flex w-full border-b-2 border-white py-2">
      <div className="w-1/5 flex-col items-center">
        <img
          className="m-auto rounded-full w-14 max-h-full text-white text-base"
          alt="user profile picture"
          src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      <div className="w-3/4 text-white text-base">
        <p>
          <Link to={`/${briefData.author.username}`}>
            <b className="text-xl hover:underline focus:underline active:underline">
              {briefData.author.username}
            </b>
          </Link>
          <span className="ml-2">{formattedDate}</span>
        </p>
        <p>
          Occaecat quis ut nostrud tempor sint ullamco ipsum sit elit quis
          proident Lorem. Occaecat quis ut nostrud tempor sint ullamco ipsum sit
          elit quis proident Lorem.
        </p>
        <div className="flex py-2">
          <button onClick={handleHeartClick} className="mx-2 flex">
            <img
              className="w-6 mx-2"
              src={filledHeart ? filledHeartIcon : heartIcon}
              alt="like button"
            />
            <span>{favCount}</span>
          </button>
          <Link
            to={`${briefData.author.username}/${briefData.briefId}`}
            className="flex"
          >
            <img className="w-6 mx-2" src={commentIcon} alt="like button" />
            <span>{briefData.childBriefs.length}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
