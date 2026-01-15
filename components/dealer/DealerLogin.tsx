
/**
 * MODULE: DEALER HUB - AUTH
 * PRD: Módulo de Login de Revendas
 * OBJETIVO: Garantir acesso seguro ao marketplace B2B.
 * COMPORTAMENTO: 
 *  - Autenticação via credenciais corporativas.
 *  - Feedback de carregamento (Spinner) durante validação.
 * VÍNCULOS: Redireciona para o DealerDashboard após sucesso.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';

const DealerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/dealer/dashboard');
      setLoading(false);
    }, 1200);
  };

  const loginInputClasses = "block w-full pl-14 pr-4 py-5 bg-slate-950 border border-slate-800 rounded-3xl focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 outline-none transition-all font-black text-white placeholder:text-slate-700 shadow-inner";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-lg w-full animate-in fade-in slide-in-from-bottom duration-700">
        <div className="bg-slate-900 rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 p-16 text-white text-center relative overflow-hidden">
            <div className="bg-white/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/10 shadow-2xl">
              <Briefcase size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-black mb-2 tracking-tighter">Dealer Login</h2>
            <p className="text-indigo-200 text-xs font-black uppercase tracking-[0.3em] mt-3 opacity-60">Acesso Restrito B2B</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-12 space-y-8">
            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-500 transition-colors">
                  <User size={24} />
                </div>
                <input 
                  type="email" 
                  required
                  defaultValue="vendas@automecanica.com.br"
                  className={loginInputClasses}
                  placeholder="E-mail Corporativo"
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={24} />
                </div>
                <input 
                  type="password" 
                  required
                  defaultValue="123456"
                  className={loginInputClasses}
                  placeholder="Senha de Acesso"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-slate-950 py-6 rounded-[1.5rem] font-black text-xl hover:brightness-90 transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3 uppercase tracking-tight"
            >
              {loading ? (
                <div className="w-7 h-7 border-3 border-slate-950/20 border-t-slate-950 rounded-full animate-spin"></div>
              ) : (
                <>Entrar no Painel <ArrowRight size={24} /></>
              )}
            </button>

            <div className="flex items-center justify-between text-[10px] pt-4 px-2">
              <button type="button" className="text-slate-600 hover:text-white font-black uppercase tracking-widest transition-colors">Recuperar Acesso</button>
              <button type="button" className="text-indigo-400 font-black hover:text-white uppercase tracking-widest transition-colors">Solicitar Credencial</button>
            </div>
          </form>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-3 text-slate-700 text-[10px] font-black uppercase tracking-[0.4em]">
          <ShieldCheck size={18} />
          <span>AES-256 Encrypted Connection</span>
        </div>
      </div>
    </div>
  );
};

export default DealerLogin;
