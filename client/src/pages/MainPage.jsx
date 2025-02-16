import { useState, useEffect } from "react";
import { Sun, Moon, Upload, Loader2 } from "lucide-react";
// import Question from "../Components/Question";
import { api } from "../const";

const MainForm = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [pdfs, setPdfs] = useState([]);
  const [topic, setTopic] = useState("");
  const [bloomsLevel, setBloomsLevel] = useState("Remember");
  const [marksPerQuestion, setMarksPerQuestion] = useState(5);
  const [numQuestions, setNumQuestions] = useState(5);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pdfs.length === 0) {
      console.error("No PDF file selected");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", pdfs[0]); // Sending only the first PDF for now
    formData.append("topic", topic);
    formData.append("blooms_level", bloomsLevel);
    formData.append("marks_per_question", marksPerQuestion);
    formData.append("num_questions", numQuestions);

    try {
      const response = await api.post("/questions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      setResults(response.data.data.results);
    } catch (error) {
      console.error("Error generating questions:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-10 transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-3 bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
        title="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>

      <div
        className={`w-full max-w-2xl p-10 rounded-lg shadow-2xl transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-4xl font-bold text-center mb-8">
          AI Question Generator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PDF Upload */}
          <div>
            <label className="block font-semibold text-lg mb-2">
              Upload PDFs
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center space-x-4">
              <Upload className="text-blue-500" size={24} />
              <input
                type="file"
                name="pdfs"
                multiple
                onChange={handleFileChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Topic & Bloom's Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-lg mb-2">
                Topic
              </label>
              <input
                type="text"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter topic"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-lg mb-2">
                Bloom’s Level
              </label>
              <select
                name="blooms_level"
                value={bloomsLevel}
                onChange={(e) => setBloomsLevel(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="Remember">Remember</option>
                <option value="Understand">Understand</option>
                <option value="Apply">Apply</option>
                <option value="Analyze">Analyze</option>
                <option value="Evaluate">Evaluate</option>
                <option value="Create">Create</option>
              </select>
            </div>
          </div>

          {/* Marks & Number of Questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-lg mb-2">
                Marks Per Question:{" "}
                <span className="font-bold">{marksPerQuestion}</span>
              </label>
              <input
                type="range"
                name="marks_per_question"
                min="1"
                max="10"
                value={marksPerQuestion}
                onChange={(e) => setMarksPerQuestion(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block font-semibold text-lg mb-2">
                Number of Questions:{" "}
                <span className="font-bold">{numQuestions}</span>
              </label>
              <input
                type="range"
                name="num_questions"
                min="1"
                max="10"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-3 py-3 rounded-lg font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700 text-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            <span>{loading ? "Generating..." : "Generate"}</span>
          </button>
        </form>
      </div>

      {/* Render results if available */}
      {/* {results && <Question data={results} />} */}
    </div>
    
  </>
  );
};

export default MainForm;
