import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "./MainLayout";

export default function Thread() {
  const { username, briefid } = useParams();

  return (
    <MainLayout>
      <p className="text-white">
        Thread for {briefid} from {username} user{" "}
      </p>
    </MainLayout>
  );
}
