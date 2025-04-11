const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Save a question
router.post("/save", async (req, res) => {
  const { userId, question, bloomsLevel, llmAnswer, docAnswer, similarityScore } = req.body;

  try {
    const newQuestion = new Question({ userId, question, bloomsLevel, llmAnswer, docAnswer, similarityScore });
    await newQuestion.save();
    res.status(201).json({ message: "Question saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save question" });
  }
});

// Get all questions for a user
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const questions = await Question.find({ userId });
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve questions" });
    }
  });
  

module.exports = router;
