const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  question: { type: String, required: true },
  bloomsLevel: { type: String },
  llmAnswer: { type: String },
  docAnswer: { type: String },
  similarityScore: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
