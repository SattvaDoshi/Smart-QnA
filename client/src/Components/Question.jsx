import { useState } from "react";

const Question = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [checked, setChecked] = useState({});

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      id: 1,
      question: "What is Machine Learning?",
      answer1: "Machine learning is a method of data analysis that automates analytical model building.",
      answer2: "ML enables computers to learn from data without being explicitly programmed.",
      similarity: "85%",
    },
    {
      id: 2,
      question: "Explain the importance of Big Data.",
      answer1: "Big Data allows companies to analyze vast amounts of information to uncover hidden patterns.",
      answer2: "Big Data helps businesses make data-driven decisions by analyzing large datasets.",
      similarity: "78%",
    },
    {
      id: 3,
      question: "Define Artificial Intelligence.",
      answer1: "AI refers to the simulation of human intelligence in machines that can perform tasks.",
      answer2: "Artificial Intelligence enables machines to think, reason, and make decisions like humans.",
      similarity: "90%",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 space-y-4">
      {questions.map((q, index) => (
        <div key={q.id} className="bg-white shadow-lg rounded-lg p-4 w-full border">
          <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={checked[q.id] || false}
                onChange={() => setChecked({ ...checked, [q.id]: !checked[q.id] })}
                className="w-5 h-5"
              />
              <span className="text-lg font-semibold">{q.question}</span>
            </div>
            <span className="text-gray-600">Similarity: {q.similarity}</span>
            <button onClick={() => toggleDropdown(index)} className="ml-3 text-lg">
              {openIndex === index ? "▲" : "▼"}
            </button>
          </div>
          {openIndex === index && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Answer from PDF:</p>
              <p className="text-gray-700">{q.answer1}</p>
              <p className="font-medium mt-2">Answer from LLM:</p>
              <p className="text-gray-700">{q.answer2}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Question;
