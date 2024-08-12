import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Add() {
  const [flashcards, setFlashcards] = useState({
    title: "",
    question: "",
    answer: "",
    picture: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFlashcards((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    

    if (
      flashcards.title === "" ||
      flashcards.question === "" ||
      flashcards.answer === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/flashcards", flashcards);
      toast.success("Flashcard added successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-[500px] border-1 mx-auto">
      <form className="max-w-sm mx-auto mt-[100px]">
        <h1 className="ml-[90px] mb-5 text-3xl tracking-tight">
          Add Flashcard
        </h1>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Tags
          </label>
          <input
            type="text"
            name="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray">
            Question
          </label>
          <input
            type="text"
            name="question"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray">
            Answer
          </label>
          <input
            type="text"
            name="answer"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleClick}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Add;
