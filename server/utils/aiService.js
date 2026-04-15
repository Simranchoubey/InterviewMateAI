import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Generate 5 interview questions for a given role and level.
 */
export const generateQuestions = async (role, level) => {
  try {
    const prompt = `Generate 5 interview questions for a ${role} at ${level} level. 
    Return the output as a simple JSON array of strings, like this: ["Question 1", "Question 2", ...]
    Do not include any other text or markdown formatting in the response, just the JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Sometimes AI includes markdown code blocks, strip them
    const jsonStr = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error generating questions with AI:', error);
    // Fallback dummy questions if AI fails
    return [
      `What is your experience with ${role}?`,
      "Can you describe a challenging project you worked on?",
      "How do you stay updated with industry trends?",
      "What are your core strengths for this role?",
      "Where do you see yourself in five years?"
    ];
  }
};

/**
 * Evaluate interview answers and return a detailed feedback.
 */
export const evaluateAnswers = async (questions, answers) => {
  try {
    const combinedData = questions.map((q, i) => `Q: ${q}\nA: ${answers[i] || 'No answer provided'}`).join('\n\n');
    
    const prompt = `Evaluate these interview answers based on clarity, correctness, and confidence. 
    Give a total score out of 100, and provide a summary of strengths, weaknesses, and improvements.
    
    Interview Data:
    ${combinedData}
    
    Return the evaluation as a JSON object with the following structure:
    {
      "score": 85,
      "feedback": "Overall summary of the performance",
      "strengths": ["strength 1", "strength 2"],
      "weaknesses": ["weakness 1", "weakness 2"],
      "improvements": ["improvement 1", "improvement 2"]
    }
    Do not include any other text or markdown formatting in the response, just the JSON object.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    const jsonStr = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error evaluating answers with AI:', error);
    // Fallback dummy feedback if AI fails
    return {
      score: 70,
      feedback: "Good effort. Your answers were consistent but lacked depth in technical areas.",
      strengths: ["Clear communication", "Confident delivery"],
      weaknesses: ["Technical depth", "Specific examples"],
      improvements: ["Provide more STAR-based examples", "Elaborate on technical choices"]
    };
  }
};