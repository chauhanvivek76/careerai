import { useState } from 'react';
import { Brain, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthProps {
  mode: 'login' | 'signup';
  onNavigate: (page: string) => void;
}

export default function Auth({ mode, onNavigate }: AuthProps) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        onNavigate('dashboard');
      } else {
        if (!fullName.trim()) { setError('Please enter your full name'); setLoading(false); return; }
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        onNavigate('dashboard');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg.includes('Invalid') ? 'Invalid email or password' : msg.includes('already') ? 'Account already exists. Try signing in.' : msg);
    } finally {
      setLoading(false);
    }
  }

  const benefits = ['AI career assessment', 'Personalized roadmaps', 'Salary insights', 'Course recommendations'];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-28 relative">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left - Branding */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-2xl">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-white">
              Career<span className="gradient-text">AI</span>
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
            {isLogin ? 'Welcome back' : 'Start your journey'} to a{' '}
            <span className="gradient-text">brilliant career</span>
          </h2>
          <p className="text-white/50 mb-8 text-lg leading-relaxed">
            {isLogin
              ? 'Sign in to access your personalized career dashboard and continue your journey.'
              : 'Join 50,000+ B.Tech students who found their dream career with AI guidance.'}
          </p>
          <div className="space-y-3">
            {benefits.map(b => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white/70">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-500/25">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-1">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h3>
            <p className="text-white/50 text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="input-field pl-10"
                  required
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field pl-10"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field pl-10 pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <button onClick={() => onNavigate('home')} className="text-sm text-white/30 hover:text-white/50 transition-colors">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
