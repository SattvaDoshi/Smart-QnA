import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import { FaMagic, FaImages, FaTasks, FaChartBar, FaDatabase, FaFileAlt, FaUserPlus, FaFileUpload, FaClipboardList, FaCheck } from "react-icons/fa";

const features = [
  { title: "Generate Questions Instantly", desc: "Upload a PDF and generate high-quality questions in one click.", icon: FaMagic },
  { title: "Auto-Add Images to Answers", desc: "Enhance learning with relevant images included in answers.", icon: FaImages },
  { title: "Bloom's Taxonomy-Based Questions", desc: "Generate questions that cover all levels of learning.", icon: FaTasks },
  { title: "AI-Powered Similarity Scoring", desc: "Compare answers from PDF and LLM with a similarity score.", icon: FaChartBar },
  { title: "Save & Reuse Questions", desc: "Store questions for future exams and quick revisions.", icon: FaDatabase },
  { title: "Multiple Document Formats", desc: "Get documents in multiple formats as per your needs.", icon: FaFileAlt },
];

const steps = [
  { number: "1", title: "Create Account", desc: "Sign up to access the platform.", icon: FaUserPlus },
  { number: "2", title: "Upload Notes", desc: "Upload PDFs or text-based study materials.", icon: FaFileUpload },
  { 
    number: "3", 
    title: "Set Question Parameters", 
    desc: "Topic, Bloom's Taxonomy, Marks, No of Questions.", 
    icon: FaClipboardList 
  },
  { number: "4", title: "Click on Generate", desc: "AI generates structured questions instantly.", icon: FaCheck },
];

function LandingPage() {
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-15 bg-blue-100 border-b-4 border-t-2 border-blue-300">
        <h2 className="text-5xl font-extrabold text-blue-800 leading-tight">Say Goodbye to Manual Question Making!</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Save hundreds of hours by automating your question generation process.
        </p>
        <button
          className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => (isAuthenticated ? navigate("/dashboard") : navigate("/signup"))}
        >
          Get Started
        </button>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all cursor-pointer border border-blue-300 hover:border-blue-500 flex flex-col items-center text-center"
            onClick={() => (isAuthenticated ? navigate("/dashboard") : navigate("/login"))}
          >
            <feature.icon className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold text-blue-700">{feature.title}</h3>
            <p className="mt-3 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Steps Section */}
      <section className="max-w-5xl mx-auto p-6 mt-12">
        <h2 className="text-4xl font-extrabold text-blue-800 text-center py-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {steps.map((step, index) => (
  <div key={index} className="relative flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-xl border border-blue-300 hover:border-blue-500">
    {/* Improved Number Styling */}
    <div className="absolute -top-5 bg-blue-700 text-white text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-md">
      {step.number}
    </div>
    <step.icon className="text-5xl text-blue-600 mt-6 mb-4" />
    <h3 className="text-2xl font-semibold text-blue-700">{step.title}</h3>
    <p className="mt-2 text-gray-600">{step.desc}</p>
  </div>
))}

        </div>
      </section>
    </div>
  );
}

export default LandingPage;
