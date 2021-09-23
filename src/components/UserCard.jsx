import React from "react";
import stockProfile from "../assets/stock-profile.jpeg";
import { Link } from "react-router-dom";

export default function UserCard({ username, picture = null }) {
  return (
    <Link to={`/${username}`}>
      <div className="flex text-white text-xl items-center border-b-2 border-white">
        <div className="flex w-1/3 justify-center p-2">
          <img
            className="rounded-full h-24"
            src={picture ? picture : stockProfile}
            alt="profile picture"
          />
        </div>
        <b className="w-2/3">{username}</b>
      </div>
    </Link>
  );
}
