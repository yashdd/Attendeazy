import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const headers = {
  Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  "Content-Type": "application/json",
};

router.post("/summarize", async (req, res) => {

  const { event } = req.body;

  if (!event || typeof event !== "object") {
    return res.status(400).json({ message: "Event object is required" });
  }

  const { title, description, date, time, location, category, price } = event;

  const prompt = `
    Summarize the following event in 2-3 lines for a user, remember the event might be in past or in future, guide accordingly:
    Title: ${title}
    Description: ${description}
    Date: ${date}, Time: ${time}
    Location: ${location}
    Category: ${category}, Price: $${price}
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ inputs: prompt }),
    });

    const result = await response.json();
    const summary = result[0]?.summary_text || "No summary generated.";
    console.log("AI Summary:", summary);
    res.json({ summary });

  } catch (err) {
    console.error("Summarization error:", err);
    res.status(500).json({ message: "AI summarization failed" });
  }
});

export default router;
