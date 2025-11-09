import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Route to talk to your Hugging Face API
app.post("/chat", async (req, res) => {
  try {
    const userText = req.body.text || "";

    const response = await fetch(
      "https://radhe57-fest-event-57.hf.space/gradio_api/call/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [userText] }),
      }
    );

    const data = await response.json();
    const reply = data?.data?.[0] || "⚠️ No response from model.";

    res.json({ reply });
  } catch (error) {
    res.json({ reply: "Server error: " + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
