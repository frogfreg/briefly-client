import Landing from "../components/Landing";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { isLoggedVar } from "../cache";

export default function Home() {
  const router = useRouter();
  const isLogged = useReactiveVar(isLoggedVar);

  useEffect(() => {
    if (isLogged) {
      router.push("/home");
    }
  }, [isLogged, router]);

  return (
    <div>
      <Landing />
    </div>
  );
}
