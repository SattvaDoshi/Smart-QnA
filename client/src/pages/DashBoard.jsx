import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FaDatabase, FaMagic } from "react-icons/fa";

const dashboardFeatures = [
  {
    title: "Stored Questions",
    desc: "Access and manage your previously generated questions.",
    icon: FaDatabase,
    route: "/savedquestions",
  },
  {
    title: "Generate New Questions",
    desc: "Create fresh questions instantly from study material.",
    icon: FaMagic,
    route: "/dashboard/main",
  },
];

function DashBoard() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser(); // Clerk authentication state

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900 flex flex-col items-center">
      <section className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 mt-8">
        {dashboardFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all cursor-pointer border border-blue-300 hover:border-blue-500 flex flex-col items-center text-center"
            onClick={() => (isSignedIn ? navigate(feature.route) : navigate("/sign-in"))}
          >
            <feature.icon className="text-5xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold text-blue-700">{feature.title}</h3>
            <p className="mt-3 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default DashBoard;
