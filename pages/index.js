import Landing from "../components/Landing";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/home");
    }
  }, [router]);

  return (
    <div>
      <Landing />
    </div>
  );
}
