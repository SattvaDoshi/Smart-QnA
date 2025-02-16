import { useState } from "react";

const Question = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [checked, setChecked] = useState({});

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 space-y-4">
      {data.map((q, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border">
          <div className="flex justify-between items-center p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={checked[index] || false}
                onChange={() =>
                  setChecked({ ...checked, [index]: !checked[index] })
                }
                className="w-5 h-5"
              />
              <span className="text-lg font-semibold">{q.question}</span>
            </div>
            <span className="text-gray-600 dark:text-gray-300">
              Similarity: {q.similarity}%
            </span>
            <button onClick={() => toggleDropdown(index)} className="ml-3 text-lg">
              {openIndex === index ? "▲" : "▼"}
            </button>
          </div>
          {openIndex === index && (
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-medium">Answer from PDF:</p>
              <p className="text-gray-700 dark:text-gray-200">{q.pdf_answer}</p>
              <p className="font-medium mt-2">Answer from LLM:</p>
              <p className="text-gray-700 dark:text-gray-200">{q.llm_answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Question;
