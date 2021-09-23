import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { loggedUserDataVar } from "../cache";
import MainLayout from "./MainLayout";
import Feed from "./Feed";

export default function Home({ getUserFeed }) {
  const history = useHistory();
  const loggedUserData = useReactiveVar(loggedUserDataVar);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
    if (loggedUserData) {
      setLoading(false);
    } else {
      getUserFeed();
    }
  }, [loggedUserData]);

  return (
    <MainLayout>
      {loading ? <p className="text-white">Loading...</p> : <Feed userData={loggedUserData} />}
    </MainLayout>
  );
}
