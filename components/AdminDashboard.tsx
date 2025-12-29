
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Car, 
  CreditCard, 
  BarChart3, 
  Search, 
  ShieldCheck, 
  Trash2, 
  Edit3, 
  Briefcase,
  Plus,
  Settings,
  Lock,
  LogOut,
  LayoutDashboard,
  ShieldAlert,
  Menu,
  X,
  UserPlus,
  UserCheck,
  UserX,
  Bell,
  Globe,
  MapPin,
  Building2,
  Tag,
  Zap,
  Target,
  Sun,
  Moon
} from 'lucide-react';
import { MOCK_LEADS, MOCK_DEALERS, MOCK_ADMINS } from '../constants';
import { Lead, Dealership, AdminUser } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : document.documentElement.classList.contains('dark');
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
    name: '',
    email: '',
    cnpj: '',
    region: '',
    plan: 'Starter' as Dealership['plan'],
    credits: 0
  });

  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'Support' as AdminUser['role']
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const toggleTheme = () => setIsDark(!isDark);

  const deleteLead = (id: string) => {
    if(confirm('Remover Lead do sistema?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const filteredLeadsTable = leads.filter(l => {
    const matchesBrand = leadBrandFilter === "" || l.brands.some(b => b.toLowerCase().includes(leadBrandFilter.toLowerCase()));
    const matchesModel = leadModelFilter === "" || l.models.some(m => m.toLowerCase().includes(leadModelFilter.toLowerCase()));
    const matchesGlobal = searchTerm === "" || 
                         l.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         l.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBrand && matchesModel && matchesGlobal;
  });

  const handleOpenDealerForm = (dealer?: Dealership) => {
    if (dealer) {
      setEditingDealer(dealer);
      setDealerData({
        name: dealer.name,
        email: dealer.email,
        cnpj: dealer.cnpj,
        region: dealer.region,
        plan: dealer.plan,
        credits: dealer.credits
      });
    } else {
      setEditingDealer(null);
      setDealerData({ name: '', email: '', cnpj: '', region: '', plan: 'Starter', credits: 10 });
    }
    setShowDealerForm(true);
  };

  const saveDealer = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDealer) {
      setDealers(prev => prev.map(d => d.id === editingDealer.id ? { ...d, ...dealerData } : d));
    } else {
      const newDealer: Dealership = {
        id: `d${Date.now()}`,
        ...dealerData,
        status: 'active',
        joinedAt: new Date().toISOString()
      };
      setDealers([newDealer, ...dealers]);
    }
    setShowDealerForm(false);
  };

  const deleteDealer = (id: string) => {
    if(confirm('Excluir revenda parceira?')) {
      setDealers(dealers.filter(d => d.id !== id));
    }
  };

  const updateDealerCredits = (id: string, amount: number) => {
    setDealers(prev => prev.map(d => d.id === id ? { ...d, credits: Math.max(0, d.credits + amount) } : d));
  };

  const toggleDealerStatus = (id: string) => {
    setDealers(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'active' ? 'blocked' : 'active' } : d));
  };

  const toggleAdminStatus = (id: string) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a));
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const admin: AdminUser = {
      id: `adm${Date.now()}`,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: 'active',
      lastLogin: 'Nunca'
    };
    setAdmins([admin, ...admins]);
    setNewAdmin({ name: '', email: '', role: 'Support' });
    setShowAddAdmin(false);
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.15em] transition-all ${
        activeTab === id 
          ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
          : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const adminInputClasses = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-indigo-600/20 focus:border-indigo-500 transition-all shadow-sm w-full placeholder:text-slate-400 dark:placeholder:text-slate-700";
  const labelClasses = "text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-[0.3em] block mb-2";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex overflow-x-hidden text-slate-900 dark:text-slate-300 transition-colors duration-300">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/20"><ShieldCheck size={24} /></div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Super Admin</span>
          </div>
          <button className="lg:hidden text-slate-500" onClick={() => setIsSidebarOpen(false)}><X size={24}/></button>
        </div>
        <nav className="flex-grow p-6 space-y-3">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Performance" />
          <SidebarItem id="leads" icon={Target} label="Marketplace" />
          <SidebarItem id="dealers" icon={Building2} label="Revendas" />
          <SidebarItem id="admins" icon={Lock} label="Equipe" />
          <SidebarItem id="settings" icon={Settings} label="Sistema" />
        </nav>
        <div className="p-6 border-t border-slate-100 dark:border-slate-900">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-4 px-5 py-4 text-red-500 dark:text-red-400 font-black text-xs uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 px-8 py-6 sticky top-0 z-40 flex justify-between items-center transition-colors">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800" onClick={() => setIsSidebarOpen(true)}><Menu size={20}/></button>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase hidden sm:block">
              {activeTab}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-700 group-focus-within:text-indigo-500 transition-colors" size={16} />
              <input type="text" placeholder="Global Search..." className={adminInputClasses + " pl-12 !py-2.5 !w-64"} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
              title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-indigo-600/20">AM</div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8 lg:p-12">
          {activeTab === 'dashboard' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                {[
                  { label: 'Total Leads', value: leads.length, icon: <Users />, change: '+14%' },
                  { label: 'Revenue (MM)', value: 'R$ 2.4', icon: <CreditCard />, change: '+22%' },
                  { label: 'Partneers', value: dealers.length, icon: <Building2 />, change: '+3%' },
                  { label: 'Conv. Rate', value: '28.4%', icon: <BarChart3 />, change: '+1.5%' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl group transition-all hover:border-indigo-500">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 border border-slate-100 dark:border-slate-800 group-hover:bg-indigo-600 group-hover:text-white transition-all">{stat.icon}</div>
                      <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-500/10 tracking-widest">{stat.change}</span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                    <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Marketplace Intelligence</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl">
                 <div className="relative group">
                    <Car className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-700 group-focus-within:text-indigo-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Filtro por Marca" 
                      className={adminInputClasses + " pl-14"} 
                      value={leadBrandFilter}
                      onChange={e => setLeadBrandFilter(e.target.value)}
                    />
                 </div>
                 <div className="relative group">
                    <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-700 group-focus-within:text-indigo-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Filtro por Modelo" 
                      className={adminInputClasses + " pl-14"} 
                      value={leadModelFilter}
                      onChange={e => setLeadModelFilter(e.target.value)}
                    />
                 </div>
                 <div className="flex items-center px-4">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                       Dataset: <span className="text-slate-900 dark:text-white">{filteredLeadsTable.length} de {leads.length}</span>
                    </p>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Client Data</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Asset Intent</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Geoloc</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest text-right">Ops</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredLeadsTable.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-all">
                          <td className="px-10 py-8">
                            <p className="font-black text-slate-900 dark:text-white text-lg tracking-tight leading-none mb-1.5">{lead.buyerName}</p>
                            <p className="text-xs text-slate-500 font-bold">{lead.buyerEmail}</p>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex flex-col">
                               <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{lead.brands[0]}</span>
                               <span className="text-sm font-black text-slate-800 dark:text-white tracking-tight">{lead.models[0]}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2 uppercase tracking-widest"><MapPin size={14} className="text-indigo-500"/> {lead.location}</p>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <button onClick={() => deleteLead(lead.id)} className="p-3 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all shadow-sm"><Trash2 size={18}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dealers' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">B2B Network</h2>
                  <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Management of certified dealership nodes.</p>
                </div>
                <button 
                  onClick={() => handleOpenDealerForm()}
                  className="bg-indigo-600 text-white px-10 py-5 rounded-3xl text-sm font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
                >
                  New Partner
                </button>
              </div>

              {showDealerForm && (
                <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl animate-in slide-in-from-top duration-500">
                  <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">{editingDealer ? 'Partner Sync' : 'Provision New Node'}</h3>
                    <button onClick={() => setShowDealerForm(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><X size={28}/></button>
                  </div>
                  <form onSubmit={saveDealer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                      <label className={labelClasses}>Corporate Name</label>
                      <input type="text" required className={adminInputClasses} value={dealerData.name} onChange={e => setDealerData({...dealerData, name: e.target.value})} placeholder="Auto Group X"/>
                    </div>
                    <div>
                      <label className={labelClasses}>Tax ID (CNPJ)</label>
                      <input type="text" required className={adminInputClasses} value={dealerData.cnpj} onChange={e => setDealerData({...dealerData, cnpj: e.target.value})} placeholder="00.000.000/0001-00"/>
                    </div>
                    <div>
                      <label className={labelClasses}>Endpoint E-mail</label>
                      <input type="email" required className={adminInputClasses} value={dealerData.email} onChange={e => setDealerData({...dealerData, email: e.target.value})} placeholder="ops@node.com"/>
                    </div>
                    <div>
                      <label className={labelClasses}>Geo Region</label>
                      <input type="text" required className={adminInputClasses} value={dealerData.region} onChange={e => setDealerData({...dealerData, region: e.target.value})} placeholder="SP - Brasil"/>
                    </div>
                    <div>
                      <label className={labelClasses}>Subscription Tier</label>
                      <select className={adminInputClasses} value={dealerData.plan} onChange={e => setDealerData({...dealerData, plan: e.target.value as Dealership['plan']})}>
                        <option value="Starter">Starter</option>
                        <option value="Professional">Professional</option>
                        <option value="Enterprise">Enterprise</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClasses}>Allocated Credits</label>
                      <input type="number" required className={adminInputClasses} value={dealerData.credits} onChange={e => setDealerData({...dealerData, credits: parseInt(e.target.value) || 0})} />
                    </div>
                    <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-6 pt-10 border-t border-slate-100 dark:border-slate-800">
                      <button type="button" onClick={() => setShowDealerForm(false)} className="px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">Abort</button>
                      <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl">
                        Commit Node
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Partner Identity</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Access Tier</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest text-center">Fuel (Crd)</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">State</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest text-right">Ops</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {dealers.map(dealer => (
                        <tr key={dealer.id} className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-all group">
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <Building2 size={24} />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 dark:text-white text-lg tracking-tight mb-1">{dealer.name}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest flex items-center gap-2"><MapPin size={10}/> {dealer.region}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border ${
                              dealer.plan === 'Enterprise' ? 'bg-purple-100 dark:bg-purple-600/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20' : 
                              dealer.plan === 'Professional' ? 'bg-indigo-100 dark:bg-indigo-600/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20' : 
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-500 border-slate-200 dark:border-slate-700'
                            }`}>
                              {dealer.plan}
                            </span>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex flex-col items-center gap-2">
                                <p className="font-black text-slate-900 dark:text-white text-xl tracking-tighter">{dealer.credits}</p>
                                <div className="flex gap-2">
                                   <button onClick={() => updateDealerCredits(dealer.id, 10)} className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800 transition-all"><Plus size={14}/></button>
                                   <button onClick={() => updateDealerCredits(dealer.id, -10)} className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-slate-200 dark:border-slate-800 transition-all"><Trash2 size={14}/></button>
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                            <button 
                              onClick={() => toggleDealerStatus(dealer.id)}
                              className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                dealer.status === 'active' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20'
                              }`}
                            >
                              {dealer.status}
                            </button>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <div className="flex justify-end gap-3">
                              <button onClick={() => handleOpenDealerForm(dealer)} className="p-3 text-slate-400 hover:text-indigo-600 transition-all bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"><Edit3 size={18} /></button>
                              <button onClick={() => deleteDealer(dealer.id)} className="p-3 text-slate-400 hover:text-red-500 transition-all bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admins' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Ops Team</h2>
                  <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Internal operators and system maintainers.</p>
                </div>
                <button 
                  onClick={() => setShowAddAdmin(!showAddAdmin)}
                  className="bg-indigo-600 text-white px-10 py-5 rounded-3xl text-sm font-black uppercase tracking-widest shadow-lg hover:bg-indigo-500 transition-all"
                >
                  {showAddAdmin ? 'Abort' : 'New Operator'}
                </button>
              </div>

              {showAddAdmin && (
                <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl animate-in slide-in-from-top duration-500">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase mb-10">Provision New Admin</h3>
                  <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <label className={labelClasses}>Operator Identity</label>
                      <input type="text" required className={adminInputClasses} value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} placeholder="Full Name"/>
                    </div>
                    <div>
                      <label className={labelClasses}>Corporate Auth E-mail</label>
                      <input type="email" required className={adminInputClasses} value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} placeholder="op@automatch.pro"/>
                    </div>
                    <div>
                      <label className={labelClasses}>Access Clearance</label>
                      <select className={adminInputClasses} value={newAdmin.role} onChange={e => setNewAdmin({...newAdmin, role: e.target.value as AdminUser['role']})}>
                        <option value="Support">Support</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Super Admin">Super Admin</option>
                      </select>
                    </div>
                    <div className="md:col-span-3 flex justify-end pt-8 border-t border-slate-100 dark:border-slate-800">
                      <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em]">
                        Deploy Operator
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Identity</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Clearance</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest text-right">Ops</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {admins.map(admin => (
                        <tr key={admin.id} className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-all group">
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-400 dark:text-slate-700 font-black group-hover:bg-indigo-600 group-hover:text-white border border-slate-200 dark:border-slate-800 transition-all">
                                {admin.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-black text-slate-900 dark:text-white text-lg tracking-tight mb-1">{admin.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-600 font-bold tracking-tight">{admin.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border ${
                              admin.role === 'Super Admin' ? 'bg-red-50 dark:bg-red-600/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20' : 
                              admin.role === 'Moderator' ? 'bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20' : 
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-500 border-slate-200 dark:border-slate-700'
                            }`}>
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-10 py-8">
                            <button 
                              onClick={() => toggleAdminStatus(admin.id)}
                              className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                admin.status === 'active' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20' : 'text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800'
                              }`}
                            >
                              {admin.status}
                            </button>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <div className="flex justify-end gap-3">
                              <button className="p-3 text-slate-400 hover:text-indigo-600 transition-all bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"><Edit3 size={18} /></button>
                              <button className="p-3 text-slate-400 hover:text-red-500 transition-all bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
              <div className="bg-white dark:bg-slate-900 p-16 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none rotate-12 text-slate-200 dark:text-white">
                   <Settings size={200} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-16 flex items-center gap-6 tracking-tighter leading-none">
                  <div className="bg-indigo-600 p-4 rounded-3xl text-white shadow-xl shadow-indigo-600/20"><Settings size={32}/></div>
                  Global Engine Config
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div className="space-y-10">
                    <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] border-b border-slate-100 dark:border-slate-800 pb-4">Economics & Flow</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-600 dark:text-indigo-400"><CreditCard size={20} /></div>
                          <span className="text-sm font-black text-slate-800 dark:text-white tracking-tight">Custo por Lead</span>
                        </div>
                        <input type="number" defaultValue={3} className="w-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-center font-black text-slate-900 dark:text-white outline-none focus:border-indigo-500" />
                      </div>
                      <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-600 dark:text-indigo-400"><Bell size={20} /></div>
                          <span className="text-sm font-black text-slate-800 dark:text-white tracking-tight">Push Engine</span>
                        </div>
                        <div className="w-16 h-8 bg-indigo-600 rounded-full relative cursor-pointer shadow-lg shadow-indigo-600/20">
                          <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] border-b border-slate-100 dark:border-slate-800 pb-4">Security & Scope</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-600 dark:text-indigo-400"><Globe size={20} /></div>
                          <span className="text-sm font-black text-slate-800 dark:text-white tracking-tight">Global Marketplace</span>
                        </div>
                        <div className="w-16 h-8 bg-indigo-600 rounded-full relative cursor-pointer shadow-lg shadow-indigo-600/20">
                          <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-600 dark:text-indigo-400"><ShieldAlert size={20} /></div>
                          <span className="text-sm font-black text-slate-800 dark:text-white tracking-tight">Maintenace Mode</span>
                        </div>
                        <div className="w-16 h-8 bg-slate-300 dark:bg-slate-800 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-6 h-6 bg-white dark:bg-slate-600 rounded-full shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                   <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-16 py-5 rounded-[1.5rem] font-black text-lg shadow-xl hover:-translate-y-1 transition-all uppercase tracking-tight">
                     Commit Changes
                   </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
