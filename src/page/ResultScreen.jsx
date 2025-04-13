import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../assets/ArrowLeft.png";
import dotsIcon from "../assets/dots.png";
import scrollIcon from "../assets/scroll-down.png";
import ScoreCircle from "../component/ScoreCircle";

//  Helper function to fill the sentence with words
const fillSentence = (prompt, words, className = "") => {
  const parts = prompt.split("_____________");
  let sentence = [];

  parts.forEach((part, index) => {
    sentence.push(<span key={`part-${index}`}>{part}</span>);
    if (index < words.length) {
      sentence.push(
        <span key={`word-${index}`} className={`font-semibold ${className}`}>
          {" " + words[index] + " "}
        </span>
      );
    }
  });

  return sentence;
};

const ResultScreen = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [questionResults, setQuestionResults] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    const storedScore = localStorage.getItem("score");
    const storedResults = localStorage.getItem("questionResults");

    if (storedScore) setScore(parseInt(storedScore));
    if (storedResults) setQuestionResults(JSON.parse(storedResults));
  }, []);

  return (
    <div className="bg-[#F8F8F8]">
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Navbar */}
      <div className="w-full relative flex items-center justify-center px-4 py-4 bg-[#F8F8F8BF] backdrop-blur-[50px] shadow-[0px_2px_36px_0px_#00000014]">
        <button className="absolute left-4" onClick={() => navigate(-2)}>
          <img src={ArrowLeft} alt="Back" className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-medium text-[#414343]">Sentence Construction</h1>
        <img src={dotsIcon} alt="Menu" className="w-5 h-5 absolute right-[4.625rem]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center mb-4 mt-24">
            <ScoreCircle score={score} />
          </div>

          <p className="w-[80%] mx-auto text-[#2A2D2D] font-inter font-normal text-[18px] leading-[28px] tracking-[-0.01em] text-center">
            While you correctly formed several sentences, there are a couple of areas where
            improvement is needed. Pay close attention to sentence structure and word
            placement to ensure clarity and correctness. Review your responses below 
            for more details.
          </p>

          <div className="flex flex-col items-center mt-6">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-2 border text-[#453FE1] border-[#453FE1] rounded-[8px] hover:bg-[#F5F5FF]"
            >
              Go to Dashboard
            </button>
            <img
              src={scrollIcon}
              alt="Scroll Icon"
              className="mt-2 cursor-pointer"
              onClick={() => setShowQuestions(!showQuestions)} 
            />
          </div>
        </div>

        {/* Questions List */}
        {showQuestions && (
          <div className=" mx-auto mb-16 space-y-20">
            {questionResults && questionResults.length > 0 ? (
              questionResults.map((q, idx) => {
                const correctWords = Array.isArray(q.correctAnswer)
                  ? q.correctAnswer
                  : typeof q.correctAnswer === "string"
                  ? q.correctAnswer.split(" ")
                  : [];

                const userWords = Array.isArray(q.userAnswer)
                  ? q.userAnswer
                  : typeof q.userAnswer === "string"
                  ? q.userAnswer.split(" ")
                  : [];

                return (
                  <div
                    key={idx}
                    className="relative bg-white rounded-xl shadow-sm p-6 border border-[#E5E7EB]"
                  >
                    {/* Top-right number */}
                    <div className="absolute top-3 right-4 text-sm text-gray-400">
                      {idx + 1}/{questionResults.length}
                    </div>

                    {/* Prompt */}
                    <div className="text-xs text-gray-500 font-medium mb-2">Prompt</div>
                    <p className="text-gray-800 text-base mb-4">{q.prompt}</p>

                    {/* Response block */}
                    <div className={`rounded-lg p-4 ${q.isCorrect ? "bg-green-50" : "bg-red-50"}`}>
                      <div className="text-sm text-gray-500 font-medium mb-1 flex items-center">
                        Your response
                        <span className={`ml-2 font-semibold ${q.isCorrect ? "text-green-600" : "text-red-500"}`}>
                          {q.isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </div>
                      <p className="text-gray-800 text-base">
                        {fillSentence(q.prompt, userWords, q.isCorrect ? "text-green-600" : "text-red-500")}
                      </p>

                      {!q.isCorrect && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-500">Correct Sentence:</p>
                          <p className="text-gray-800 font-medium text-base">
                            {fillSentence(q.prompt, correctWords, "text-green-600")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">No results to display.</p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ResultScreen;
