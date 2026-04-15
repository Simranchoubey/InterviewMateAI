import Interview from '../models/Interview.js';
import { generateQuestions, evaluateAnswers } from '../utils/aiService.js';

export const startInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;
    const userId = req.user.id;

    // Generate 5 questions using AI
    const questions = await generateQuestions(role, difficulty);

    const interview = new Interview({
      userId,
      role,
      difficulty,
      questions,
      answers: [],
      score: 0,
      feedback: '',
      strengths: [],
      weaknesses: [],
      improvements: [],
      createdAt: new Date()
    });

    await interview.save();

    res.status(201).json({
      interviewId: interview._id,
      role: interview.role,
      difficulty: interview.difficulty,
      questions: interview.questions,
      createdAt: interview.createdAt
    });
  } catch (err) {
    console.error('Error starting interview:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, answers } = req.body;
    const userId = req.user.id;

    const interview = await Interview.findOne({ _id: interviewId, userId });

    if (!interview) {
      return res.status(404).json({ msg: 'Interview not found' });
    }

    if (interview.answers.length > 0) {
      return res.status(400).json({ msg: 'Answers already submitted for this interview' });
    }

    interview.answers = answers;
    
    // Evaluate answers immediately after submission
    const evaluation = await evaluateAnswers(interview.questions, answers);
    
    interview.score = evaluation.score;
    interview.feedback = evaluation.feedback;
    interview.strengths = evaluation.strengths;
    interview.weaknesses = evaluation.weaknesses;
    interview.improvements = evaluation.improvements;

    await interview.save();

    res.status(200).json({
      msg: 'Answers submitted and evaluated successfully',
      interviewId: interview._id,
      score: interview.score
    });
  } catch (err) {
    console.error('Error submitting answer:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getResult = async (req, res) => {
  try {
    const { interviewId } = req.query;
    const userId = req.user.id;

    let interview;

    if (interviewId) {
      interview = await Interview.findOne({ _id: interviewId, userId });
    } else {
      // Get the latest interview for this user
      interview = await Interview.findOne({ userId }).sort({ createdAt: -1 });
    }

    if (!interview) {
      return res.status(404).json({ msg: 'Interview not found' });
    }

    if (interview.answers.length === 0) {
      return res.status(400).json({ msg: 'Interview answers not yet submitted' });
    }

    res.status(200).json({
      interviewId: interview._id,
      role: interview.role,
      difficulty: interview.difficulty,
      questions: interview.questions,
      answers: interview.answers,
      score: interview.score,
      feedback: interview.feedback,
      strengths: interview.strengths,
      weaknesses: interview.weaknesses,
      improvements: interview.improvements,
      createdAt: interview.createdAt
    });
  } catch (err) {
    console.error('Error getting result:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};