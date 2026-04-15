import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Mail, Lock, User, UserPlus, Zap, ArrowRight } from 'lucide-react';
import Alert from '../components/Alert';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Security Protocol: Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 
        err.response?.data?.message || 
        'Failed to initialize account. System error.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="noise-overlay"></div>
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div 
            className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-gold/20 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <Zap className="w-8 h-8 text-deep fill-deep group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="text-4xl font-serif-drama text-white mb-3">Create Protocol</h2>
          <p className="text-muted font-medium uppercase tracking-widest text-[10px]">Initialize your performance identity</p>
        </div>

        <div className="card-dark !p-10 border-white/5 shadow-2xl">
          {error && (
            <div className="mb-8">
              <Alert type="error" message={error} onClose={() => setError('')} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-3">
                Full Identity Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted group-focus-within:text-gold transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 bg-deep/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent transition-all font-medium"
                  placeholder="Alex Nexus"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-3">
                Email Identifier
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted group-focus-within:text-gold transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 bg-deep/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent transition-all font-medium"
                  placeholder="alex@nexus.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-3">
                Security Protocol
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted group-focus-within:text-gold transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 bg-deep/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent transition-all font-medium"
                  placeholder="•••••••• (min 6 characters)"
                  required
                  minLength={6}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full py-5 text-lg shadow-gold/10 mt-4"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-deep border-t-transparent rounded-full mr-3"></div>
                  Initializing...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Establish Protocol
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-muted text-sm font-medium">
              Already established?{' '}
              <Link
                to="/login"
                className="text-gold hover:text-white font-bold transition-colors underline decoration-gold/30 underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center items-center space-x-6">
          <Link to="/" className="text-white/20 hover:text-gold text-[10px] font-mono-data font-bold uppercase tracking-widest transition-colors flex items-center">
            <ArrowRight className="w-3 h-3 mr-2 rotate-180" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;