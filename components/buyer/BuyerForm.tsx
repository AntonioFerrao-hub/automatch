
/**
 * MODULE: BUYER ENGINE
 * PRD: Módulo de Captação de Leads
 * OBJETIVO: Coletar dados de intenção de compra de forma rápida e precisa.
 * COMPORTAMENTO: 
 *  - Step 1: Filtro de Marca/Modelo (Múltipla escolha).
 *  - Step 2: Specs e Urgência.
 *  - Step 3: Contato e Localização com Geo-Reverse-Coding.
 * VÍNCULOS: Alimenta o MOCK_LEADS e gera o estado visual para o DealerDashboard.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  Car, 
  Settings, 
  User, 
  CheckCircle,
  Plus,
  MapPin,
  Navigation
} from 'lucide-react';
import { CAR_BRANDS, CAR_MODELS_BY_BRAND, URGENCY_LABELS, COUNTRY_CODES } from '../../constants';

const BuyerForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLocating, setIsLocating] = useState(false);
  const [customBrandInput, setCustomBrandInput] = useState("");
  const [customModelInput, setCustomModelInput] = useState("");
  const [formData, setFormData] = useState({
    brands: [] as string[],
    models: [] as string[],
    yearMin: 2018,
    yearMax: 2025,
    kmMax: 100000,
    priceMin: 30000,
    priceMax: 150000,
    urgency: '15days',
    name: '',
    email: '',
    ddi: '+55',
    whatsapp: '',
    location: '',
    acceptsRemoteProposals: true
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
          );
          const data = await response.json();
          const city = data.address.city || data.address.town || data.address.village || data.address.suburb || "Cidade Desconhecida";
          const state = data.address.state || "";
          setFormData(prev => ({ ...prev, location: `${city} - ${state}` }));
        } catch (error) {
          console.error("Erro ao obter localidade:", error);
          alert("Erro ao determinar localização.");
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        alert("Permissão de localização negada.");
      }
    );
  };

  const toggleBrand = (brand: string) => {
    setFormData(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand]
    }));
  };

  const addCustomBrand = () => {
    if (customBrandInput.trim() && !formData.brands.includes(customBrandInput.trim())) {
      setFormData(prev => ({ ...prev, brands: [...prev.brands, customBrandInput.trim()] }));
      setCustomBrandInput("");
    }
  };

  const toggleModel = (model: string) => {
    setFormData(prev => ({
      ...prev,
      models: prev.models.includes(model) ? prev.models.filter(m => m !== model) : [...prev.models, model]
    }));
  };

  const addCustomModel = () => {
    if (customModelInput.trim() && !formData.models.includes(customModelInput.trim())) {
      setFormData(prev => ({ ...prev, models: [...prev.models, customModelInput.trim()] }));
      setCustomModelInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/confirmation');
  };

  const availableModels = formData.brands.flatMap(brand => CAR_MODELS_BY_BRAND[brand] || []);
  const inputClasses = "w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 font-bold text-white outline-none focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner shadow-black/10";
  const labelClasses = "block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3";

  return (
    <div className="bg-slate-950 min-h-[calc(100vh-80px)] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 p-12 text-white relative">
            <Car className="absolute -right-6 -bottom-6 opacity-10 rotate-12" size={180} />
            <h2 className="text-4xl font-black mb-3 tracking-tighter">Inicie seu Match</h2>
            <p className="text-indigo-100 font-bold opacity-80 max-w-md">Conte-nos sobre seu próximo carro.</p>
          </div>
          <div className="p-10 md:p-16">
            <div className="flex items-center justify-between mb-16 px-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all border-2 ${step >= i ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/30 rotate-3' : 'bg-slate-950 text-slate-700 border-slate-800'}`}>{i}</div>
                  {i < 3 && <div className={`h-1 flex-grow mx-4 rounded-full ${step > i ? 'bg-indigo-600' : 'bg-slate-800'}`} />}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right duration-500 space-y-12">
                   <div>
                    <label className={labelClasses}>Marcas</label>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {CAR_BRANDS.map(brand => (
                        <button key={brand} type="button" onClick={() => toggleBrand(brand)} className={`px-6 py-3.5 rounded-2xl border-2 text-sm font-black transition-all ${formData.brands.includes(brand) ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20 scale-105' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-indigo-500 hover:text-white'}`}>{brand}</button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <input type="text" placeholder="Outra marca..." className={inputClasses} value={customBrandInput} onChange={e => setCustomBrandInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addCustomBrand())}/>
                      <button type="button" onClick={addCustomBrand} className="bg-white text-slate-950 px-8 rounded-2xl font-black shadow-lg"><Plus size={24} /></button>
                    </div>
                  </div>
                  <div className="p-10 bg-slate-950/50 rounded-[3rem] border-2 border-slate-800 border-dashed">
                    <label className={labelClasses}>Modelos</label>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {availableModels.map(model => (
                        <button key={model} type="button" onClick={() => toggleModel(model)} className={`px-5 py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${formData.models.includes(model) ? 'bg-white border-white text-slate-950 shadow-xl' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white hover:border-slate-700'}`}>{model}</button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <input type="text" placeholder="Modelo específico..." className={inputClasses} value={customModelInput} onChange={e => setCustomModelInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addCustomModel())}/>
                      <button type="button" onClick={addCustomModel} className="bg-indigo-600 text-white px-8 rounded-2xl font-black shadow-indigo-600/20 shadow-xl"><Plus size={24} /></button>
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right duration-500 space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <label className={labelClasses}>Ano de Interesse</label>
                      <div className="flex items-center gap-6">
                        <input type="number" value={formData.yearMin} onChange={e => setFormData({...formData, yearMin: parseInt(e.target.value)})} className={inputClasses} placeholder="Min"/>
                        <span className="text-slate-600 font-black">/</span>
                        <input type="number" value={formData.yearMax} onChange={e => setFormData({...formData, yearMax: parseInt(e.target.value)})} className={inputClasses} placeholder="Max"/>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-8">
                      <label className={labelClasses}>Qual sua Urgência?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(URGENCY_LABELS).map(([key, label]) => (
                          <button key={key} type="button" onClick={() => setFormData({...formData, urgency: key})} className={`p-7 rounded-[2.5rem] border-2 text-sm font-black transition-all ${formData.urgency === key ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl scale-105' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>{label}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right duration-500 space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="md:col-span-2">
                      <label className={labelClasses}>Seu Nome</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClasses} placeholder="Como devemos te chamar?"/>
                    </div>
                    <div className="md:col-span-1">
                      <label className={labelClasses}>Localidade</label>
                      <div className="relative group">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" size={20} />
                        <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className={`${inputClasses} pl-14 pr-32`} placeholder="Cidade - UF"/>
                        <button type="button" onClick={handleDetectLocation} disabled={isLocating} className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-800 hover:bg-slate-700 text-indigo-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-700 transition-all flex items-center gap-2">
                          {isLocating ? <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" /> : <Navigation size={12} />}
                          Detectar
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end md:col-span-1">
                       <label className={labelClasses}>Busca Regional</label>
                       <button type="button" onClick={() => setFormData({...formData, acceptsRemoteProposals: !formData.acceptsRemoteProposals})} className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] border-2 font-black text-xs transition-all ${formData.acceptsRemoteProposals ? 'bg-indigo-600/10 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                         <div className={`w-12 h-7 rounded-full relative ${formData.acceptsRemoteProposals ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                           <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${formData.acceptsRemoteProposals ? 'right-1' : 'left-1'}`} />
                         </div>
                         <span className="uppercase tracking-widest">{formData.acceptsRemoteProposals ? 'Ofertas Globais' : 'Apenas Local'}</span>
                       </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center mt-20 pt-10 border-t border-slate-800">
                {step > 1 ? <button type="button" onClick={prevStep} className="flex items-center gap-3 text-slate-500 font-black uppercase tracking-[0.2em] text-xs hover:text-white px-8 py-4"><ChevronLeft size={20} /> Voltar</button> : <div />}
                {step < 3 ? <button type="button" onClick={nextStep} disabled={step === 1 && formData.brands.length === 0} className="bg-indigo-600 text-white px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-[0.15em] shadow-2xl hover:bg-indigo-500 hover:-translate-y-1 transition-all disabled:opacity-30">Próximo <ChevronRight size={20} /></button> : <button type="submit" className="bg-white text-slate-950 px-14 py-6 rounded-3xl font-black text-lg uppercase tracking-tight shadow-2xl hover:-translate-y-1 transition-all">Finalizar Cadastro <CheckCircle size={22} /></button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerForm;
