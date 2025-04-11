import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react"; // Clerk hook to get the authenticated user
import { toast } from "react-toastify";

const SavedQuestions = () => {
  const { user } = useUser(); // Get authenticated user details
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedQuestions = async () => {
      if (!user) {
        toast.error("User not authenticated");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/questions/${user.id}`);
        setSavedQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved questions:", error);
        toast.error("Failed to load saved questions");
        setLoading(false);
      }
    };

    fetchSavedQuestions();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Saved Questions</h1>
      {savedQuestions.length === 0 ? (
        <p>No questions saved yet.</p>
      ) : (
        savedQuestions.map((q) => (
          <div key={q._id} className="mb-4 p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <h2 className="font-semibold">{q.question}</h2>
            <p><strong>Bloom’s Level:</strong> {q.bloomsLevel}</p>
            <p><strong>LLM Answer:</strong> {q.llmAnswer}</p>
            <p><strong>Doc Answer:</strong> {q.docAnswer}</p>
            <p><strong>Similarity Score:</strong> {q.similarityScore}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedQuestions;
