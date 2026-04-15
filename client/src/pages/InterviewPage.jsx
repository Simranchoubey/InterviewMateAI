import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Send, AlertCircle, Timer, MessageSquare, Mic, MicOff, Volume2, VolumeX, Zap } from 'lucide-react';
import interviewService from '../services/interviewService';
import useVoiceRecognition from '../hooks/useVoiceRecognition';
import useTextToSpeech from '../hooks/useTextToSpeech';

const InterviewPage = () => {
  const navigate = useNavigate();
  const [interviewData, setInterviewData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    isListening,
    isSupported: voiceSupported,
    transcript,
    resetTranscript,
    startListening,
    stopListening,
    interimTranscript,
  } = useVoiceRecognition();

  const { isSpeaking, isSupported: ttsSupported, speak, stop: stopSpeaking } = useTextToSpeech();

  useEffect(() => {
    const data = localStorage.getItem('currentInterview');
    if (!data) {
      navigate('/dashboard');
      return;
    }
    const parsedData = JSON.parse(data);
    setInterviewData(parsedData);
    setAnswers(new Array(parsedData.questions.length).fill(''));
  }, [navigate]);

  useEffect(() => {
    if (transcript) {
      setCurrentAnswer((prev) => prev + (prev ? ' ' : '') + transcript);
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < interviewData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer(answers[currentQuestionIndex + 1] || '');
    }
  };

  const handlePrevious = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer(answers[currentQuestionIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    const finalAnswers = [...answers];
    finalAnswers[currentQuestionIndex] = currentAnswer;

    setIsSubmitting(true);
    try {
      await interviewService.submitAnswers(interviewData.interviewId, finalAnswers);
      navigate(`/result?id=${interviewData.interviewId}`);
    } catch (error) {
      console.error('Failed to submit answers:', error);
      alert('Failed to submit answers. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleReadQuestion = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(interviewData.questions[currentQuestionIndex]);
    }
  };

  if (!interviewData) return null;

  const progress = ((currentQuestionIndex + 1) / interviewData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-deep text-white flex flex-col relative overflow-hidden">
      <div className="noise-overlay"></div>
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="bg-deep/80 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
            <MessageSquare className="w-6 h-6 text-deep fill-deep" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight font-sans-clean">{interviewData.role}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-bold">{interviewData.difficulty} Level</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Session Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-3 text-muted">
            <Timer className="w-4 h-4 text-gold" />
            <span className="text-sm font-mono-data font-bold">PROTOCOL_RUNTIME: 00:00:00</span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs font-bold uppercase tracking-widest text-muted hover:text-rose-400 transition-colors"
          >
            Abort
          </button>
        </div>
      </header>

      {/* Progress Line */}
      <div className="w-full h-[1px] bg-white/5 relative">
        <div
          className="h-full bg-gold transition-all duration-700 ease-out shadow-[0_0_15px_rgba(250,204,21,0.6)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 flex flex-col relative z-10">
        {/* Question Area */}
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center justify-between mb-6">
            <div className="inline-block px-4 py-1.5 bg-gold/5 border border-gold/10 rounded-full text-gold text-[10px] font-bold uppercase tracking-[0.3em]">
              Capture Point {currentQuestionIndex + 1} of {interviewData.questions.length}
            </div>
            {ttsSupported && (
              <button
                onClick={handleReadQuestion}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                  isSpeaking ? 'bg-gold text-deep' : 'bg-white/5 text-muted hover:text-white'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="text-[10px] font-bold uppercase tracking-widest">Aural Feedback</span>
              </button>
            )}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif-drama text-white leading-tight">
            {interviewData.questions[currentQuestionIndex]}
          </h2>
        </div>

        {/* Answer Input */}
        <div className="flex-1 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">Response Input Protocol</label>
            {voiceSupported && (
              <button
                onClick={toggleVoiceInput}
                className={`flex items-center space-x-3 px-5 py-2.5 rounded-xl transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/20'
                    : 'bg-white/5 text-muted hover:text-white border border-white/5'
                }`}
              >
                {isListening ? (
                  <>
                    <div className="flex space-x-1">
                      <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Active Capture</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Voice Capture</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="relative flex-1 flex flex-col">
            <textarea
              value={currentAnswer + (interimTranscript ? ` ${interimTranscript}` : '')}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="flex-1 w-full bg-surface/50 border border-white/5 rounded-[2rem] p-10 text-white placeholder-white/10 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent transition-all resize-none text-xl leading-relaxed shadow-inner font-medium"
              placeholder="Initialize response sequence..."
            ></textarea>
            
            {isListening && (
              <div className="absolute right-10 bottom-10 flex items-center space-x-2 text-rose-400">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Biometric Link Established</span>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center text-muted text-[10px] font-bold uppercase tracking-widest">
            <AlertCircle className="w-4 h-4 mr-2 text-gold" />
            AI Calibration: Analyzing for linguistic precision and technical depth.
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-3 px-8 py-4 text-muted hover:text-white transition-colors disabled:opacity-10 disabled:cursor-not-allowed font-bold uppercase tracking-widest text-xs"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-6">
            {currentQuestionIndex < interviewData.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn-gold !bg-white/10 !text-white hover:!bg-white/20 border border-white/10 px-10 py-4 text-xs uppercase tracking-widest"
              >
                <span>Proceed</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-gold px-12 py-5 text-lg shadow-gold/30"
              >
                {isSubmitting ? (
                  <div className="animate-spin h-6 w-6 border-3 border-deep border-t-transparent rounded-full mr-3"></div>
                ) : (
                  <Send className="w-5 h-5 mr-3" />
                )}
                {isSubmitting ? 'Processing...' : 'Complete Protocol'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;