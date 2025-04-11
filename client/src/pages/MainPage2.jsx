import { useState, useEffect } from "react";
import { FiMoon, FiSun, FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";

const dummyQuestions = [
  {
    id: 1,
    question: "What is React?",
    bloomsLevel: "Understand",
    llmAnswer: "React is a JavaScript library for building user interfaces.",
    docAnswer: "React is maintained by Meta and is used for SPA development.",
    similarityScore: "85%",
  },
  {
    id: 2,
    question: "Explain useState hook.",
    bloomsLevel: "Apply",
    llmAnswer: "useState is a React hook to manage state in functional components.",
    docAnswer: "useState returns a pair: the current state and a function to update it.",
    similarityScore: "90%",
  },
  {
    id: 3,
    question: "What is JSX?",
    bloomsLevel: "Remember",
    llmAnswer: "JSX is a syntax extension for JavaScript used with React.",
    docAnswer: "JSX allows writing HTML-like code inside JavaScript.",
    similarityScore: "80%",
  },
];

const MainForm = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [pdfs, setPdfs] = useState([]);
  const [topic, setTopic] = useState("");
  const [bloomsLevel, setBloomsLevel] = useState("Remember");
  const [marksPerQuestion, setMarksPerQuestion] = useState(5);
  const [numQuestions, setNumQuestions] = useState(5);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [savedQuestions, setSavedQuestions] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setPdfs((prevPdfs) => [...prevPdfs, ...selectedFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pdfs.length === 0) {
      toast.error("Please select at least one PDF file");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const generated = dummyQuestions.slice(0, numQuestions);
      setResults(generated);
      setLoading(false);
      toast.success("Dummy questions generated!");
    }, 1000);
  };

  const handleSave = (question) => {
    if (!savedQuestions.find((q) => q.id === question.id)) {
      setSavedQuestions([...savedQuestions, question]);
      toast.success("Question saved!");
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    savedQuestions.forEach((q, idx) => {
      doc.text(`Q${idx + 1}: ${q.question}`, 10, 10 + idx * 30);
      doc.text(`Bloom’s Level: ${q.bloomsLevel}`, 10, 16 + idx * 30);
      doc.text(`LLM Answer: ${q.llmAnswer}`, 10, 22 + idx * 30);
      doc.text(`Doc Answer: ${q.docAnswer}`, 10, 28 + idx * 30);
    });
    doc.save("Saved_Questions.pdf");
  };

  return (
    <div
      className={`min-h-screen p-10 transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-32 right-6 p-3 bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full"
      >
        {darkMode ? <FiSun /> : <FiMoon />}
      </button>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Original Styled Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-6"
        >
          <h1 className="text-3xl font-semibold text-center">AI Question Generator</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Upload PDF files</label>
              <div className="border p-3 rounded bg-gray-50 dark:bg-gray-700 flex items-center gap-3">
                <FiUpload />
                <input type="file" multiple onChange={handleFileChange} />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic"
                className="w-full p-2 rounded border dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Bloom’s Taxonomy Level</label>
              <select
                value={bloomsLevel}
                onChange={(e) => setBloomsLevel(e.target.value)}
                className="w-full p-2 rounded border dark:bg-gray-700"
              >
                <option>Remember</option>
                <option>Understand</option>
                <option>Apply</option>
                <option>Analyze</option>
                <option>Evaluate</option>
                <option>Create</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Marks per Question</label>
              <input
                type="number"
                value={marksPerQuestion}
                onChange={(e) => setMarksPerQuestion(Number(e.target.value))}
                className="w-full p-2 rounded border dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Number of Questions</label>
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full p-2 rounded border dark:bg-gray-700"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg"
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>
        </form>

        {/* Section 2: Show Dummy Questions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 font-bold">Generated Questions</h2>
          {results.map((q) => (
            <div
              key={q.id}
              className="p-3 border-b hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedQuestion(q)}
            >
              {q.question}
            </div>
          ))}
        </div>

        {/* Section 2: Show Details of Clicked Question */}
        {selectedQuestion && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-2">
            <h3 className="text-xl font-bold">{selectedQuestion.question}</h3>
            <p><strong>Bloom’s Level:</strong> {selectedQuestion.bloomsLevel}</p>
            <p><strong>LLM Answer:</strong> {selectedQuestion.llmAnswer}</p>
            <p><strong>Doc Answer:</strong> {selectedQuestion.docAnswer}</p>
            <p><strong>Similarity Score:</strong> {selectedQuestion.similarityScore}</p>
            <button
              onClick={() => handleSave(selectedQuestion)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Question
            </button>
          </div>
        )}

        {/* Section 3: Saved Questions + Export PDF */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Saved Questions</h3>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Export PDF
            </button>
          </div>
          {savedQuestions.length === 0 ? (
            <p>No questions saved yet.</p>
          ) : (
            savedQuestions.map((q) => (
              <div
                key={q.id}
                className="p-3 border-b hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setSelectedQuestion(q)}
              >
                {q.question}
              </div>
            ))
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default MainForm;
