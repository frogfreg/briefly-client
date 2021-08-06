import { useEffect } from "react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { isLoggedVar } from "../cache";

export default function Home() {
  const router = useRouter();
  const isLogged = useReactiveVar(isLoggedVar);

  useEffect(() => {
    if (!isLogged) {
      router.push("/");
    }
  }, [isLogged, router]);

  return (
    <div>
      <h1 className="text-6xl text-white">
        This will be the home page, at some point
      </h1>
    </div>
  );
}
