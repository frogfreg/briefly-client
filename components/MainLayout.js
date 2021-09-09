import { useEffect } from "react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { isLoggedVar } from "../cache";
import Link from "next/link";

export default function MainLayout({ children, check = true }) {
  const router = useRouter();
  const isLogged = useReactiveVar(isLoggedVar);

  useEffect(() => {
    if (check) {
      if (!isLogged) {
        console.log(
          "Inside main layout checking if user is Logged: " + isLogged
        );
        console.dir(router.query);
        router.push("/");
      }
    }
  }, [isLogged, router, check]);

  return (
    <div className="max-w-screen-xl grid grid-cols-4 mx-auto border-8 border-green-500 h-screen grid-rows-6 md:grid-rows-none">
      <div className="text-6xl text-white border-purple-800 border-8  row-start-6 md:row-start-1 md:col-span-1 col-span-4 bg-dark">
        <nav className="text-xl sm:text-3xl items-center md:items-stretch flex md:flex-col border-blue-400 border-4 justify-around h-full md:h-auto">
          <Link href="/home">
            <a className="my-4 hidden md:block">🦜Briefly</a>
          </Link>
          <Link href="/home">
            <a className="rounded-full p-4 nav-element">Home</a>
          </Link>
          <Link href="/#">
            <a className="rounded-full p-4 nav-element">Explore</a>
          </Link>
          <Link href="/#">
            <a className="rounded-full p-4 nav-element">Settings</a>
          </Link>
        </nav>
      </div>
      <div className="text-6xl col-span-4 md:col-span-3 lg:col-span-2 row-span-5 md:row-auto border-4 border-red-500 overflow-hidden">
        {children}
      </div>
      <div className="text-6xl text-white border-white border hidden lg:block">
        Ad space maybe or dunno
      </div>
    </div>
  );
}
