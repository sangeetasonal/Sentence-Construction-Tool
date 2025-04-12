import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./page/StartPage";
import QuestionCard from "./page/QuestionCard";
import ResultScreen from "./page/ResultScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<QuestionCard />} />
        <Route path="/result" element={<ResultScreen />} />

      </Routes>
    </Router>
  );
}

export default App;
