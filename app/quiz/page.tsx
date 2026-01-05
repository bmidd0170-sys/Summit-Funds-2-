
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const quizQuestions = [
  {
    question: "What is your current employment status?",
    options: [
      "Full-time employed",
      "Part-time employed",
      "Self-employed",
      "Unemployed",
      "Student",
      "Retired",
    ],
  },
  {
    question: "What is your monthly income range?",
    options: [
      "Less than $2,000",
      "$2,000 - $4,000",
      "$4,000 - $6,000",
      "$6,000 - $8,000",
      "$8,000 - $10,000",
      "More than $10,000",
    ],
  },
  {
    question: "Do you have any outstanding debts?",
    options: [
      "No debt",
      "Credit card debt",
      "Student loans",
      "Car loan",
      "Mortgage",
      "Multiple types",
    ],
  },
  {
    question: "How much do you currently have in savings?",
    options: [
      "Less than $500",
      "$500 - $2,000",
      "$2,000 - $5,000",
      "$5,000 - $10,000",
      "$10,000 - $25,000",
      "More than $25,000",
    ],
  },
  {
    question: "What are your primary financial goals?",
    options: [
      "Build emergency fund",
      "Pay off debt",
      "Save for vacation",
      "Buy a home",
      "Invest for retirement",
      "Start a business",
    ],
  },
  {
    question: "How much do you spend on rent/mortgage monthly?",
    options: [
      "Less than $500",
      "$500 - $1,000",
      "$1,000 - $1,500",
      "$1,500 - $2,000",
      "$2,000 - $3,000",
      "More than $3,000",
    ],
  },
  {
    question: "How much do you spend on groceries monthly?",
    options: [
      "Less than $200",
      "$200 - $300",
      "$300 - $400",
      "$400 - $500",
      "$500 - $600",
      "More than $600",
    ],
  },
  {
    question: "Do you have any dependents?",
    options: [
      "None",
      "1 dependent",
      "2 dependents",
      "3 dependents",
      "4+ dependents",
      "Prefer not to say",
    ],
  },
  {
    question: "How often do you review your finances?",
    options: [
      "Daily",
      "Weekly",
      "Monthly",
      "Quarterly",
      "Yearly",
      "Never",
    ],
  },
  {
    question: "What is your risk tolerance for investments?",
    options: [
      "Very conservative",
      "Conservative",
      "Moderate",
      "Aggressive",
      "Very aggressive",
      "Not sure",
    ],
  },
  {
    question: "Do you have an emergency fund?",
    options: [
      "Yes, 6+ months expenses",
      "Yes, 3-6 months",
      "Yes, 1-3 months",
      "Less than 1 month",
      "No",
      "Working on it",
    ],
  },
  {
    question: "How do you primarily track your expenses?",
    options: [
      "Spreadsheet",
      "Banking app",
      "Budgeting app",
      "Paper/notebook",
      "Mental tracking",
      "Don't track",
    ],
  },
  {
    question: "What is your biggest financial challenge?",
    options: [
      "Not earning enough",
      "Overspending",
      "No savings plan",
      "Too much debt",
      "No investment strategy",
      "Lack of knowledge",
    ],
  },
  {
    question: "How important is financial security to you?",
    options: [
      "Extremely important",
      "Very important",
      "Moderately important",
      "Somewhat important",
      "Not very important",
      "Not important",
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(quizQuestions.length).fill(""));

  useEffect(() => {
    // Redirect if quiz already completed
    if (typeof window !== "undefined" && localStorage.getItem("quizCompleted") === "true") {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSelect = (option: string) => {
    const updated = [...answers];
    updated[current] = option;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (!answers[current]) return;
    if (current < quizQuestions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      // Quiz complete
      if (typeof window !== "undefined") {
        localStorage.setItem("quizCompleted", "true");
      }
      router.replace("/dashboard");
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const progress = ((current + 1) / quizQuestions.length) * 100;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Financial Profile Quiz</h1>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center text-gray-500 font-semibold">
            {current + 1}/{quizQuestions.length}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            {quizQuestions[current].question}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quizQuestions[current].options.map((option) => (
              <button
                key={option}
                className={`quiz-option px-4 py-3 rounded-lg border-2 transition font-medium text-center ${
                  answers[current] === option
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white border-blue-600"
                    : "bg-gray-50 border-gray-200 text-gray-800 hover:border-blue-400 hover:bg-white"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="btn btn-secondary px-6 py-2 rounded-lg font-semibold"
            onClick={handlePrev}
            disabled={current === 0}
          >
            Prev
          </button>
          <button
            className="btn btn-primary px-6 py-2 rounded-lg font-semibold"
            onClick={handleNext}
            disabled={!answers[current]}
          >
            {current === quizQuestions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </main>
  );
}
