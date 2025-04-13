import React from "react";
import { useNavigate } from "react-router-dom";
import ConstructorImg from "../assets/Icons.png";
import coinImg from "../assets/coin.png";
import dotsIcon from "../assets/dots.png";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz");
  };
  

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Top Navbar */}
      <div className="w-full relative flex items-center justify-center px-4 py-4 bg-[#F8F8F8BF] backdrop-blur-[50px] shadow-[0px_2px_36px_0px_#00000014]">
        <h1 className="text-lg font-medium text-center text-[#414343]">
          Sentence Construction
        </h1>
        <img
          src={dotsIcon}
          alt="Menu"
          className="w-5 h-5 absolute right-[4.625rem]"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 text-center min-h-[calc(100vh-80px)]">
        <img
          src={ConstructorImg}
          alt="Sentence Constructor"
          className="mb-6 w-[54.4px] h-[45px]"
        />

        <h2 className="text-[40px] leading-[46px] font-semibold text-[#0F1010] text-gray-800 mb-4 text-center">
          Sentence Construction
        </h2>

        <p className="text-[#7C8181] text-[18px] leading-[28px] font-normal tracking-[-0.01em] text-center max-w-[32rem] mb-10">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>

        <div className="flex justify-center items-center gap-8 mb-10 text-gray-700">
          <div className="text-center">
            <p className="text-[#0F1010] font-[500] text-[18px] leading-[28px] tracking-[0%] text-center">
              Time Per Question
            </p>
            <p className="text-[#7C8181] mt-2">30 sec</p>
          </div>

          {/* Divider */}
          <div className="w-px h-[54px] bg-gray-300" />

          <div className="text-center">
            <p className="text-[#0F1010] font-[500] text-[18px] leading-[28px] tracking-[0%] text-center">
              Total Questions
            </p>
            <p className="text-[#7C8181] mt-2">10</p>
          </div>

          {/* Divider */}
          <div className="w-px h-[54px] bg-gray-300" />

          <div className="text-center">
            <p className="text-[#0F1010] font-[500] text-[18px] leading-[28px] tracking-[0%] text-center">
              Coins
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <img src={coinImg} alt="Coin" />
              <p className="text-[#7C8181]">0</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="px-10 py-2 border border-[#453FE1] text-[#453FE1] rounded-lg"
            onClick={() => console.log("Back clicked")}
          >
            Back
          </button>
          <button
            className="px-10 py-2 bg-[#453FE1] text-white rounded-lg"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;