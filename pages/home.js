import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.dir(localStorage.getItem("token"));

    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-6xl text-white">
        This will be the home page, at some point
      </h1>
    </div>
  );
}
