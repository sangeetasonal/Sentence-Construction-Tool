import React, { useEffect, useState } from "react";
import axios from "axios";
import next from "../assets/next.png";
import { useNavigate } from "react-router-dom";

const QuestionCard = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();
  const [score, setScore] = useState(0);


  // Fetch questions from the API
  useEffect(() => {
    // Clear previous data
    localStorage.removeItem("score");
    localStorage.removeItem("questionResults");
  
    axios
      .get("https://sentence-construction-tool-3l4k.onrender.com/data")
      .then((res) => setQuestions(res.data.questions))
      .catch((err) => console.error("Failed to load questions:", err));
  }, []);
  // Timer functionality and navigation logic
  useEffect(() => {
    if (questions.length === 0) return;

    if (timer === 0) {
      if (currentIndex < questions.length - 1) {
        handleNext();
      } else {
        navigate("/result");
      }
      return;
    }

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, questions, currentIndex, navigate]);

  // Handle moving to the next question

 const handleNext = () => {
  const current = questions[currentIndex];
  const isCorrect = JSON.stringify(userAnswers) === JSON.stringify(current.correctAnswer);

  const questionResult = {
    prompt: current.question,
    correctAnswer: current.correctAnswer.join(" "),
    userAnswer: userAnswers.join(" "),
    isCorrect: isCorrect,
  };

  const prevResults = JSON.parse(localStorage.getItem("questionResults")) || [];
  localStorage.setItem("questionResults", JSON.stringify([...prevResults, questionResult]));

  const updatedScore = isCorrect ? score + 10 : score;
  setScore(updatedScore); // Update React state
  localStorage.setItem("score", updatedScore); // Save each time
  localStorage.setItem("total", questions.length);

  if (currentIndex < questions.length - 1) {
    setCurrentIndex(currentIndex + 1);
    setTimer(30);
    setUserAnswers([]);
  } else {
    navigate("/result");
  }
};

  

  const current = questions[currentIndex];
  if (!current) return <p className="text-center mt-10">Loading questions...</p>;

  const totalBlanks = current.correctAnswer.length;
  const parts = current.question.split("_____________");

  // Handle user selecting a word
  const handleSelect = (word) => {
    if (userAnswers.length < totalBlanks) {
      setUserAnswers([...userAnswers, word]);
    }
  };

  // Handle removing a selected word
  const handleRemove = (index) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers.splice(index, 1);
    setUserAnswers(updatedAnswers);
  };

  // Filter available options
  const availableOptions = current.options.filter(
    (opt) => !userAnswers.includes(opt)
  );

  // Handle quitting the quiz
  const handleQuit = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-[70%] bg-white p-8 rounded-2xl shadow-lg">
        {/* Header Row */}
        <div className="flex justify-between items-center mb-7">
          <div className="text-gray-600 text-[19px] font-medium">
            {timer < 10 ? `0:0${timer}` : `0:${timer}`}
          </div>
          <button
            onClick={handleQuit}
            className="text-[15px] font-medium text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
          >
            Quit
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center gap-2 mb-6">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-[4px] w-[89px] rounded-[10.63px] ${
                i <= currentIndex ? "bg-orange-400" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Instructions */}
        <h3 className="text-center text-[#616464] font-semibold mb-6">
          Select the missing words in the correct order
        </h3>

        {/* Sentence Display */}
        <p className="font-medium text-[24px] leading-[40px] text-[#2A2D2D] mx-[8px] mb-6 text-center">
          {parts.map((part, i) => (
            <span key={i} className="relative inline-block mx-2 align-middle">
              {part}
              {i < totalBlanks && (
                <span
                  onClick={() => handleRemove(i)}
                  className="inline-flex relative px-2 py-1 min-w-[80px] border-b-2 border-gray-400 align-middle"
                >
                  {userAnswers[i] && (
                    <span className="px-3 py-1 border border-gray-400 rounded-md bg-white text-sm cursor-pointer shadow whitespace-nowrap">
                      {userAnswers[i]}
                    </span>
                  )}
                </span>
              )}
            </span>
          ))}
        </p>

        {/* Option buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {current.options.map((word, i) => {
            const isSelected = userAnswers.includes(word);
            return (
              <button
                key={i}
                onClick={() => handleSelect(word)}
                className={`border border-gray-300 rounded-[8px] px-4 py-2 min-w-[100px] text-sm font-medium text-[#2A2D2D] bg-white hover:bg-gray-100 transition ${
                  isSelected ? "invisible" : ""
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={userAnswers.length !== totalBlanks}
            className={`flex items-center gap-2 px-4 py-4 text-white font-medium transition rounded-[8px] border border-[#DFE3E3] ${
              userAnswers.length === totalBlanks
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed"
            }`}
          >
            <img src={next} alt="Next" className="w-5 h-5 inline-block" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
