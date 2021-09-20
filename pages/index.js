import { useEffect } from "react";
import Landing from "../components/Landing";
import router, { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/home");
    }
  });

  return (
    <div>
      <Landing />
    </div>
  );
}
