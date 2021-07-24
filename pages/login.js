export default function Login() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="max-w-screen-md h-screen mx-auto text-white  flex flex-col justify-center items-center">
      <h1 className="text-4xl m-4">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-around align-center text-center text-xl"
      >
        <label>Username</label>
        <input
          className="text-black rounded p-2 mt-2"
          type="text"
          placeholder="Username"
          required
        />
        <label>Email</label>
        <input
          className="text-black rounded p-2 mt-2"
          type="email"
          placeholder="Email"
          required
        />
        <label>Password</label>
        <input
          className="text-black rounded p-2 mt-2"
          type="password"
          placeholder="Password"
          required
        />
        <button className="border-main-clear border-2 p-2 rounded my-4" type="submit">
          Login
        </button>
        <a href="#" className="hover:underline">Sign up instead</a>
      </form>
    </div>
  );
}
