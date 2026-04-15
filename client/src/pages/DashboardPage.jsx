import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { LogOut, Layout, Play, Clock, BarChart2, ChevronRight, Trophy, Target, TrendingUp, Calendar, ArrowRight, Zap, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import interviewService from '../services/interviewService';
import userService from '../services/userService';

const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('Frontend Developer');
  const [difficulty, setDifficulty] = useState('medium');
  const [isStarting, setIsStarting] = useState(false);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalInterviews: 0, averageScore: 0, highestScore: 0, lowestScore: 0 });
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await userService.getHistory();
        if (data.history) setHistory(data.history);
        if (data.stats) setStats(data.stats);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleStartInterview = async () => {
    setIsStarting(true);
    try {
      const data = await interviewService.startInterview(role, difficulty);
      localStorage.setItem('currentInterview', JSON.stringify(data));
      navigate('/interview');
    } catch (error) {
      console.error('Failed to start interview:', error);
      alert('Failed to start interview. Please try again.');
    } finally {
      setIsStarting(false);
    }
  };

  const handleViewResult = (interviewId) => {
    navigate(`/result?id=${interviewId}`);
  };

  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'DevOps Engineer',
    'Data Scientist',
    'Product Manager',
    'UI/UX Designer'
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const getDifficultyStyle = (diff) => {
    switch (diff) {
      case 'easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'medium': return 'text-gold bg-gold/10 border-gold/20';
      case 'hard': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-muted bg-white/5 border-white/10';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-gold';
    if (score >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-deep text-white relative overflow-hidden">
      <div className="noise-overlay"></div>
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="bg-deep/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 py-5 flex justify-between items-center sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-deep fill-deep" />
          </div>
          <span className="text-xl font-bold tracking-tight font-sans-clean">Performance Portal</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="p-2 text-muted hover:text-gold transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-muted hover:text-white border border-white/5"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Exit</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em]">System Active</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif-drama mb-4">Command Center.</h1>
          <p className="text-muted text-xl max-w-2xl font-medium">Refining academic and career pathways through AI-driven quantitative analysis.</p>
        </div>

        {/* Stats Section */}
        {stats?.totalInterviews > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="card-dark !p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <Target className="w-16 h-16 text-white" />
              </div>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest block mb-4">Total Sessions</span>
              <p className="text-5xl font-serif-drama text-white">{stats.totalInterviews}</p>
            </div>

            <div className="card-dark !p-8 relative overflow-hidden group border-gold/10">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-gold">
                <TrendingUp className="w-16 h-16" />
              </div>
              <span className="text-gold text-[10px] font-bold uppercase tracking-widest block mb-4">Average Rating</span>
              <p className="text-5xl font-serif-drama text-gold">{stats.averageScore}%</p>
            </div>

            <div className="card-dark !p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-amber-400">
                <Trophy className="w-16 h-16" />
              </div>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest block mb-4">Highest Peak</span>
              <p className="text-5xl font-serif-drama text-amber-400">{stats.highestScore}%</p>
            </div>

            <div className="card-dark !p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-rose-400">
                <BarChart2 className="w-16 h-16" />
              </div>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest block mb-4">Session Floor</span>
              <p className="text-5xl font-serif-drama text-rose-400">{stats.lowestScore}%</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Configuration Card */}
          <div className="lg:col-span-7 card-dark !p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Play className="w-32 h-32 text-gold fill-gold" />
            </div>

            <h2 className="text-3xl font-serif-drama mb-10 flex items-center">
              <Play className="w-6 h-6 mr-4 text-gold fill-gold" />
              Protocol Configuration
            </h2>

            <div className="space-y-10 relative z-10">
              <div>
                <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-4">Select Domain</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-tighter transition-all duration-300 border ${
                        role === r
                          ? 'bg-gold border-gold text-deep shadow-xl shadow-gold/20'
                          : 'bg-white/5 border-white/5 text-muted hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-4">Stress Level</label>
                <div className="flex space-x-4">
                  {difficulties.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDifficulty(d.value)}
                      className={`flex-1 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                        difficulty === d.value
                          ? 'bg-white border-white text-deep shadow-2xl'
                          : 'bg-white/5 border-white/5 text-muted hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleStartInterview}
                disabled={isStarting}
                className="btn-gold w-full mt-10 py-6 text-xl shadow-gold/20 flex items-center justify-center"
              >
                {isStarting ? (
                  <div className="animate-spin h-6 w-6 border-3 border-deep border-t-transparent rounded-full mr-4"></div>
                ) : (
                  <Zap className="w-6 h-6 mr-4 fill-deep" />
                )}
                {isStarting ? 'Calibrating...' : 'Initialize Mock Session'}
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-5 space-y-8">
            <div className="card-dark !p-10">
              <h3 className="text-2xl font-serif-drama mb-8 flex items-center">
                <Clock className="w-5 h-5 mr-4 text-gold" />
                Telemetry History
              </h3>

              {loadingHistory ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-muted text-xs font-bold uppercase tracking-widest">Retrieving Logs...</p>
                </div>
              ) : history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-white/5 rounded-3xl text-muted">
                  <p className="text-sm font-medium mb-2">No protocols recorded.</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold">First session pending initialization</p>
                </div>
              ) : (
                <div className="space-y-6 max-h-[450px] overflow-y-auto pr-3 scrollbar-thin">
                  {history.slice(0, 5).map((item) => (
                    <div
                      key={item.interviewId}
                      className="bg-deep/50 border border-white/5 rounded-2xl p-5 hover:border-gold/30 transition-all cursor-pointer group"
                      onClick={() => handleViewResult(item.interviewId)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-white text-sm group-hover:text-gold transition-colors">{item.role}</h4>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-widest ${getDifficultyStyle(item.difficulty)}`}>
                              {item.difficulty}
                            </span>
                            <span className="text-muted text-[10px] font-bold flex items-center">
                              <Calendar className="w-3 h-3 mr-1.5 opacity-50" />
                              {formatDate(item.createdAt)}
                            </span>
                          </div>
                        </div>
                        <p className={`text-2xl font-serif-drama ${getScoreColor(item.score)}`}>{item.score}%</p>
                      </div>
                      <p className="text-muted text-xs leading-relaxed line-clamp-2 mb-4 italic font-medium">"{item.feedback}"</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest">{item.answeredCount}/{item.questionCount} POINTS CAPTURED</span>
                        <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        {history.length > 0 && (
          <div className="mt-20 card-dark !p-12 overflow-hidden">
            <h3 className="text-3xl font-serif-drama mb-10 flex items-center">
              <BarChart2 className="w-6 h-6 mr-4 text-gold" />
              Complete Audit Log
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-muted text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="pb-6">Domain Role</th>
                    <th className="pb-6">Protocol Level</th>
                    <th className="pb-6">Date Recorded</th>
                    <th className="pb-6">Capture Score</th>
                    <th className="pb-6 text-right">Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {history.map((item) => (
                    <tr key={item.interviewId} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-6 text-white font-bold">{item.role}</td>
                      <td className="py-6">
                        <span className={`text-[9px] px-3 py-1 rounded-full border font-bold uppercase tracking-widest ${getDifficultyStyle(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="py-6 text-muted text-xs font-medium font-mono-data">{formatDate(item.createdAt)}</td>
                      <td className="py-6">
                        <span className={`text-2xl font-serif-drama ${getScoreColor(item.score)}`}>{item.score}%</span>
                      </td>
                      <td className="py-6 text-right">
                        <button
                          onClick={() => handleViewResult(item.interviewId)}
                          className="btn-gold !px-4 !py-2 !text-[10px] !inline-flex opacity-80 group-hover:opacity-100"
                        >
                          View Report <ChevronRight className="w-3 h-3 ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;