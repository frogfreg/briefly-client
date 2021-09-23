import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "./MainLayout";

export default function User() {
  const { username } = useParams();

  return (
    <MainLayout>
      <p className="text-white">This is the page for {username} user </p>
    </MainLayout>
  );
}
