import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import MainLayout from "../components/MainLayout";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import Feed from "../components/Feed";
import { refetchUserFavoritesVar } from "../cache";

const GET_USER_FEED = gql`
  query getUserFeed {
    loggedInUser {
      userId
      feed {
        briefId
        text
        images
        childBriefs {
          briefId
        }
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

const GET_USER_FAVORITES = gql`
  query getUserFavorites($userId: ID!) {
    user(id: $userId) {
      favorites {
        briefId
      }
    }
  }
`;

export default function Home() {
  const [getUserFeed, { loading, data, error }] = useLazyQuery(GET_USER_FEED);
  const [getUserFavorites, { data: favoritesData, refetch }] =
    useLazyQuery(GET_USER_FAVORITES);

  refetchUserFavoritesVar(refetch);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserFeed();
    }
  }, [getUserFeed]);

  useEffect(() => {
    if (data) {
      getUserFavorites({ variables: { userId: data.loggedInUser.userId } });
    }
  }, [data, getUserFavorites]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <>
      <MainLayout>
        {loading ? <Loader /> : null}
        {error ? <p className="text-white">Something went wrong</p> : null}
        {data && favoritesData ? (
          <Feed
            userData={{
              ...data.loggedInUser,
              favorites: favoritesData.user.favorites,
            }}
          />
        ) : null}
      </MainLayout>
    </>
  );
}
