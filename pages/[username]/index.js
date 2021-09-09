import { useRouter } from "next/router";
import MainLayout from "../../components/MainLayout";

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <MainLayout>
      <div className="text-white">
        <h2>Hello there</h2>
        <p>this is the page for user {username}</p>
      </div>
    </MainLayout>
  );
}
