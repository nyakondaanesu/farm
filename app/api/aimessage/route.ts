import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
// Note: In production, use environment variables for API keys
const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_AI_KEY || "YOUR_API_KEY"
);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req: Request) {
  try {
    // Parse the request body to get the prompt
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Generate content using the AI model
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Return the AI-generated response
    return NextResponse.json(
      {
        message: "AI response generated successfully",
        response: responseText,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response" },
      { status: 500 }
    );
  }
}

// Optional: Add a GET method to provide API information
export async function GET() {
  return NextResponse.json(
    {
      message:
        "AI Message API is running. Send a POST request with a 'prompt' field to generate content.",
    },
    { status: 200 }
  );
}
