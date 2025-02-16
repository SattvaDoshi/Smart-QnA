import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiUpload } from "react-icons/fi";

const MainForm = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [pdf, setPdf] = useState(null);
  const [topic, setTopic] = useState("");
  const [bloomsLevel, setBloomsLevel] = useState("Remember");
  const [marksPerQuestion, setMarksPerQuestion] = useState(5);

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
    setPdf(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ pdf, topic, bloomsLevel, marksPerQuestion });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-all ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-2 bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-lg"
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <div className={`w-full max-w-lg p-8 rounded-lg shadow-lg transition-all ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className="text-3xl font-semibold text-center mb-6">AI Question Generator</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload */}
          <label className="block font-medium">Upload PDF</label>
          <div className="border border-gray-300 dark:border-gray-600 rounded-md p-3 flex items-center space-x-3">
            <FiUpload className="text-blue-500" size={20} />
            <input type="file" name="pdf" onChange={handleFileChange} className="w-full" />
          </div>

          {/* Topic Input */}
          <label className="block font-medium">Topic</label>
          <input
            type="text"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter topic"
            required
          />

          {/* Bloom's Level Dropdown */}
          <label className="block font-medium">Bloom&lsquo;s Level</label>
          <select
            name="blooms_level"
            value={bloomsLevel}
            onChange={(e) => setBloomsLevel(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white outline:none"
          >
            <option value="Remember">Remember</option>
            <option value="Understand">Understand</option>
            <option value="Apply">Apply</option>
            <option value="Analyze">Analyze</option>
            <option value="Evaluate">Evaluate</option>
            <option value="Create">Create</option>
          </select>

          {/* Marks per Question Slider */}
          <label className="block font-medium">Marks Per Question: {marksPerQuestion}</label>
          <input
            type="range"
            name="marks_per_question"
            min="1"
            max="10"
            value={marksPerQuestion}
            onChange={(e) => setMarksPerQuestion(e.target.value)}
            className="w-full"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-md font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700"
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainForm;
