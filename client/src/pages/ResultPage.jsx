import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  MessageSquare, 
  Target, 
  Home, 
  RefreshCw,
  Zap,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import interviewService from '../services/interviewService';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const interviewId = params.get('id');

    if (!interviewId) {
      navigate('/dashboard');
      return;
    }

    const fetchResult = async () => {
      try {
        const data = await interviewService.getResult(interviewId);
        setResult(data);
      } catch (error) {
        console.error('Failed to fetch result:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [location, navigate]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-gold';
    if (score >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-deep flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="noise-overlay"></div>
        <div className="relative mb-12">
          <div className="w-24 h-24 border-4 border-gold/10 rounded-full animate-ping absolute inset-0 opacity-20"></div>
          <div className="w-24 h-24 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-4xl font-serif-drama mb-4 tracking-tight">Audit Processing.</h2>
        <p className="text-muted text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Quantifying linguistic precision...</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen bg-deep text-white pb-32 relative overflow-hidden">
      <div className="noise-overlay"></div>
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <div className="pt-24 pb-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 px-5 py-2 bg-gold/5 border border-gold/10 rounded-full text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
            <Zap className="w-4 h-4 fill-gold" />
            <span>Audit Protocol Complete</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-serif-drama mb-16 leading-none">
            {result.role} <br /> <span className="text-gold italic font-black">Performance Audit.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gold rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="w-56 h-56 rounded-full border-4 border-white/5 flex flex-col items-center justify-center bg-surface shadow-2xl relative z-10 group-hover:border-gold/30 transition-all duration-500">
                <span className={`text-7xl font-serif-drama ${getScoreColor(result.score)}`}>{result.score}%</span>
                <span className="text-muted text-[10px] font-bold uppercase tracking-widest mt-2">Overall Capture</span>
              </div>
            </div>
            
            <div className="max-w-md text-left md:border-l border-white/5 md:pl-16">
              <div className="flex items-center space-x-3 text-gold mb-6 text-[10px] font-bold uppercase tracking-[0.3em]">
                <MessageSquare className="w-4 h-4" />
                <span>Executive Summary</span>
              </div>
              <p className="text-muted text-2xl leading-relaxed font-medium italic">
                "{result.feedback}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Strengths */}
          <div className="card-dark !p-10 border-emerald-500/10 group hover:border-emerald-500/30">
            <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-serif-drama mb-8">Competitive Edge</h3>
            <ul className="space-y-6">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex items-start space-x-4 text-muted text-sm font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="card-dark !p-10 border-rose-500/10 group hover:border-rose-500/30">
            <div className="bg-rose-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-rose-500/20 group-hover:scale-110 transition-transform">
              <XCircle className="w-7 h-7 text-rose-400" />
            </div>
            <h3 className="text-2xl font-serif-drama mb-8">Friction Points</h3>
            <ul className="space-y-6">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start space-x-4 text-muted text-sm font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(251,113,133,0.6)]"></div>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="card-dark !p-10 border-gold/10 group hover:border-gold/30">
            <div className="bg-gold/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-gold/20 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-7 h-7 text-gold" />
            </div>
            <h3 className="text-2xl font-serif-drama mb-8">Calibration Vectors</h3>
            <ul className="space-y-6">
              {result.improvements.map((imp, i) => (
                <li key={i} className="flex items-start space-x-4 text-muted text-sm font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Review */}
        <div className="mt-32">
          <div className="text-center mb-20">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">CAPTURE LOGS</span>
            <h2 className="text-5xl font-serif-drama">Session Reconstruction.</h2>
          </div>
          
          <div className="space-y-10">
            {result.questions.map((q, i) => (
              <div key={i} className="card-dark !p-12 hover:bg-white/[0.02] transition-colors border-white/5">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center text-deep font-black text-lg flex-shrink-0 shadow-xl shadow-gold/20">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <span className="text-gold text-[10px] font-bold uppercase tracking-widest block mb-4">Inquiry Vector</span>
                    <p className="text-2xl text-white font-bold leading-snug mb-12">{q}</p>
                    
                    <span className="text-muted text-[10px] font-bold uppercase tracking-widest block mb-4">Captured Response</span>
                    <div className="bg-deep/50 border border-white/5 rounded-[2rem] p-8 text-muted text-lg leading-relaxed shadow-inner italic">
                      {result.answers[i] || (
                        <span className="opacity-30">NO RESPONSE CAPTURED.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-32 flex flex-col sm:flex-row items-center justify-center gap-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto flex items-center justify-center space-x-4 px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl transition-all font-bold uppercase tracking-widest text-xs shadow-xl"
          >
            <Home className="w-5 h-5" />
            <span>Return to Command Center</span>
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto btn-gold px-12 py-6 text-xl shadow-gold/30"
          >
            <RefreshCw className="w-6 h-6 mr-4" />
            <span>Initiate New Session</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;