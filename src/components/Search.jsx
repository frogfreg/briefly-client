import React, { useRef } from "react";
import MainLayout from "./MainLayout";
import { gql, useLazyQuery } from "@apollo/client";
import UserCard from "./UserCard";

const SEARCH_USER = gql`
  query searchUser($pattern: String!) {
    userSearch(username: $pattern) {
      userId
      username
      picture
    }
  }
`;

export default function Search() {
  const [searchUser, { loading, data, error }] = useLazyQuery(SEARCH_USER, {
    errorPolicy: "all",
  });
  const searchInput = useRef(null);

  function handleSearch() {
    console.log("Search started!");
    searchUser({ variables: { pattern: searchInput.current.value } });
  }

  let results = null;

  if (error) {
    console.error(error);
  }

  if (loading) {
    results = <p>Loading...</p>;
  }

  if (data && data.userSearch.length !== 0) {
    results = data.userSearch.map((user) => (
      <UserCard
        key={user.userId}
        username={user.username}
        picture={user.picture}
      />
    ));
  } else if (data && data.userSearch.length === 0) {
    results = <p>No user was found</p>;
  }

  return (
    <MainLayout>
      <div className="flex flex-col w-full h-full text-white overflow-y-auto ">
        <div className="flex w-full text-lg justify-center sticky top-2 pb-2">
          <input
            className="w-4/5 bg-dark p-4 border-2 border-main-clear rounded"
            type="search"
            placeholder="Search for a user"
            minLength="1"
            maxLength="30"
            ref={searchInput}
          />
          <button
            onClick={handleSearch}
            className="border-2 border-main-clear rounded ml-2 px-4"
          >
            search
          </button>
        </div>
        <div className="">{results}</div>
        {/* {results} */}
      </div>
    </MainLayout>
  );
}
