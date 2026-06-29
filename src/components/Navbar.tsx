import { useState, useEffect } from 'react';
import { Brain, Menu, X, Sun, Moon, ChevronDown, Bell, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'assessment', label: 'AI Assessment' },
  { id: 'roadmap', label: 'Roadmaps' },
  { id: 'explorer', label: 'Explore Careers' },
  {
    id: 'tools', label: 'Tools', children: [
      { id: 'salary', label: 'Salary Predictor' },
      { id: 'courses', label: 'Courses' },
    ]
  },
  { id: 'about', label: 'About' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-navy-900/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-lg group-hover:shadow-primary-500/40 transition-all duration-300">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              Career<span className="gradient-text">AI</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => item.children ? (
              <div key={item.id} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`nav-link flex items-center gap-1 px-3 py-2 rounded-lg text-sm`}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-44 glass rounded-xl p-1 shadow-2xl animate-fade-down">
                    {item.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => handleNav(child.id)}
                        className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-link px-3 py-2 rounded-lg text-sm ${currentPage === item.id ? 'active text-white bg-white/5' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg glass hover:bg-white/10 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {user ? (
              <>
                <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg glass hover:bg-white/10 transition-all relative">
                  <Bell className="w-4 h-4 text-white/70" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full"></span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                  >
                    {user.email?.[0].toUpperCase()}
                  </button>
                  {profileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-52 glass rounded-xl p-1 shadow-2xl animate-fade-down">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs text-white/50">Signed in as</p>
                        <p className="text-sm text-white truncate">{user.email}</p>
                      </div>
                      <button onClick={() => { handleNav('dashboard'); setProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </button>
                      <button onClick={() => { signOut(); setProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button onClick={() => handleNav('login')} className="text-sm text-white/70 hover:text-white px-3 py-2 transition-colors">
                  Sign In
                </button>
                <button onClick={() => handleNav('signup')} className="btn-primary py-2 text-sm">
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg glass"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/10 px-4 py-4 space-y-1 animate-fade-down">
          {navItems.map(item => item.children ? (
            <div key={item.id}>
              <p className="text-xs uppercase tracking-widest text-white/40 px-3 pt-2 pb-1">{item.label}</p>
              {item.children.map(child => (
                <button key={child.id} onClick={() => handleNav(child.id)} className="w-full text-left px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  {child.label}
                </button>
              ))}
            </div>
          ) : (
            <button key={item.id} onClick={() => handleNav(item.id)} className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all ${currentPage === item.id ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              {item.label}
            </button>
          ))}
          {!user ? (
            <div className="flex gap-2 pt-2">
              <button onClick={() => handleNav('login')} className="flex-1 btn-secondary py-2.5 text-sm">Sign In</button>
              <button onClick={() => handleNav('signup')} className="flex-1 btn-primary py-2.5 text-sm">Sign Up</button>
            </div>
          ) : (
            <button onClick={signOut} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all mt-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
