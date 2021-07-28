import { useRef } from "react";
import { getCurrentDate } from "../utils";

function Signup() {
  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="max-w-screen-md h-screen mx-auto text-white  flex flex-col justify-center items-center">
      <h1 className="text-4xl m-4">Sign up</h1>
      <form
        onClick={handleSubmit}
        className="flex flex-col justify-around items-center text-center text-xl"
        ref={formRef}
      >
        <label>Username</label>
        <input
          name="username"
          className="text-black rounded p-2 mt-2"
          type="text"
          placeholder="Username"
        />
        <label>Email</label>
        <input
          name="email"
          className="text-black rounded p-2 mt-2"
          type="email"
          placeholder="Email"
        />
        <label>Password</label>
        <input
          name="password"
          className="text-black rounded p-2 mt-2"
          type="password"
          placeholder="Password"
          required
        />
        <label>Confirm Password</label>
        <input
          name="confirm"
          className="text-black rounded p-2 mt-2"
          type="password"
          placeholder="Password"
          required
        />
        <label>Date of birth</label>
        <p className="text-base py-2">
          This date will not be public unless you specify so
        </p>
        <input
          name="birthdate"
          className="text-black px-2"
          type="date"
          max={getCurrentDate()}
        />

        <button
          className="border-main-clear border-2 p-2 rounded my-4"
          type="submit"
        >
          Sign up
        </button>

        <a href="#" className="hover:underline">
          If you have an account, log in instead
        </a>
      </form>
    </div>
  );
}

export default Signup;
