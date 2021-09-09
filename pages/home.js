import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import MainLayout from "../components/MainLayout";
import Feed from "../components/Feed";
import Loader from "../components/Loader";

const GET_USER_FEED = gql`
  query getUserFeed {
    loggedInUser {
      favorites {
        briefId
      }
      feed {
        briefId
        text
        images
        author {
          username
          userId
          picture
        }
        dateCreated
        favoriteCount
        deleted
      }
    }
  }
`;

export default function Home() {
  const [getUserFeed, { loading, data, error }] = useLazyQuery(GET_USER_FEED);

  useEffect(() => {
    if (!data) {
      getUserFeed();
    }
  }, [data, getUserFeed]);

  return (
    <>
      <MainLayout>
        {loading ? <Loader /> : null}
        {error ? <p className="text-white">Something went wrong</p> : null}
        {data ? (
          <Feed
            briefs={data.loggedInUser.feed}
            favorites={data.loggedInUser.favorites}
          />
        ) : null}
      </MainLayout>
    </>
  );
}
