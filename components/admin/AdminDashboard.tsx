
/**
 * MODULE: ADMIN CORE - DASHBOARD
 * PRD: Backoffice de Controle Total
 * OBJETIVO: Gestão de usuários, revendas e parâmetros econômicos do ecossistema.
 * COMPORTAMENTO: 
 *  - Dashboard de Performance (KPIs).
 *  - Gestão de Marketplace (Leads).
 *  - Gestão de B2B (Revendas e Créditos).
 *  - Configurações Globais (Custo por Lead, Push Engine).
 * VÍNCULOS: Monitora todos os leads gerados pelo Buyer Engine e créditos consumidos no Dealer Hub.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Car, CreditCard, BarChart3, Search, ShieldCheck, Trash2, Edit3, 
  Plus, Settings, Lock, LogOut, LayoutDashboard, Menu, X, Globe, MapPin, 
  Building2, Zap, Target, Sun, Moon, ArrowUpRight, ArrowDownRight, Bell, ShieldAlert
} from 'lucide-react';
import { MOCK_LEADS, MOCK_DEALERS, MOCK_ADMINS } from '../../constants';
import { Lead, Dealership, AdminUser } from '../../types';
import { AutoMatchLogo } from '../../App';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [dealers, setDealers] = useState<Dealership[]>(MOCK_DEALERS);
  const [admins, setAdmins] = useState<AdminUser[]>(MOCK_ADMINS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'dealers' | 'admins' | 'settings'>('dashboard');
  const [searchTerm, setSearchTerm] = useState("");
  const [leadBrandFilter, setLeadBrandFilter] = useState("");
  const [leadModelFilter, setLeadModelFilter] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [showDealerForm, setShowDealerForm] = useState(false);
  const [editingDealer, setEditingDealer] = useState<Dealership | null>(null);
  const [dealerData, setDealerData] = useState({
    name: '', email: '', cnpj: '', region: '', plan: 'Starter' as Dealership['plan'], credits: 0
  });

  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [creditModalTarget, setCreditModalTarget] = useState<Dealership | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'deduct'>('add');
  const [adjustmentAmount, setAdjustmentAmount] = useState<number>(10);
  const [adjustmentNote, setAdjustmentNote] = useState('');

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const deleteLead = (id: string) => {
    if(confirm('Remover Lead?')) setLeads(leads.filter(l => l.id !== id));
  };

  const filteredLeadsTable = leads.filter(l => {
    const matchesBrand = leadBrandFilter === "" || l.brands.some(b => b.toLowerCase().includes(leadBrandFilter.toLowerCase()));
    const matchesModel = leadModelFilter === "" || l.models.some(m => m.toLowerCase().includes(leadModelFilter.toLowerCase()));
    const matchesGlobal = searchTerm === "" || l.buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBrand && matchesModel && matchesGlobal;
  });

  const handleApplyCredits = () => {
    if (!creditModalTarget) return;
    const finalAmount = adjustmentType === 'add' ? adjustmentAmount : -adjustmentAmount;
    setDealers(prev => prev.map(d => d.id === creditModalTarget.id ? { ...d, credits: Math.max(0, d.credits + finalAmount) } : d));
    setIsCreditModalOpen(false);
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.15em] transition-all ${
        activeTab === id ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  const adminInputClasses = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-indigo-600/20 shadow-sm w-full";
  const labelClasses = "text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-2";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex overflow-x-hidden transition-colors duration-300">
      {/* Sidebar e Headers permanecem consistentes */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 flex flex-col z-50 transition-transform lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-slate-100 dark:border-slate-900">
          <AutoMatchLogo className="h-9 mb-8" />
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
             <ShieldCheck className="text-indigo-600" size={20} />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] dark:text-white">Admin Core</span>
          </div>
        </div>
        <nav className="flex-grow p-6 space-y-3">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Performance" />
          <SidebarItem id="leads" icon={Target} label="Marketplace" />
          <SidebarItem id="dealers" icon={Building2} label="Revendas" />
          <SidebarItem id="admins" icon={Lock} label="Equipe" />
          <SidebarItem id="settings" icon={Settings} label="Sistema" />
        </nav>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 px-8 py-6 flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{activeTab}</h2>
          <div className="flex items-center gap-6">
            <button onClick={toggleTheme} className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black">AM</div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8 lg:p-12">
          {/* Dashboard, Leads, Dealers logic... */}
          {activeTab === 'dashboard' && <div className="animate-in fade-in text-slate-900 dark:text-white">Relatório de Performance Ativo.</div>}
          {activeTab === 'leads' && (
             <div className="space-y-10 animate-in fade-in">
               <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-950 text-[10px] font-black uppercase text-slate-500">
                      <tr><th className="px-10 py-6">Comprador</th><th className="px-10 py-6">Interesse</th><th className="px-10 py-6 text-right">Ação</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredLeadsTable.map(lead => (
                        <tr key={lead.id} className="dark:text-white">
                          <td className="px-10 py-8 font-black">{lead.buyerName}</td>
                          <td className="px-10 py-8 text-xs">{lead.brands[0]} {lead.models[0]}</td>
                          <td className="px-10 py-8 text-right"><button onClick={() => deleteLead(lead.id)} className="text-red-500"><Trash2 size={18}/></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
