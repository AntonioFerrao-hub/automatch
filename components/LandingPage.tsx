
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight,
  Car,
  MessageSquare,
  Zap,
  Globe
} from 'lucide-react';
import { useLanguage } from '../App';

const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-52">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 bg-slate-900 text-indigo-400 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border border-slate-800 shadow-xl">
                <Zap size={14} className="fill-indigo-400" />
                <span>{t.hero.tag}</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter">
                {t.hero.title1} <br />
                <span className="text-indigo-500">{t.hero.title2}</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/cadastrar" className="group flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-[2rem] text-lg font-black hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30 hover:-translate-y-1">
                  {t.hero.cta_buy}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/dealer/login" className="flex items-center justify-center gap-2 bg-slate-900 text-white border border-slate-800 px-10 py-5 rounded-[2rem] text-lg font-black hover:bg-slate-800 transition-all shadow-lg">
                  {t.hero.cta_dealer}
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-slate-950 ring-2 ring-slate-800 shadow-xl" 
                      src={`https://picsum.photos/100?random=${i+10}`} 
                      alt="User avatar" 
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-black text-white">+12k Users</p>
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-0.5">Active this week</p>
                </div>
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right duration-1000">
              <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[3rem] blur-2xl"></div>
              <div className="relative bg-slate-900 p-2 rounded-[3rem] border border-slate-800 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop" 
                  alt="High performance car" 
                  className="rounded-[2.5rem] object-cover h-[550px] w-full brightness-75 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl max-w-xs border border-slate-800 animate-bounce-slow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/20">
                    <CheckCircle size={20} />
                  </div>
                  <span className="font-black text-white text-sm uppercase tracking-widest">Match VIP</span>
                </div>
                <p className="text-sm text-slate-300 font-medium leading-relaxed italic">"Economizei 4 dias de busca e recebi o carro na porta de casa. Experiência incrível!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
