import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Replace this with your real Hugging Face Space endpoint
const HF_API_URL = "https://radhe57-fest-event-57.hf.space/gradio_api/call/predict";

app.post("/chat", async (req, res) => {
  try {
    const userText = req.body.text || "";

    // Forward message to your Hugging Face Space
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [userText]
      }),
    });

    if (!response.ok) {
      return res.json({ reply: "⚠️ Model request failed." });
    }

    const result = await response.json();
    // Hugging Face Gradio API usually sends text under `data[0]`
    const reply = result.data ? result.data[0] : "⚠️ No model response.";

    res.json({ reply });
  } catch (err) {
    console.error("Error:", err);
    res.json({ reply: "⚠️ No response from model." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
