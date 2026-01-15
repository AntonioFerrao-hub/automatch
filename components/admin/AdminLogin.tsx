
/**
 * MODULE: ADMIN CORE - AUTH
 * PRD: Acesso Super Admin
 * OBJETIVO: Proteção do núcleo de dados e configurações globais.
 * COMPORTAMENTO: 
 *  - Design diferenciado em tons de vermelho (Sistema Crítico).
 *  - Monitoramento simulado de tentativas de acesso.
 * VÍNCULOS: Redireciona para o AdminDashboard.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, User, ArrowRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/admin/dashboard');
      setLoading(false);
    }, 1000);
  };

  const adminInputClasses = "block w-full pl-14 pr-4 py-5 bg-slate-950 border border-slate-800 rounded-3xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500/50 outline-none transition-all font-black text-white shadow-inner placeholder:text-slate-800";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-in zoom-in duration-500">
        <div className="bg-slate-900 rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-800">
          <div className="bg-red-600 p-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 bg-white/20 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-2xl">
              <ShieldAlert size={48} />
            </div>
            <h2 className="relative z-10 text-4xl font-black mb-1 tracking-tighter">System Core</h2>
            <p className="relative z-10 text-red-100 text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Super Admin Clearance Only</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-12 space-y-8">
            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-700 group-focus-within:text-red-500 transition-colors"><User size={24} /></div>
                <input type="text" required defaultValue="admin_master" className={adminInputClasses} placeholder="Access ID"/>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-700 group-focus-within:text-red-500 transition-colors"><Lock size={24} /></div>
                <input type="password" required defaultValue="admin123" className={adminInputClasses} placeholder="Passphrase"/>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-white text-slate-950 py-6 rounded-[1.5rem] font-black text-xl hover:brightness-90 transition-all shadow-2xl flex items-center justify-center gap-3 uppercase tracking-tight">
              {loading ? <div className="w-7 h-7 border-3 border-slate-950/20 border-t-slate-950 rounded-full animate-spin"></div> : <>Initialize System <ArrowRight size={24} /></>}
            </button>
            <p className="text-center text-[9px] text-slate-700 font-black uppercase tracking-widest leading-relaxed">
              Unauthorized access attempts are monitored and recorded. System Protocol 42-A active.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
