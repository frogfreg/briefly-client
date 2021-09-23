import React from "react";
import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="max-w-screen-xl grid grid-cols-4 mx-auto border-8 border-green-500 h-screen grid-rows-6 md:grid-rows-none">
      <div className="text-6xl text-white border-purple-800 border-8  row-start-6 md:row-start-1 md:col-span-1 col-span-4 bg-dark">
        <nav className="text-xl sm:text-3xl items-center md:items-stretch flex md:flex-col border-blue-400 border-4 justify-around h-full md:h-auto">
          <Link to="/home" className="my-4 hidden md:block">
            🦜Briefly
          </Link>
          <Link to="/home" className="rounded-full p-4 nav-element">
            Home
          </Link>
          <Link to="/search" className="rounded-full p-4 nav-element">
            Search
          </Link>
          <Link to="/#" className="rounded-full p-4 nav-element">
            Settings
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
