import React, { useRef, useState, useEffect } from "react";
import { getCurrentDate } from "../utils";
import { gql, useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";

const SIGN_UP = gql`
  mutation signUp(
    $username: String!
    $email: String!
    $picture: String
    $birthdate: String
    $password: String!
  ) {
    signUp(
      username: $username
      email: $email
      picture: $picture
      birthdate: $birthdate
      password: $password
    )
  }
`;

function Signup() {
  const formRef = useRef(null);
  const [confirmIsEqual, setConfirmIsEqual] = useState(true);
  const [createNewUser, { data, loading, error }] = useMutation(SIGN_UP, {
    errorPolicy: "all",
  });
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/home");
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.signUp);
      history.push("/home");
    }
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    const {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
      picture: pictureInput,
      confirm: confirmInput,
      birthdate: birthdateInput,
    } = formRef.current.elements;

    if (confirmInput.value === passwordInput.value) {
      setConfirmIsEqual(true);
      const pictureValue = /^\s*$/g.test(pictureInput.value)
        ? null
        : pictureInput.value;

      createNewUser({
        variables: {
          username: usernameInput.value,
          email: emailInput.value,
          picture: pictureValue,
          birthdate: birthdateInput.value,
          password: passwordInput.value,
        },
      });
    } else {
      setConfirmIsEqual(false);
    }
  }

  return (
    <div className="max-w-screen-md h-screen mx-auto text-white  flex flex-col justify-center items-center">
      <h1 className="text-4xl m-4">Sign up</h1>
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
          maxLength="30"
          minLength="2"
          placeholder="Username"
          required
        />
        <label>Email</label>
        <input
          name="email"
          className="text-black rounded p-2 mt-2"
          type="email"
          placeholder="Email"
          required
        />
        <label>Profile picture link (optional)</label>
        <input
          name="picture"
          className="text-black rounded p-2 mt-2"
          type="url"
          placeholder="https://myimagelink.example"
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
        <p className="text-base py-2">
          {confirmIsEqual ? null : "Password does not match with confirmation"}
        </p>
        <label>Date of birth</label>
        <p className="text-base py-2">
          This date will not be public unless you specify so
        </p>
        <input
          name="birthdate"
          className="text-black px-2"
          type="date"
          required
          max={getCurrentDate()}
        />

        <button
          className="border-main-clear border-2 p-2 rounded my-4"
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        {error ? <p>{error.message}</p> : null}

        <Link to="/login" className="hover:underline">
          If you have an account, log in instead
        </Link>
      </form>
    </div>
  );
}

export default Signup;
