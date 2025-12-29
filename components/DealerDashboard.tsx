
import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Search, 
  Filter, 
  Unlock, 
  MapPin, 
  Clock, 
  ChevronRight,
  CheckCircle,
  Zap,
  TrendingUp,
  Briefcase,
  Globe,
  Navigation,
  X,
  Target
} from 'lucide-react';
import { MOCK_LEADS, URGENCY_LABELS, COUNTRY_CODES, MOCK_DEALERS } from '../constants';
import { Lead, Dealership, Urgency } from '../types';

const DealerDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [credits, setCredits] = useState(15);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [geoFilter, setGeoFilter] = useState<'all' | 'local'>('local');
  const [urgencyFilter, setUrgencyFilter] = useState<Urgency | 'all'>('all');
  
  const currentDealer = MOCK_DEALERS[0];

  const handleUnlock = (leadId: string) => {
    if (credits <= 0) {
      alert("Créditos insuficientes! Recarregue sua conta.");
      return;
    }

    setLeads(prev => prev.map(l => l.id === leadId ? {...l, status: 'unlocked' as const} : l));
    setCredits(prev => prev - 1);
    
    const updatedLead = leads.find(l => l.id === leadId);
    if (updatedLead) setSelectedLead({...updatedLead, status: 'unlocked'});
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.brands.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         l.models.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         l.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUrgency = urgencyFilter === 'all' || l.urgency === urgencyFilter;

    let matchesGeo = true;
    if (geoFilter === 'local') {
      const isLocal = l.location.includes(currentDealer.region.split(' - ')[0]);
      matchesGeo = isLocal || l.acceptsRemoteProposals;
    }

    return matchesSearch && matchesUrgency && matchesGeo;
  });

  const dashboardInputClasses = "flex-grow bg-slate-900 border border-slate-800 rounded-2xl pl-14 pr-4 py-5 font-black text-white outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner";
  const urgencyTitleClasses = "text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 block";

  const URGENCY_OPTIONS: { id: Urgency; label: string }[] = [
    { id: 'urgent', label: 'Imediata (Urgente)' },
    { id: '15days', label: 'Em até 15 dias' },
    { id: '30days', label: 'Em até 30 dias' },
    { id: 'anytime', label: 'Sem pressa' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-slate-200">
      <div className="bg-slate-900 border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-white tracking-tighter">Marketplace de Leads</h1>
              <div className="flex items-center gap-3 text-slate-400 font-bold">
                <div className="bg-indigo-600/10 p-1.5 rounded-lg border border-indigo-500/20 text-indigo-400">
                   <MapPin size={16} />
                </div>
                <span className="text-sm uppercase tracking-widest">{currentDealer.region}</span>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-slate-800 shadow-2xl flex items-center gap-6 group hover:border-indigo-500 transition-all">
                <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 leading-none mb-1.5">Saldo Disponível</p>
                  <p className="text-3xl font-black text-white leading-none">{credits} <span className="text-indigo-400 text-sm">Crd</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <div className="animate-in fade-in slide-in-from-top duration-700">
              <div className="flex justify-between items-center mb-6">
                <span className={urgencyTitleClasses}>Nível de Urgência</span>
                {urgencyFilter !== 'all' && (
                  <button 
                    onClick={() => setUrgencyFilter('all')}
                    className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-white flex items-center gap-2"
                  >
                    <X size={14} /> Resetar
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {URGENCY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setUrgencyFilter(opt.id)}
                    className={`p-8 rounded-[2.5rem] border-2 text-sm font-black transition-all flex items-center justify-center text-center shadow-lg uppercase tracking-widest ${
                      urgencyFilter === opt.id 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-indigo-600/20 scale-[1.02]' 
                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative flex-grow group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Pesquisar estoque ou cidade..."
                  className={dashboardInputClasses}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex bg-slate-900 p-2 rounded-[1.5rem] border border-slate-800 shadow-xl">
                <button 
                  onClick={() => setGeoFilter('local')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${geoFilter === 'local' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
                >
                  <Navigation size={14} /> Local
                </button>
                <button 
                  onClick={() => setGeoFilter('all')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${geoFilter === 'all' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
                >
                  <Globe size={14} /> Nacional
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {filteredLeads.map(lead => (
                <div 
                  key={lead.id} 
                  onClick={() => setSelectedLead(lead)}
                  className={`group bg-slate-900 p-8 rounded-[3rem] border-2 transition-all cursor-pointer hover:shadow-2xl hover:bg-slate-850 ${
                    selectedLead?.id === lead.id ? 'border-indigo-500 shadow-indigo-600/10 shadow-2xl scale-[1.01]' : 'border-slate-800 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        {lead.status === 'unlocked' && <CheckCircle size={20} className="text-emerald-400" />}
                        <h3 className="text-2xl font-black text-white leading-tight tracking-tight">
                          {lead.brands[0]} {lead.models[0]}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4">
                         <p className="text-[10px] font-black text-indigo-400 flex items-center gap-2 bg-indigo-600/10 px-4 py-1.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                           <MapPin size={12} /> {lead.location}
                         </p>
                         <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-widest">
                           <Clock size={12} /> {new Date(lead.createdAt).toLocaleDateString()}
                         </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                       <div className="flex items-center gap-2">
                         <span className="text-xl filter drop-shadow-md">{COUNTRY_CODES.find(c => lead.buyerWhatsApp.startsWith(c.code))?.flag}</span>
                         <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] border ${
                          lead.urgency === 'urgent' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {URGENCY_LABELS[lead.urgency]}
                        </div>
                       </div>
                       {lead.acceptsRemoteProposals && (
                         <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 uppercase tracking-widest">Aceita Remoto</span>
                       )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-6 border-t border-slate-800/50">
                    <div>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Ano Desejado</p>
                      <p className="font-black text-white text-lg tracking-tighter">{lead.yearMin} <span className="text-slate-700 text-sm">—</span> {lead.yearMax}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Budget Máximo</p>
                      <p className="font-black text-indigo-400 text-2xl tracking-tighter leading-none">R$ {lead.priceMax.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <div className="bg-slate-950 p-4 rounded-2xl text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl transition-all border border-slate-800">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredLeads.length === 0 && (
                <div className="bg-slate-900 p-24 rounded-[4rem] text-center border-2 border-dashed border-slate-800">
                  <div className="bg-slate-950 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-800">
                     <Target size={40} className="text-slate-700" />
                  </div>
                  <p className="text-slate-500 font-bold mb-6">Nenhuma intenção corresponde aos seus critérios.</p>
                  <button onClick={() => {setUrgencyFilter('all'); setSearchTerm(''); setGeoFilter('all')}} className="text-indigo-400 font-black text-xs uppercase tracking-[0.2em] border-b-2 border-indigo-400 pb-1">Limpar Filtros</button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[3.5rem] shadow-2xl border border-slate-800 sticky top-28 overflow-hidden min-h-[600px] flex flex-col">
              {selectedLead ? (
                <div className="animate-in fade-in slide-in-from-right duration-500 flex flex-col flex-grow">
                  <div className="bg-indigo-600 p-10 text-white relative">
                    <Zap className="absolute top-8 right-8 opacity-10" size={80} />
                    <h3 className="text-3xl font-black mb-1 tracking-tighter">Detalhes do Lead</h3>
                    <p className="text-indigo-200 text-[10px] font-black tracking-[0.2em] uppercase">Protocolo AMX-{selectedLead.id}</p>
                  </div>
                  
                  <div className="p-10 space-y-10 flex-grow">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-5 border-b border-slate-800/50">
                        <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Procedência</span>
                        <span className="font-black text-white uppercase tracking-tight">{selectedLead.location}</span>
                      </div>
                      <div className="flex items-center justify-between pb-5 border-b border-slate-800/50">
                        <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Escopo Regional</span>
                        <span className={`font-black uppercase tracking-tight ${selectedLead.acceptsRemoteProposals ? 'text-emerald-400' : 'text-red-400'}`}>
                          {selectedLead.acceptsRemoteProposals ? 'Habilitado' : 'Restrito'}
                        </span>
                      </div>
                    </div>

                    {selectedLead.status === 'new' ? (
                      <div className="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 space-y-8 text-center shadow-inner mt-4">
                        <div className="w-20 h-20 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20">
                           <Unlock size={32} className="text-indigo-400" />
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-black text-white text-xl tracking-tight">Contato Blindado</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
                            Desbloqueie agora para falar com <strong>{selectedLead.buyerName.split(' ')[0]}</strong> via WhatsApp oficial.
                          </p>
                        </div>
                        <button 
                          onClick={() => handleUnlock(selectedLead.id)}
                          className="w-full bg-white text-slate-950 py-6 rounded-[1.5rem] font-black text-lg shadow-2xl hover:bg-slate-200 hover:-translate-y-1 transition-all"
                        >
                          Gastar 1 Crédito
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-8 animate-in zoom-in duration-300">
                        <div className="bg-emerald-500/10 p-8 rounded-[2rem] border border-emerald-500/20 flex items-center gap-5 shadow-lg shadow-emerald-500/5">
                          <div className="bg-emerald-500 p-3 rounded-2xl text-white"><CheckCircle size={24} /></div>
                          <div>
                            <h4 className="font-black text-white text-lg leading-none">Acesso Autorizado</h4>
                            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-1.5">Match Regional Confirmado</p>
                          </div>
                        </div>

                        <div className="space-y-5">
                          <div className="p-8 bg-slate-950 rounded-[2rem] border border-slate-800">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Comprador Identificado</p>
                            <p className="font-black text-white text-2xl tracking-tighter leading-none">{selectedLead.buyerName}</p>
                            <p className="text-slate-500 text-xs font-bold mt-2">{selectedLead.buyerEmail}</p>
                          </div>
                          
                          <a 
                            href={`https://wa.me/${selectedLead.buyerWhatsApp}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="w-full bg-[#25D366] text-white p-6 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-green-500/20 hover:scale-[1.02] transition-all"
                          >
                            <Zap size={24} /> WhatsApp Direto
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center p-16 text-center space-y-10">
                  <div className="bg-slate-950 w-32 h-32 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-inner group">
                    <Target size={56} className="text-slate-800 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Radar de Oportunidades</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed px-6">Selecione uma intenção de compra à esquerda para analisar o perfil do lead e liberar o contato.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full opacity-30 grayscale">
                    <div className="h-2 bg-slate-800 rounded-full"></div>
                    <div className="h-2 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;
