import React from "react";
import { useNavigate } from "react-router-dom";

const ResultScreen = () => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate("/"); // Go back to StartPage
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl text-center">
        <h1 className="text-3xl font-semibold text-[#453FE1] mb-4">
          Quiz Completed 🎉
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Thanks for participating in the Sentence Construction quiz!
        </p>

        {/* Example result summary (you can enhance this) */}
        <div className="text-left text-gray-700 mb-6">
          <p><strong>Total Questions:</strong> 10</p>
          <p><strong>Correct Answers:</strong> —</p>
          <p><strong>Your Score:</strong> —</p>
        </div>

        <button
          onClick={handlePlayAgain}
          className="mt-4 px-6 py-2 bg-[#453FE1] text-white font-medium rounded hover:bg-[#352fcf]"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
