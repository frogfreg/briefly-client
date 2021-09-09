import { useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../components/MainLayout";
import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import Loader from "../../components/Loader";
import { isLoggedVar } from "../../cache";
import SmallBrief from "../../components/SmallBrief";

const SINGLE_BRIEF_DATA = gql`
  query singleBriefData($briefId: ID!) {
    brief(id: $briefId) {
      briefId
      text
      images
      author {
        userId
        username
        picture
      }
      childBriefs {
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
      parentBrief {
        briefId
        author {
          userId
          username
        }
      }
      dateCreated
      favoriteCount
      deleted
    }
  }
`;

export default function BriefPage() {
  const router = useRouter();
  const isLogged = useReactiveVar(isLoggedVar);
  const { briefId, username } = router.query;
  const [getBriefData, { data, loading, error }] = useLazyQuery(
    SINGLE_BRIEF_DATA,
    {
      variables: { briefId: briefId },
    }
  );

  useEffect(() => {
    if (data) {
      console.dir(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isLogged) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
      }
    } else if (briefId && username) {
      getBriefData();
    }
  }, [briefId, username, getBriefData, isLogged, router]);

  return (
    <MainLayout check={false}>
      {loading ? <Loader /> : null}
      {error ? <p className="text-white">Something went wrong</p> : null}
      {data ? (
        <div className="text-white">
          <SmallBrief briefData={data.brief} />
        </div>
      ) : null}
    </MainLayout>
  );
}
