
/**
 * MODULE: BUYER ENGINE - CONFIRMATION
 * PRD: Página de Confirmação de Lead
 * OBJETIVO: Fornecer feedback positivo ao usuário após a submissão do formulário.
 * COMPORTAMENTO: 
 *  - Exibe mensagem de sucesso visual.
 *  - Lista os próximos passos do processo AutoMatch para alinhar expectativas.
 * VÍNCULOS: Chamado após o sucesso no BuyerForm.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Sparkles, Zap } from 'lucide-react';

const ConfirmationPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900 rounded-[4rem] shadow-2xl overflow-hidden border border-slate-800 p-16 text-center space-y-12 animate-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[60px] opacity-20 animate-pulse"></div>
            <div className="relative bg-slate-950 p-10 rounded-[2.5rem] text-emerald-400 border-4 border-slate-900 shadow-2xl">
              <CheckCircle size={80} strokeWidth={2.5} />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-5xl font-black text-white tracking-tighter">Desejo Registrado!</h2>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            Sua intenção de compra foi enviada para o radar das revendas. Agora, os melhores profissionais entrarão em contato com você.
          </p>
        </div>

        <div className="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 flex flex-col gap-6 text-left relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 bg-indigo-600/5 w-40 h-40 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-3 font-black text-indigo-400 uppercase tracking-[0.2em] text-xs">
            <Sparkles size={18} />
            <span>Próximas Etapas</span>
          </div>
          <ul className="space-y-6 text-sm">
            <li className="flex gap-5">
              <span className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-black text-xs shrink-0 border border-indigo-500/20">1</span>
              <span className="text-slate-300 font-bold leading-relaxed pt-1">Filtramos as revendas que possuem exatamente o perfil que você busca.</span>
            </li>
            <li className="flex gap-5">
              <span className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-black text-xs shrink-0 border border-indigo-500/20">2</span>
              <span className="text-slate-300 font-bold leading-relaxed pt-1">Os vendedores especializados desbloqueiam seu contato para iniciar a oferta.</span>
            </li>
            <li className="flex gap-5">
              <span className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-black text-xs shrink-0 border border-indigo-500/20">3</span>
              <span className="text-slate-300 font-bold leading-relaxed pt-1">Você recebe as melhores propostas via WhatsApp e escolhe a ideal.</span>
            </li>
          </ul>
        </div>

        <div className="pt-8 space-y-6">
          <Link to="/" className="group block w-full bg-indigo-600 text-white py-6 rounded-[1.5rem] font-black text-xl hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/20 hover:-translate-y-1">
            Retornar ao Radar
          </Link>
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-black uppercase tracking-widest">
            <Zap size={14} className="fill-slate-600" />
            <span>Processamento em Tempo Real Ativo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
