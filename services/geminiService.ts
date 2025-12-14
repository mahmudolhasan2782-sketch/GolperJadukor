import { GoogleGenAI } from "@google/genai";
import { StoryParams } from "../types";

export const generateBengaliStoryStream = async (params: StoryParams) => {
  // Use the API key injected via Vite config
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const modelId = "gemini-2.5-flash"; // Using Flash for speed and good creative writing capabilities

  const prompt = `
    একজন পেশাদার এবং বিখ্যাত বাংলা ঔপন্যাসিকের মতো করে একটি বাস্তবসম্মত এবং হৃদয়স্পর্শী গল্প লিখুন।
    
    গল্পের বিবরণ:
    - প্রধান চরিত্রসমূহ: ${params.characters}
    - গল্পের পটভূমি বা থিম: ${params.theme}
    - গুরুত্বপূর্ণ শব্দ বা ঘটনা: ${params.keywords}

    নির্দেশনা:
    ১. গল্পের ভাষা হবে মার্জিত, সাহিত্যিক এবং বইয়ের পাতার মতো।
    ২. গল্পের প্লট বাস্তবসম্মত হতে হবে (অতিরঞ্জিত ফ্যান্টাসি নয়, যদি না থিমে বলা থাকে)।
    ৩. গল্পের একটি সুন্দর শিরোনাম দিন।
    ৪. গল্পটি যথেষ্ট দীর্ঘ এবং বিস্তারিত হবে।
    ৫. আবেগের গভীরতা এবং পরিবেশের বর্ণনা যেন জীবন্ত হয়।

    শুধুমাত্র গল্পের টেক্সট আউটপুট দিন (Markdown ফরম্যাটে)।
  `;

  try {
    const responseStream = await ai.models.generateContentStream({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "You are a legendary Bengali novelist known for realistic, emotional, and descriptive storytelling. Write only in Bengali.",
        temperature: 0.8,
      },
    });

    return responseStream;
  } catch (error) {
    console.error("Error generating story:", error);
    throw error;
  }
};