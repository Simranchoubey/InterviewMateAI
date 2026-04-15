import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, 
  ArrowRight, 
  Mic, 
  Zap, 
  MessageSquare, 
  CheckCircle,
  Trophy,
  Target,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 ${
      scrolled ? 'bg-deep/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
            <Zap className="w-6 h-6 text-deep fill-deep" />
          </div>
          <span className="text-white font-bold tracking-tight text-xl font-sans-clean">InterviewMate AI</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-10 text-sm font-semibold uppercase tracking-widest text-muted">
          <a href="#features" className="hover:text-gold transition-colors">Features</a>
          <a href="#protocol" className="hover:text-gold transition-colors">Methodology</a>
          <a href="#philosophy" className="hover:text-gold transition-colors">Philosophy</a>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-white text-sm font-bold hover:text-gold transition-colors hidden sm:block"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="btn-gold px-6 py-2.5 text-sm"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power4.out'
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden px-6">
      {/* Abstract Background Element */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-[-10%] w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="hero-reveal inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gold text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></div>
            <span>Now Integrated with Gemini 1.5 Flash</span>
          </div>
          
          <h1 className="flex flex-col mb-10">
            <span className="hero-reveal text-white font-serif-drama text-6xl md:text-9xl leading-[1.1] mb-2">
              Elevate Your
            </span>
            <span className="hero-reveal text-gold font-serif-drama text-6xl md:text-9xl italic leading-[0.9] font-black">
              Performance.
            </span>
          </h1>
          
          <p className="hero-reveal text-muted text-xl md:text-2xl max-w-2xl mb-14 font-medium leading-relaxed">
            Refining career pathways through AI-driven quantitative analysis. Experience the future of high-stakes interview preparation.
          </p>
          
          <div className="hero-reveal flex flex-col sm:flex-row items-start gap-6">
            <button 
              onClick={() => navigate('/signup')}
              className="btn-gold px-12 py-5 text-xl min-w-[240px]"
            >
              Start Free Trial
              <ArrowUpRight className="ml-3 w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg font-mono-data tracking-tighter">4.9/5 RATING</span>
              <span className="text-muted text-xs uppercase tracking-widest font-bold">Trusted by 10k+ Engineers</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};

const FeatureCard = ({ title, desc, icon: Icon, delay = 0 }) => (
  <div className="card-dark group hover:border-gold/20 hover:bg-white/[0.02]">
    <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-gold/10 group-hover:scale-110 transition-transform">
      <Icon className="w-7 h-7 text-deep fill-deep" />
    </div>
    <h3 className="text-white font-serif-drama text-3xl mb-4">{title}</h3>
    <p className="text-muted leading-relaxed font-medium">
      {desc}
    </p>
    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
      <span className="text-gold text-xs font-bold uppercase tracking-widest">Learn More</span>
      <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-2 transition-transform" />
    </div>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">CORE CAPABILITIES</span>
          <h2 className="text-white font-serif-drama text-5xl md:text-7xl max-w-2xl">
            Intelligent Matching <br /> & Evaluation
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="AI Question Forge"
            desc="Dynamic generation of role-specific questions using advanced LLMs to simulate real-world scenarios."
            icon={Zap}
          />
          <FeatureCard 
            title="Biometric Voice"
            desc="Immersive speech-to-text protocol that captures nuance, confidence, and linguistic precision."
            icon={Mic}
          />
          <FeatureCard 
            title="Predictive Scores"
            desc="Comprehensive quantitative analysis of your performance compared to industry benchmarks."
            icon={Target}
          />
        </div>
      </div>
    </section>
  );
};

const Methodology = () => {
  return (
    <section id="protocol" className="py-40 bg-surface/30 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 blur-[100px] rounded-full"></div>
            <div className="relative card-dark !p-4 aspect-square flex items-center justify-center border-gold/10">
              <div className="w-full h-full rounded-2xl bg-deep flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-gold/30 animate-pulse">
                  <Trophy className="w-12 h-12 text-deep fill-deep" />
                </div>
                <h4 className="text-white font-serif-drama text-4xl mb-4">AI Matching Insight</h4>
                <p className="text-muted text-sm leading-relaxed">
                  "Based on your performance, you are in the top 5th percentile of applicants. Focus on collaborative innovation to increase your probability further."
                </p>
                <div className="mt-10 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[87%] h-full bg-gold shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <span className="text-gold text-[10px] font-bold">MATCH PROBABILITY</span>
                  <span className="text-gold text-[10px] font-bold">87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">THE METHODOLOGY</span>
          <h2 className="text-white font-serif-drama text-5xl md:text-7xl mb-8">Refined Precision.</h2>
          <div className="space-y-10">
            <div className="flex items-start space-x-6">
              <div className="text-gold font-mono-data text-2xl font-bold">01</div>
              <div>
                <h4 className="text-white font-bold text-xl mb-2 uppercase tracking-tight">Neural Calibration</h4>
                <p className="text-muted leading-relaxed">We map your target role's technical requirements against 50,000+ successful interview transcripts.</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="text-gold font-mono-data text-2xl font-bold">02</div>
              <div>
                <h4 className="text-white font-bold text-xl mb-2 uppercase tracking-tight">Iterative Refinement</h4>
                <p className="text-muted leading-relaxed">Each mock session adapts to your weaknesses, forcing growth in the areas that matter most.</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="text-gold font-mono-data text-2xl font-bold">03</div>
              <div>
                <h4 className="text-white font-bold text-xl mb-2 uppercase tracking-tight">Performance Audit</h4>
                <p className="text-muted leading-relaxed">Receive a detailed breakdown of your strengths, weaknesses, and improvement trajectory.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-deep border-t border-white/5 pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-8">
              <Zap className="w-8 h-8 text-gold fill-gold" />
              <span className="text-white font-bold text-2xl font-sans-clean">InterviewMate AI</span>
            </div>
            <p className="text-muted text-lg max-w-sm leading-relaxed mb-10 font-medium">
              Architecting the future of career intelligence. Precision mock interviews for elite performers.
            </p>
            <div className="flex items-center space-x-2 text-gold">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
              <span className="font-mono-data text-[10px] font-bold uppercase tracking-[0.2em]">Global Node Operational</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-8 uppercase tracking-widest">Architecture</h4>
            <ul className="space-y-4 text-muted text-sm font-medium">
              <li><a href="#features" className="hover:text-gold transition-colors">Capabilities</a></li>
              <li><a href="#protocol" className="hover:text-gold transition-colors">Methodology</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-8 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-muted text-sm font-medium">
              <li><a href="#" className="hover:text-gold transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-mono-data font-bold uppercase tracking-[0.2em]">
            © 2026 InterviewMate AI. All Rights Reserved.
          </p>
          <div className="flex space-x-10">
            {['Privacy', 'Terms', 'Security'].map(s => (
              <a key={s} href="#" className="text-white/20 hover:text-gold text-[10px] font-mono-data font-bold uppercase tracking-[0.2em] transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-deep overflow-x-hidden">
      <div className="noise-overlay"></div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Methodology />
        
        {/* Final CTA */}
        <section className="py-40 px-6">
          <div className="max-w-5xl mx-auto bg-surface border border-gold/10 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 blur-[80px] rounded-full"></div>
            <div className="relative z-10">
              <h2 className="text-white font-serif-drama text-5xl md:text-8xl mb-10 leading-tight">
                Refine Your <br /> <span className="text-gold italic font-black">Potential.</span>
              </h2>
              <p className="text-muted text-xl mb-14 max-w-md mx-auto font-medium">
                Join the elite network of engineers mastering their interview protocol.
              </p>
              <button className="btn-gold px-12 py-6 text-2xl shadow-gold/30">
                Start Mock Session
                <ArrowUpRight className="ml-3 w-7 h-7" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;