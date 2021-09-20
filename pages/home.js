import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import MainLayout from "../components/MainLayout";
import { useRouter } from "next/router";
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
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  });

  return (
    <>
      <MainLayout>
        {loading ? <Loader /> : null}
        {error ? <p className="text-white">Something went wrong</p> : null}
      </MainLayout>
    </>
  );
}
