import React from "react";

export default function BriefForm() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center text-white text-base bg-dark p-2 border-b-2 border-white "
    >
      <input
        className="w-full p-4 rounded-xl bg-dark"
        type="text"
        placeholder="What is on your mind?"
        maxLength="300"
        minLength="1"
        required
      />
      <div className="flex w-full my-2 justify-around">
        <button
          type="button"
          className="border-2 border-main-clear rounded p-2"
        >
          Add image
        </button>
        <button
          className="border-2 border-main-clear rounded p-2"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
