import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Landing() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/home");
    }
  }, []);

  return (
    <div className="max-w-screen-md h-screen mx-auto flex ">
      <main className="flex w-full text-center justify-center items-center">
        <div className="flex flex-col text-white w-full sm:w-auto mb-8">
          <p className="text-6xl m-4 ">Join Briefly</p>
          <Link
            className="m-4 border-2 border-main-clear rounded-lg p-2 text-xl"
            to="/signup"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="m-4 border-2 border-main-clear rounded-lg p-2 text-xl"
          >
            Log in
          </Link>
        </div>
      </main>
    </div>
  );
}
