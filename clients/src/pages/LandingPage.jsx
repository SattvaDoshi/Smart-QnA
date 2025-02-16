import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Header */}
     

      {/* Hero Section */}
      <section className="text-center py-28 bg-blue-100 mt-16">
        <h2 className="text-4xl font-bold text-blue-800">Say Goodbye to Manual Question Making!</h2>
        <p className="text-lg text-gray-700 mt-4">Save hundreds of hours by automating your question generation process.</p>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {[ 
          {
            title: "Generate Questions Instantly",
            desc: "Upload a PDF and generate high-quality questions in one click.",
          },
          {
            title: "Auto-Add Images to Answers",
            desc: "Enhance learning with relevant images included in answers.",
          },
          {
            title: "Bloom's Taxonomy-Based Questions",
            desc: "Generate questions that cover all levels of learning.",
          },
          {
            title: "AI-Powered Similarity Scoring",
            desc: "Compare answers from PDF and LLM with a similarity score.",
          },
          {
            title: "Save & Reuse Questions",
            desc: "Store questions for future exams and quick revisions.",
          },
          {
            title: "Multiple Document Formats",
            desc: "Get documents in multiple formats as per your needs.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all cursor-pointer border border-blue-300 hover:border-blue-500"
            onClick={() => navigate("/login")}
          >
            <h3 className="text-2xl font-semibold text-blue-700">{feature.title}</h3>
            <p className="mt-3 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default LandingPage;
