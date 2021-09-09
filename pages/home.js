import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import MainLayout from "../components/MainLayout";
import Feed from "../components/Feed";
import Loader from "../components/Loader";
import { refetchUserFeedVar } from "../cache";

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
  const [getUserFeed, { loading, data, error, refetch: refetchUserFeed }] =
    useLazyQuery(GET_USER_FEED);

  refetchUserFeedVar(refetchUserFeed);

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
        {data ? <Feed briefsData={data.loggedInUser} /> : null}
      </MainLayout>
    </>
  );
}
