import React from "react";
import MainLayout from "./MainLayout";

export default function Search() {
  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <div className="flex w-full text-white text-lg justify-center ">
          <input
            className="w-4/5 bg-dark p-4 border-2 border-main-clear rounded"
            type="search"
            placeholder="Search for a user"
          />
          <button className="border-2 border-main-clear rounded ml-2 p-2">
            search
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
