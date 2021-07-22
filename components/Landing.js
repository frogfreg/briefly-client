function Landing() {
  return (
    <div className="max-w-screen-md h-screen mx-auto flex ">
      <main className="flex w-full text-center justify-center items-center">
        <div className="flex flex-col  text-main-clear w-full sm:w-auto mb-8">
          <p className="text-6xl m-4 ">Join Briefly</p>
          <button className="m-4 border-2 border-main-clear rounded-lg p-2 text-xl">
            Sign up
          </button>
          <button className="m-4 border-2 border-main-clear rounded-lg p-2 text-xl">
            Log in
          </button>
        </div>
      </main>
    </div>
  );
}

export default Landing;
