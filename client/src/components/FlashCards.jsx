import axios from "axios";
import React, { useEffect, useState } from "react";
import "../flashcard.css";
import { FaTag } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
function FlashCards() {
  const [flashCards, setFlashCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    const fetchAllFlashCards = async () => {
      try {
        const res = await axios.get("http://localhost:8800/flashcards");
        setFlashCards(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllFlashCards();
  }, [flashCards]);

  const handleNext = (e) => {
    e.stopPropagation(); // Prevents the click event from triggering the card flip
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashCards.length);
  };

  const handlePrevious = (e) => {
    e.stopPropagation(); // Prevents the click event from triggering the card flip
    setIsFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashCards.length - 1 : prevIndex - 1
    );
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8800/flashcards/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (flashCards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl mr-3">No flashcards found</h1>
        <Link to={"/add"}>
          <div className="flex justify-center items-center mt-2 border-soild border-[2px] p-3 cursor-pointer">
            {" "}
            <p>Add new</p>
            <IoAdd />{" "}
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center justify-center">
        <FaTag onClick={() => setShowTags(!showTags)} className="cursor-pointer"/>

        {showTags && <h1> Tags: {flashCards[currentIndex]?.title}</h1>}
      </div>
      <div className="flex items-center ">
        <Link to={`/update/${flashCards[currentIndex]?.id}`}>
          <FaRegEdit size={30} className="mr-2 cursor-pointer" />
        </Link>
        <h1 className="mb-1 border-solid p-3 border-[2px] rounded-md">
          Click on the box below to see the answer
        </h1>
        <MdOutlineDelete
          className="cursor-pointer ml-1"
          size={30}
          onClick={() => handleDelete(flashCards[currentIndex]?.id)}
        />
      </div>

      <div
        className="card-wrapper w-[500px] h-[480px] cursor-pointer relative"
        onClick={handleCardClick}
      >
        <div className={`card-body ${isFlipped ? "flipped" : ""}`}>
          <div className="card-front">
            <p>{flashCards[currentIndex]?.question}</p>
          </div>
          <div className="card-back">
            <p>{flashCards[currentIndex]?.answer}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-center mt-5">
        {flashCards.length > 0 && currentIndex > 0 && (
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}

        {flashCards.length > 0 && currentIndex < flashCards.length - 1 && (
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
      <Link to={"/add"}>
        <div className="flex justify-center items-center mt-2 border-soild border-[2px] p-3 cursor-pointer">
          {" "}
          <p>Add new</p>
          <IoAdd />{" "}
        </div>
      </Link>
    </div>
  );
}

export default FlashCards;
