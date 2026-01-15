
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Globe, LayoutDashboard, Briefcase } from 'lucide-react';
import LandingPage from './components/LandingPage';
import BuyerForm from './components/buyer/BuyerForm';
import ConfirmationPage from './components/buyer/ConfirmationPage';
import DealerDashboard from './components/dealer/DealerDashboard';
import DealerLogin from './components/dealer/DealerLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import { TRANSLATIONS, Language } from './constants';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

export const AutoMatchLogo: React.FC<{ className?: string, iconOnly?: boolean }> = ({ className = "h-10", iconOnly = false }) => (
  <div className={`flex items-center gap-3 ${className} select-none`}>
    <svg viewBox="0 0 100 100" className="h-full w-auto drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="28" fill="url(#logo_grad)" />
      <path d="M78 52.5C78 54.5 76.5 56 74.5 56H25.5C23.5 56 22 54.5 22 52.5V45.5C22 43.8431 23.3431 42.5 25 42.5H27.5L31.5 32.5C32.5 30 35 28.5 37.5 28.5H62.5C65 28.5 67.5 30 68.5 32.5L72.5 42.5H75C76.6569 42.5 78 43.8431 78 45.5V52.5Z" stroke="white" strokeWidth="4" strokeLinejoin="round"/>
      <circle cx="32" cy="50" r="3" fill="white" />
      <circle cx="68" cy="50" r="3" fill="white" />
      <path d="M30 68C35 74 42.5 78 50 78C57.5 78 65 74 70 68" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M26 65L30 68L33 64" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M74 65L70 68L67 64" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="logo_grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
      </defs>
    </svg>
    {!iconOnly && <span className="text-2xl font-black text-white tracking-tighter">AutoMatch</span>}
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isDealerPath = location.pathname.startsWith('/dealer');
  if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') return null;

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 shadow-lg h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
        <Link to="/" className="group active:scale-95 transition-all"><AutoMatchLogo className="h-11" /></Link>
        <div className="hidden md:flex items-center space-x-8">
          {!isDealerPath ? (
            <>
              <Link to="/" className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest">{t.nav.home}</Link>
              <Link to="/cadastrar" className="bg-indigo-600 text-white px-7 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all">{t.nav.buy}</Link>
              <Link to="/dealer/login" className="flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest"><Briefcase size={18} /> {t.nav.dealers}</Link>
            </>
          ) : (
            <>
              <Link to="/dealer/dashboard" className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2"><LayoutDashboard size={18} /> {t.nav.dashboard}</Link>
              <button onClick={() => navigate('/')} className="text-red-400 hover:text-red-300 font-black text-sm uppercase tracking-widest flex items-center gap-2"><LogOut size={18} /> {t.nav.logout}</button>
            </>
          )}
        </div>
        <div className="md:hidden"><button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 p-2">{isOpen ? <X size={28} /> : <Menu size={28} />}</button></div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('app-lang') as Language) || 'PR');
  useEffect(() => localStorage.setItem('app-lang', lang), [lang]);
  const value = { lang, setLang, t: TRANSLATIONS[lang] };

  return (
    <LanguageContext.Provider value={value}>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/cadastrar" element={<BuyerForm />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/dealer/login" element={<DealerLogin />} />
              <Route path="/dealer/dashboard" element={<DealerDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <footer className="bg-slate-900 border-t border-slate-800 py-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-6"><AutoMatchLogo className="h-12" /><p className="text-slate-400 text-sm leading-relaxed">{TRANSLATIONS[lang].footer.tagline}</p></div>
              <div><h4 className="font-black text-white text-xs uppercase mb-6 tracking-widest">Plataforma</h4><ul className="text-slate-400 text-sm space-y-4 font-bold"><li><Link to="/cadastrar" className="hover:text-indigo-400">Quero Comprar</Link></li><li><Link to="/dealer/login" className="hover:text-indigo-400">Sou Revenda</Link></li></ul></div>
              <div><h4 className="font-black text-white text-xs uppercase mb-6 tracking-widest">Suporte</h4><p className="text-slate-400 text-sm">support@automatch.pro</p></div>
              <div><h4 className="font-black text-white text-xs uppercase mb-6 tracking-widest">Compliance</h4><p className="text-slate-500 text-xs">GDPR / LGPD Compliant.</p></div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </LanguageContext.Provider>
  );
};

export default App;
