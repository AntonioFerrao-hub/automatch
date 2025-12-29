
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, 
  Briefcase, 
  LayoutDashboard, 
  Menu, 
  X, 
  LogOut,
  ShieldAlert,
  Globe
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import BuyerForm from './components/BuyerForm';
import DealerDashboard from './components/DealerDashboard';
import DealerLogin from './components/DealerLogin';
import ConfirmationPage from './components/ConfirmationPage';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isDealerPath = location.pathname.startsWith('/dealer');
  const isAdminPath = location.pathname.startsWith('/admin');
  
  if (isAdminPath && location.pathname !== '/admin/login') return null;

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-indigo-600 p-2 rounded-xl text-white transition-all group-hover:scale-110 group-hover:rotate-3 shadow-indigo-500/20 shadow-lg">
                <Car size={24} />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tighter">
                AutoMatch
              </span>
            </Link>

            {/* Language Selector Desktop */}
            <div className="hidden lg:flex items-center bg-slate-900/50 rounded-2xl p-1 border border-slate-800">
              {(['PR', 'US', 'ES'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                    lang === l 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {!isDealerPath ? (
              <>
                <Link to="/" className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">{t.nav.home}</Link>
                <Link to="/cadastrar" className="bg-indigo-600 text-white px-7 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 hover:-translate-y-0.5">
                  {t.nav.buy}
                </Link>
                <div className="h-6 w-px bg-slate-800 mx-2"></div>
                <Link to="/dealer/login" className="flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">
                  <Briefcase size={18} />
                  {t.nav.dealers}
                </Link>
              </>
            ) : (
              <>
                <Link to="/dealer/dashboard" className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <LayoutDashboard size={18} /> {t.nav.dashboard}
                </Link>
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-red-400 hover:text-red-300 font-black text-sm uppercase tracking-widest">
                  <LogOut size={18} /> {t.nav.logout}
                </button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
             {/* Language Selector Mobile */}
             <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
                <button onClick={() => setLang(lang === 'PR' ? 'US' : lang === 'US' ? 'ES' : 'PR')} className="px-3 py-1 text-[10px] font-black text-indigo-400 flex items-center gap-2">
                   <Globe size={12} /> {lang}
                </button>
             </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 py-6 px-4 space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-slate-300 font-black text-sm uppercase tracking-widest py-3">{t.nav.home}</Link>
          <Link to="/cadastrar" onClick={() => setIsOpen(false)} className="block bg-indigo-600 text-white px-4 py-4 rounded-2xl font-black text-center uppercase tracking-widest shadow-lg">{t.nav.buy}</Link>
          <Link to="/dealer/login" onClick={() => setIsOpen(false)} className="block text-indigo-400 font-black text-sm uppercase tracking-widest py-3 border-t border-slate-800">{t.nav.dealers}</Link>
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('app-lang');
    return (saved as Language) || 'PR';
  });

  useEffect(() => {
    localStorage.setItem('app-lang', lang);
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: TRANSLATIONS[lang]
  };

  const t = TRANSLATIONS[lang];

  return (
    <LanguageContext.Provider value={value}>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 selection:bg-indigo-500 selection:text-white">
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 p-2 rounded-xl text-white">
                    <Car size={24} />
                  </div>
                  <span className="text-2xl font-black tracking-tighter">AutoMatch</span>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {t.footer.tagline}
                </p>
              </div>
              <div>
                <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-6">{t.footer.platform}</h4>
                <ul className="text-slate-400 text-sm space-y-4 font-bold">
                  <li><Link to="/cadastrar" className="hover:text-indigo-400 transition-colors">{t.nav.buy}</Link></li>
                  <li><Link to="/dealer/login" className="hover:text-indigo-400 transition-colors">{t.nav.dealers}</Link></li>
                  <li><Link to="/admin/login" className="hover:text-red-400 flex items-center gap-2 text-xs opacity-50"><ShieldAlert size={14}/> Super Admin</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-6">{t.footer.support}</h4>
                <div className="text-slate-400 text-sm space-y-2 font-bold">
                  <p>support@automatch.pro</p>
                  <p className="text-xs text-slate-500">24/7 Ticketing System</p>
                </div>
              </div>
              <div>
                <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-6">{t.footer.compliance}</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  GDPR / LGPD Compliant. End-to-end encryption active.
                </p>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
                © 2025 AutoMatch Technologies. All Rights Reserved.
              </p>
            </div>
          </footer>
        </div>
      </HashRouter>
    </LanguageContext.Provider>
  );
};

export default App;
