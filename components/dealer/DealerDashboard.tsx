
/**
 * MODULE: DEALER MARKETPLACE
 * SUB-MODULE: FINANCE ENGINE (Stripe Integration)
 * PRD: Módulo de Recarga de Créditos via Stripe
 * OBJETIVO: Permitir pagamentos seguros e automáticos.
 * COMPORTAMENTO:
 *  - Integração visual com Stripe Checkout.
 *  - Simulação de redirecionamento seguro.
 *  - Callback de sucesso com liberação imediata de créditos.
 */

import React, { useState } from 'react';
import { 
  Users, Search, Unlock, MapPin, Clock, ChevronRight, CheckCircle, 
  Zap, Globe, Navigation, X, Target, Plus, QrCode, CreditCard as CardIcon, 
  Briefcase, UserCheck, ShieldCheck, Lock, ArrowRight, Sparkles
} from 'lucide-react';
import { MOCK_LEADS, URGENCY_LABELS, COUNTRY_CODES, MOCK_DEALERS } from '../../constants';
import { Lead, Urgency } from '../../types';

const DealerDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [credits, setCredits] = useState(15);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [geoFilter, setGeoFilter] = useState<'all' | 'local'>('local');
  const [urgencyFilter, setUrgencyFilter] = useState<Urgency | 'all'>('all');
  
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState<'packages' | 'stripe-checkout' | 'success'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<{crd: number, price: number} | null>(null);

  const [isConfirmUnlockOpen, setIsConfirmUnlockOpen] = useState(false);
  const [leadToUnlock, setLeadToUnlock] = useState<Lead | null>(null);

  const currentDealer = MOCK_DEALERS[0];

  const triggerUnlockConfirmation = (lead: Lead) => {
    if (credits <= 0) {
      alert("Créditos insuficientes! Recarregue via Stripe.");
      return;
    }
    setLeadToUnlock(lead);
    setIsConfirmUnlockOpen(true);
  };

  const handleUnlock = () => {
    if (!leadToUnlock) return;
    setLeads(prev => prev.map(l => l.id === leadToUnlock.id ? {...l, status: 'unlocked' as const, unlockCount: l.unlockCount + 1} : l));
    setCredits(prev => prev - 1);
    setIsConfirmUnlockOpen(false);
    setLeadToUnlock(null);
  };

  const startStripeCheckout = () => {
    setPurchaseStep('stripe-checkout');
    // Simulando tempo de processamento do Stripe
    setTimeout(() => {
      setCredits(prev => prev + (selectedPackage?.crd || 0));
      setPurchaseStep('success');
    }, 2500);
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.brands.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         l.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = urgencyFilter === 'all' || l.urgency === urgencyFilter;
    let matchesGeo = true;
    if (geoFilter === 'local') {
      const isLocal = l.location.includes(currentDealer.region.split(' - ')[0]);
      matchesGeo = isLocal || l.acceptsRemoteProposals;
    }
    return matchesSearch && matchesUrgency && matchesGeo;
  });

  const PACKAGES = [
    { crd: 10, price: 99, tag: 'Starter' },
    { crd: 50, price: 399, tag: 'Popular', highlight: true },
    { crd: 150, price: 999, tag: 'Enterprise' },
  ];

  const dashboardInputClasses = "flex-grow bg-slate-900 border border-slate-800 rounded-2xl pl-14 pr-4 py-5 font-black text-white outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 shadow-inner";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-slate-200">
      {/* Modal de Confirmação de Desbloqueio */}
      {isConfirmUnlockOpen && leadToUnlock && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-slate-900 w-full max-w-md rounded-[3rem] border border-slate-800 shadow-2xl p-10 space-y-8 animate-in zoom-in">
            <div className="flex flex-col items-center text-center space-y-4">
               <div className="bg-indigo-600/10 p-5 rounded-3xl text-indigo-400 border border-indigo-500/20"><Unlock size={40} /></div>
               <h3 className="text-2xl font-black text-white tracking-tighter">Confirmar Desbloqueio</h3>
               <p className="text-slate-400 text-sm font-medium">Você utilizará <span className="text-white font-black">1 crédito</span>.</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex justify-between">
               <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase">Custo</span><span className="text-lg font-black text-white">1 Crd</span></div>
               <div className="flex flex-col items-end"><span className="text-[10px] text-slate-500 uppercase">Saldo</span><span className="text-lg font-black text-indigo-400">{credits} Crd</span></div>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={handleUnlock} className="bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase">Confirmar</button>
              <button onClick={() => setIsConfirmUnlockOpen(false)} className="py-4 text-slate-500 font-black uppercase text-[10px]">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Recarga Stripe */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
          <div className="bg-slate-900 w-full max-w-4xl rounded-[4rem] border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-10 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-4">
                 <div className="bg-[#635BFF] p-3 rounded-xl text-white"><CardIcon size={24}/></div>
                 <h3 className="text-2xl font-black text-white tracking-tighter">Stripe Checkout</h3>
              </div>
              <button onClick={() => setIsBuyModalOpen(false)} className="text-slate-500 hover:text-white"><X size={32}/></button>
            </div>

            <div className="p-12 overflow-y-auto max-h-[70vh]">
              {purchaseStep === 'packages' && (
                <div className="space-y-12 animate-in slide-in-from-bottom">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PACKAGES.map((pkg, idx) => (
                      <div key={idx} onClick={() => setSelectedPackage(pkg)} className={`p-8 rounded-[2.5rem] border-4 cursor-pointer transition-all flex flex-col items-center text-center ${selectedPackage?.crd === pkg.crd ? 'border-[#635BFF] bg-[#635BFF]/5 scale-105' : 'border-slate-800 hover:border-slate-700'}`}>
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-4">{pkg.tag}</p>
                        <p className="text-5xl font-black text-white mb-2">{pkg.crd}</p>
                        <p className="text-[10px] font-black text-[#635BFF] uppercase mb-8">Créditos</p>
                        <p className="text-2xl font-black text-white mt-auto">R$ {pkg.price}</p>
                      </div>
                    ))}
                  </div>
                  <button disabled={!selectedPackage} onClick={startStripeCheckout} className="w-full bg-[#635BFF] text-white py-6 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl disabled:opacity-20 transition-all">
                    Pagar com Stripe <ArrowRight size={24}/>
                  </button>
                  <div className="flex justify-center items-center gap-2 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} /> Secured by Stripe
                  </div>
                </div>
              )}

              {purchaseStep === 'stripe-checkout' && (
                <div className="py-20 flex flex-col items-center text-center space-y-10 animate-in fade-in">
                   <div className="w-20 h-20 border-4 border-[#635BFF]/20 border-t-[#635BFF] rounded-full animate-spin"></div>
                   <div className="space-y-4">
                      <h4 className="text-3xl font-black text-white">Processando Pagamento...</h4>
                      <p className="text-slate-500 font-medium max-w-xs">Estamos conectando com seu banco para autorizar a compra de {selectedPackage?.crd} créditos.</p>
                   </div>
                </div>
              )}

              {purchaseStep === 'success' && (
                <div className="py-20 flex flex-col items-center text-center space-y-8 animate-in zoom-in">
                   <div className="bg-emerald-500 p-8 rounded-[3rem] text-white shadow-2xl shadow-emerald-500/20"><CheckCircle size={80} /></div>
                   <h4 className="text-4xl font-black text-white tracking-tighter">Recarga Concluída!</h4>
                   <p className="text-slate-400 font-medium">Seus {selectedPackage?.crd} créditos foram adicionados à sua conta.</p>
                   <button onClick={() => { setIsBuyModalOpen(false); setPurchaseStep('packages'); }} className="bg-white text-slate-950 px-16 py-5 rounded-[1.5rem] font-black text-lg uppercase shadow-xl">Continuar para o Radar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header Dealer */}
      <div className="bg-slate-900 border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-10 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tighter">Marketplace de Leads</h1>
            <div className="flex items-center gap-3 text-slate-400 font-bold"><MapPin size={16} /> <span className="text-sm uppercase">{currentDealer.region}</span></div>
          </div>
          <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-slate-800 flex items-center gap-6">
            <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-xl shadow-indigo-600/20"><Zap size={24} /></div>
            <div><p className="text-[10px] font-black uppercase text-slate-500 leading-none mb-1">Saldo</p><p className="text-3xl font-black text-white">{credits} <span className="text-indigo-400 text-sm font-black">Crd</span></p></div>
            <button onClick={() => setIsBuyModalOpen(true)} className="bg-[#635BFF] text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase shadow-lg flex items-center gap-2 hover:scale-105 transition-all"><Plus size={16}/> Comprar</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="flex gap-6">
            <div className="relative flex-grow group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
              <input type="text" placeholder="Pesquisar estoque..." className={dashboardInputClasses} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            </div>
            <div className="flex bg-slate-900 p-2 rounded-[1.5rem] border border-slate-800">
              <button onClick={() => setGeoFilter('local')} className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase ${geoFilter === 'local' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500'}`}>Local</button>
              <button onClick={() => setGeoFilter('all')} className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase ${geoFilter === 'all' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500'}`}>Nacional</button>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredLeads.map(lead => (
              <div key={lead.id} onClick={() => setSelectedLead(lead)} className={`bg-slate-900 p-8 rounded-[3rem] border-2 transition-all cursor-pointer ${selectedLead?.id === lead.id ? 'border-indigo-500 shadow-2xl scale-[1.01]' : 'border-slate-800 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {lead.status === 'unlocked' ? <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase">Em negociação</div> : <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase">Lead Novo</div>}
                      <h3 className="text-2xl font-black text-white">{lead.brands[0]} {lead.models[0]}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-500">
                      <span className="text-indigo-400 font-black"><MapPin size={12} className="inline mr-1"/> {lead.location}</span>
                      <span className="font-black"><Users size={12} className="inline mr-1"/> {lead.unlockCount} revendas</span>
                    </div>
                  </div>
                  <div className="text-xl">{COUNTRY_CODES.find(c => lead.buyerWhatsApp.startsWith(c.code))?.flag}</div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-slate-800/50">
                   <div><p className="text-[10px] text-slate-600 uppercase mb-1">Budget</p><p className="font-black text-indigo-400 text-2xl">R$ {lead.priceMax.toLocaleString()}</p></div>
                   <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-600"><ChevronRight size={24} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-[3.5rem] border border-slate-800 sticky top-28 overflow-hidden min-h-[600px] flex flex-col">
            {selectedLead ? (
              <div className="flex flex-col flex-grow animate-in slide-in-from-right">
                <div className="bg-indigo-600 p-10 text-white"><h3 className="text-3xl font-black tracking-tighter">Detalhes do Lead</h3><p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest">AMX-{selectedLead.id}</p></div>
                <div className="p-10 space-y-10 flex-grow">
                  <div className="space-y-6 border-b border-slate-800/50 pb-5">
                    <div className="flex justify-between text-xs uppercase font-black"><span className="text-slate-500">Procedência</span><span className="text-white">{selectedLead.location}</span></div>
                    <div className="flex justify-between text-xs uppercase font-black"><span className="text-slate-500">Fila Match</span><span className="text-indigo-400">{selectedLead.unlockCount} lojistas</span></div>
                  </div>
                  {selectedLead.status === 'new' ? (
                    <div className="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 text-center space-y-8 shadow-inner">
                       <Unlock size={32} className="mx-auto text-indigo-400" />
                       <h4 className="font-black text-white text-xl">Contato Blindado</h4>
                       <button onClick={() => triggerUnlockConfirmation(selectedLead)} className="w-full bg-white text-slate-950 py-6 rounded-[1.5rem] font-black text-lg shadow-2xl hover:brightness-90 transition-all">Gastar 1 Crédito</button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="bg-emerald-500/10 p-8 rounded-[2rem] border border-emerald-500/20 flex items-center gap-5 shadow-lg"><div className="bg-emerald-500 p-3 rounded-2xl text-white shadow-xl shadow-emerald-500/20"><UserCheck size={24} /></div><div><h4 className="font-black text-white">Negociação Ativa</h4></div></div>
                      <div className="space-y-5">
                        <div className="p-8 bg-slate-950 rounded-[2rem] border border-slate-800"><p className="text-[10px] text-slate-600 uppercase mb-2">Comprador</p><p className="font-black text-white text-2xl tracking-tighter">{selectedLead.buyerName}</p></div>
                        <a href={`https://wa.me/${selectedLead.buyerWhatsApp}`} target="_blank" className="w-full bg-[#25D366] text-white p-6 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-green-500/20 hover:scale-[1.02] transition-all"><Zap size={24} /> WhatsApp Direto</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-16 text-center space-y-10 opacity-50"><Target size={56} className="text-slate-800" /><h3 className="text-2xl font-black uppercase tracking-widest">Radar Inativo</h3><p className="text-sm font-medium">Selecione um lead para ver detalhes.</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;
