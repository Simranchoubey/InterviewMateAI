import Interview from '../models/Interview.js';

export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 })
      .select('role difficulty score feedback createdAt questions answers strengths weaknesses improvements');

    const history = interviews.map(interview => ({
      interviewId: interview._id,
      role: interview.role,
      difficulty: interview.difficulty,
      score: interview.score,
      feedback: interview.feedback,
      createdAt: interview.createdAt,
      questionCount: interview.questions.length,
      answeredCount: interview.answers.filter(a => a && a.trim().length > 0).length,
      strengths: interview.strengths || [],
      weaknesses: interview.weaknesses || [],
      improvements: interview.improvements || []
    }));

    const stats = {
      totalInterviews: history.length,
      averageScore: history.length > 0 
        ? Math.round(history.reduce((sum, h) => sum + h.score, 0) / history.length) 
        : 0,
      highestScore: history.length > 0 
        ? Math.max(...history.map(h => h.score)) 
        : 0,
      lowestScore: history.length > 0 
        ? Math.min(...history.map(h => h.score)) 
        : 0
    };

    res.status(200).json({
      history,
      stats
    });
  } catch (err) {
    console.error('Error fetching history:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};