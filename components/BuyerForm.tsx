
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
  Tag
} from 'lucide-react';
import { CAR_BRANDS, CAR_MODELS_BY_BRAND, URGENCY_LABELS, COUNTRY_CODES } from '../constants';

const BuyerForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

  const toggleBrand = (brand: string) => {
    setFormData(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const addCustomBrand = () => {
    if (customBrandInput.trim() && !formData.brands.includes(customBrandInput.trim())) {
      setFormData(prev => ({
        ...prev,
        brands: [...prev.brands, customBrandInput.trim()]
      }));
      setCustomBrandInput("");
    }
  };

  const addCustomModel = () => {
    if (customModelInput.trim() && !formData.models.includes(customModelInput.trim())) {
      setFormData(prev => ({
        ...prev,
        models: [...prev.models, customModelInput.trim()]
      }));
      setCustomModelInput("");
    }
  };

  const toggleModel = (model: string) => {
    setFormData(prev => ({
      ...prev,
      models: prev.models.includes(model) 
        ? prev.models.filter(m => m !== model)
        : [...prev.models, model]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/confirmation');
  };

  const availableModels = formData.brands.flatMap(brand => CAR_MODELS_BY_BRAND[brand] || []);
  const selectedCountry = COUNTRY_CODES.find(c => c.code === formData.ddi);

  const inputClasses = "w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 font-bold text-white outline-none focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner shadow-black/10";
  const labelClasses = "block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3";

  return (
    <div className="bg-slate-950 min-h-[calc(100vh-80px)] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 p-12 text-white relative overflow-hidden">
            <Car className="absolute -right-6 -bottom-6 opacity-10 rotate-12" size={180} />
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-3 tracking-tighter">Inicie seu Match</h2>
              <p className="text-indigo-100 font-bold opacity-80 max-w-md">Conte-nos sobre seu próximo carro e deixe que as revendas façam o trabalho pesado.</p>
            </div>
          </div>
          
          <div className="p-10 md:p-16">
            <div className="flex items-center justify-between mb-16 px-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all border-2 ${
                    step >= i ? 'bg-indigo-600 text-white border-indigo-500 shadow-xl shadow-indigo-600/30 rotate-3' : 'bg-slate-950 text-slate-700 border-slate-800'
                  }`}>{i}</div>
                  {i < 3 && <div className={`h-1 flex-grow mx-4 rounded-full ${step > i ? 'bg-indigo-600' : 'bg-slate-800'}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="min-h-[450px]">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right duration-500 space-y-12">
                  <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
                    <div className="bg-indigo-600/10 p-3 rounded-2xl text-indigo-400 border border-indigo-500/20"><Car size={28} /></div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Preferência de Marca</h3>
                  </div>
                  
                  <div className="space-y-10">
                    <div>
                      <label className={labelClasses}>Selecione as Marcas</label>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {CAR_BRANDS.map(brand => (
                          <button key={brand} type="button" onClick={() => toggleBrand(brand)}
                            className={`px-6 py-3.5 rounded-2xl border-2 text-sm font-black transition-all ${
                              formData.brands.includes(brand) 
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20 scale-105' 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-indigo-500 hover:text-white'
                            }`}>{brand}</button>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          placeholder="Digite outra marca..." 
                          className={inputClasses}
                          value={customBrandInput}
                          onChange={e => setCustomBrandInput(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addCustomBrand())}
                        />
                        <button type="button" onClick={addCustomBrand} className="bg-white text-slate-950 px-8 rounded-2xl font-black text-sm hover:brightness-90 transition-all shadow-lg">
                          <Plus size={24} />
                        </button>
                      </div>
                    </div>

                    <div className="p-10 bg-slate-950/50 rounded-[3rem] border-2 border-slate-800 border-dashed space-y-10">
                      <div>
                        <label className={labelClasses}>Selecione ou Adicione Modelos</label>
                        <div className="flex flex-wrap gap-3 mb-8">
                          {availableModels.map(model => (
                            <button key={model} type="button" onClick={() => toggleModel(model)}
                              className={`px-5 py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                                formData.models.includes(model) 
                                  ? 'bg-white border-white text-slate-950 shadow-xl' 
                                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white hover:border-slate-700'
                              }`}>{model}</button>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <input 
                            type="text" 
                            placeholder="Modelo específico (Ex: Golf GTI)..." 
                            className={inputClasses}
                            value={customModelInput}
                            onChange={e => setCustomModelInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addCustomModel())}
                          />
                          <button type="button" onClick={addCustomModel} className="bg-indigo-600 text-white px-8 rounded-2xl font-black text-sm hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">
                            <Plus size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right duration-500 space-y-12">
                  <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
                    <div className="bg-indigo-600/10 p-3 rounded-2xl text-indigo-400 border border-indigo-500/20"><Settings size={28} /></div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Especificações Técnicas</h3>
                  </div>
                  
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
                          <button key={key} type="button" onClick={() => setFormData({...formData, urgency: key})}
                            className={`p-7 rounded-[2.5rem] border-2 text-sm font-black transition-all flex items-center justify-center text-center leading-tight ${
                              formData.urgency === key ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl shadow-indigo-600/30 scale-105' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-indigo-500/50 hover:text-slate-300'
                            }`}>{label}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right duration-500 space-y-12">
                  <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
                    <div className="bg-indigo-600/10 p-3 rounded-2xl text-indigo-400 border border-indigo-500/20"><User size={28} /></div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Informações de Contato</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="md:col-span-2">
                      <label className={labelClasses}>Seu Nome</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClasses} placeholder="Como devemos te chamar?"/>
                    </div>
                    
                    <div>
                      <label className={labelClasses}>Localidade</label>
                      <div className="relative group">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                        <input 
                          type="text" 
                          required 
                          value={formData.location} 
                          onChange={e => setFormData({...formData, location: e.target.value})} 
                          className={`${inputClasses} pl-14`} 
                          placeholder="Cidade - UF"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-end">
                       <label className={labelClasses}>Busca Regional</label>
                       <button 
                         type="button"
                         onClick={() => setFormData({...formData, acceptsRemoteProposals: !formData.acceptsRemoteProposals})}
                         className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] border-2 font-black text-xs transition-all ${
                           formData.acceptsRemoteProposals 
                           ? 'bg-indigo-600/10 border-indigo-500 text-white' 
                           : 'bg-slate-950 border-slate-800 text-slate-500'
                         }`}
                       >
                         <div className={`w-12 h-7 rounded-full relative transition-all ${formData.acceptsRemoteProposals ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30' : 'bg-slate-800'}`}>
                           <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${formData.acceptsRemoteProposals ? 'right-1' : 'left-1'}`} />
                         </div>
                         <span className="uppercase tracking-widest">{formData.acceptsRemoteProposals ? 'Aceito Ofertas Globais' : 'Apenas Local'}</span>
                       </button>
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClasses}>WhatsApp</label>
                      <div className="flex gap-4">
                        <select 
                          value={formData.ddi} 
                          onChange={e => setFormData({...formData, ddi: e.target.value})}
                          className="px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl font-black text-white outline-none focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all h-full appearance-none"
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={c.code} value={c.code}>{c.code} {c.flag}</option>
                          ))}
                        </select>
                        <input 
                          type="tel" 
                          required 
                          value={formData.whatsapp} 
                          onChange={e => setFormData({...formData, whatsapp: e.target.value})} 
                          className={inputClasses} 
                          placeholder={selectedCountry?.mask || 'Seu número'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-20 pt-10 border-t border-slate-800">
                {step > 1 ? (
                  <button type="button" onClick={prevStep} className="flex items-center gap-3 text-slate-500 font-black uppercase tracking-[0.2em] text-xs hover:text-white transition-all px-8 py-4">
                    <ChevronLeft size={20} /> Voltar
                  </button>
                ) : <div />}
                {step < 3 ? (
                  <button type="button" onClick={nextStep} disabled={step === 1 && formData.brands.length === 0} className="flex items-center gap-3 bg-indigo-600 text-white px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-[0.15em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-500 hover:-translate-y-1 transition-all disabled:opacity-30 disabled:translate-y-0">
                    Próximo <ChevronRight size={20} />
                  </button>
                ) : (
                  <button type="submit" className="flex items-center gap-3 bg-white text-slate-950 px-14 py-6 rounded-3xl font-black text-lg uppercase tracking-tight shadow-2xl shadow-white/10 hover:-translate-y-1 transition-all">
                    Finalizar Cadastro <CheckCircle size={22} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerForm;
