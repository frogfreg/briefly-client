import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { useRef, useEffect } from "react";
import { isLoggedVar } from "../cache";
import { useRouter } from "next/router";

const LOG_IN = gql`
  mutation logIn($username: String, $email: String, $password: String!) {
    signIn(username: $username, email: $email, password: $password)
  }
`;

export default function Login() {
  const isLogged = useReactiveVar(isLoggedVar);
  const router = useRouter();
  const [logIn, { data, loading, error }] = useMutation(LOG_IN, {
    errorPolicy: "all",
  });
  const formRef = useRef(null);

  useEffect(() => {
    if (isLogged) {
      router.push("/home");
    }
  }, [isLogged, router]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.signIn);
      isLoggedVar(true);
    }
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();

    const {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    } = formRef.current.elements;

    logIn({
      variables: {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      },
    });
  }

  return (
    <div className="max-w-screen-md h-screen mx-auto text-white  flex flex-col justify-center items-center">
      <h1 className="text-4xl m-4">Log in</h1>
      <form
        onSubmit={handleSubmit}
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
        <button
          className="border-main-clear border-2 p-2 rounded my-4"
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? "Loading..." : "Log in"}
        </button>
        {error ? <p>{error.message}</p> : null}

        <a href="#" className="hover:underline">
          Sign up instead
        </a>
      </form>
    </div>
  );
}
