import Link from "next/link";

function Landing() {
  return (
    <div className="max-w-screen-md h-screen mx-auto flex ">
      <main className="flex w-full text-center justify-center items-center">
        <div className="flex flex-col text-white w-full sm:w-auto mb-8">
          <p className="text-6xl m-4 ">Join Briefly</p>
          <Link href="/signup">
            <a className="m-4 border-2 border-main-clear rounded-lg p-2 text-xl">
              Sign up
            </a>
          </Link>
          <Link href="/login">
            <a className="m-4 border-2 border-main-clear rounded-lg p-2 text-xl">
              Log in
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Landing;
