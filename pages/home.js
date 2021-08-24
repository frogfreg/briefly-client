import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import MainLayout from "../components/MainLayout";
import Feed from "../components/Feed";
import Loader from "../components/Loader";

const GET_USER_FEED = gql`
  query getUserFeed {
    loggedInUser {
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
  const { loading, error, data, refetch } = useQuery(GET_USER_FEED);

  useEffect(() => {
    if (error) {
      console.error(error);
      refetch();
    }
  }, [data, error, refetch]);

  return (
    <>
      <MainLayout>
        {loading ? <Loader /> : null}
        {error ? <p className="text-white">Something went wrong</p> : null}
        {data ? <Feed briefs={data.loggedInUser.feed} /> : null}
      </MainLayout>
    </>
  );
}
