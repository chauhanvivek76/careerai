import { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, Bookmark, Award, BookOpen, Target, User, ChevronRight, Sparkles, Clock, Brain } from 'lucide-react';
import { supabase, CareerReport, Bookmark as BookmarkType } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { careerDomains } from '../data/careers';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user, profile } = useAuth();
  const [reports, setReports] = useState<CareerReport[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      setLoading(true);
      const [reportsRes, bookmarksRes] = await Promise.all([
        supabase.from('career_reports').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('bookmarks').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }),
      ]);
      if (reportsRes.data) setReports(reportsRes.data);
      if (bookmarksRes.data) setBookmarks(bookmarksRes.data);
      setLoading(false);
    }
    load();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center glass-card p-12 max-w-md w-full">
          <Brain className="w-16 h-16 text-primary-400 mx-auto mb-6" />
          <h2 className="font-display font-bold text-2xl text-white mb-3">Sign in to access your Dashboard</h2>
          <p className="text-white/50 mb-6">Track your career progress, saved roadmaps, and AI reports all in one place.</p>
          <div className="flex gap-3">
            <button onClick={() => onNavigate('login')} className="btn-secondary flex-1">Sign In</button>
            <button onClick={() => onNavigate('signup')} className="btn-primary flex-1">Sign Up</button>
          </div>
        </div>
      </div>
    );
  }

  const careerScore = Math.min(99, 40 + reports.length * 15 + bookmarks.length * 5);
  const firstName = profile?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Student';

  const quickActions = [
    { icon: Brain, label: 'Take Assessment', page: 'assessment', color: 'from-primary-500 to-violet-500' },
    { icon: BookOpen, label: 'View Roadmaps', page: 'roadmap', color: 'from-emerald-500 to-teal-500' },
    { icon: TrendingUp, label: 'Salary Insights', page: 'salary', color: 'from-amber-500 to-orange-500' },
    { icon: Award, label: 'Find Courses', page: 'courses', color: 'from-pink-500 to-rose-500' },
  ];

  const recommendedSkills = ['System Design', 'LeetCode DSA', 'Cloud Fundamentals', 'Git & GitHub', 'TypeScript', 'Docker'];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        {/* Welcome header */}
        <div className="flex items-center justify-between mb-8 animate-fade-up">
          <div>
            <p className="text-white/40 text-sm mb-1">Welcome back,</p>
            <h1 className="font-display font-bold text-3xl text-white">
              Hey, {firstName}! 👋
            </h1>
          </div>
          <button onClick={() => onNavigate('assessment')} className="btn-primary py-2.5 px-5 text-sm hidden sm:flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> New Assessment
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Career Score', value: `${careerScore}`, suffix: '/100', icon: Target, color: 'text-primary-400', bg: 'from-primary-500/10 to-violet-500/10', border: 'border-primary-500/20' },
            { label: 'Assessments Done', value: `${reports.length}`, suffix: '', icon: Brain, color: 'text-violet-400', bg: 'from-violet-500/10 to-purple-500/10', border: 'border-violet-500/20' },
            { label: 'Saved Careers', value: `${bookmarks.filter(b => b.type === 'career').length}`, suffix: '', icon: Bookmark, color: 'text-amber-400', bg: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-500/20' },
            { label: 'Certificates', value: '0', suffix: '', icon: Award, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/20' },
          ].map(stat => (
            <div key={stat.label} className={`glass-card p-5 bg-gradient-to-br ${stat.bg} border ${stat.border} animate-fade-up`}>
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex items-end gap-0.5">
                <span className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</span>
                {stat.suffix && <span className="text-white/30 text-sm mb-0.5">{stat.suffix}</span>}
              </div>
              <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Quick actions */}
            <div className="glass-card p-5 animate-fade-up">
              <h3 className="font-display font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActions.map(action => (
                  <button
                    key={action.page}
                    onClick={() => onNavigate(action.page)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-white/60 text-center">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Career score */}
            <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-white">Career Readiness Score</h3>
                <span className="text-primary-400 font-bold">{careerScore}/100</span>
              </div>
              <div className="progress-bar h-3 mb-4">
                <div className="progress-fill h-full" style={{ width: `${careerScore}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Profile', pct: profile?.branch ? 80 : 30, color: 'bg-emerald-400' },
                  { label: 'Assessment', pct: reports.length > 0 ? 100 : 0, color: 'bg-primary-400' },
                  { label: 'Roadmap', pct: 0, color: 'bg-violet-400' },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className="text-xs text-white/40 mb-1.5">{item.label}</div>
                    <div className="progress-bar h-1.5">
                      <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.pct}%` }} />
                    </div>
                    <div className="text-xs text-white/50 mt-1">{item.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent assessments */}
            <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-white">Recent Assessments</h3>
                <button onClick={() => onNavigate('assessment')} className="text-xs text-primary-400 hover:text-primary-300">+ New</button>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => <div key={i} className="h-14 bg-white/5 rounded-xl shimmer" />)}
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/30 text-sm mb-3">No assessments yet</p>
                  <button onClick={() => onNavigate('assessment')} className="btn-primary py-2 px-4 text-sm">Take Your First Assessment</button>
                </div>
              ) : (
                <div className="space-y-2">
                  {reports.map(report => {
                    const matches = (report.results as { matches?: { careerId: string; matchPercent: number }[] })?.matches || [];
                    const topMatch = matches[0];
                    const topCareer = topMatch ? careerDomains.find(c => c.id === topMatch.careerId) : null;
                    return (
                      <div key={report.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                        <span className="text-2xl">{topCareer?.icon || '🎯'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium truncate">{report.title}</p>
                          <p className="text-xs text-white/40 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(report.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        {topMatch && (
                          <span className="text-xs font-bold text-primary-400 flex-shrink-0">{topMatch.matchPercent}% match</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Profile card */}
            <div className="glass-card p-5 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-white">{profile?.full_name || 'Your Profile'}</p>
                  <p className="text-xs text-white/40">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Branch</span>
                  <span className="text-white/70">{profile?.branch || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">CGPA</span>
                  <span className="text-white/70">{profile?.cgpa || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">College</span>
                  <span className="text-white/70 truncate ml-2">{profile?.college || 'Not set'}</span>
                </div>
              </div>
              <button className="btn-secondary w-full mt-4 py-2 text-sm flex items-center justify-center gap-2">
                <User className="w-4 h-4" /> Edit Profile
              </button>
            </div>

            {/* Bookmarks */}
            <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-white text-sm">Saved Careers</h3>
                <Bookmark className="w-4 h-4 text-amber-400" />
              </div>
              {bookmarks.filter(b => b.type === 'career').length === 0 ? (
                <p className="text-white/30 text-xs text-center py-4">No saved careers yet. Explore careers and bookmark them!</p>
              ) : (
                <div className="space-y-2">
                  {bookmarks.filter(b => b.type === 'career').map(bm => {
                    const career = careerDomains.find(c => c.id === bm.reference_id);
                    return career ? (
                      <div key={bm.id} className="flex items-center gap-2 text-sm">
                        <span>{career.icon}</span>
                        <span className="text-white/60 flex-1">{career.title}</span>
                        <ChevronRight className="w-4 h-4 text-white/30" />
                      </div>
                    ) : null;
                  })}
                </div>
              )}
              <button onClick={() => onNavigate('explorer')} className="text-xs text-primary-400 hover:text-primary-300 mt-3 block">
                Explore more careers →
              </button>
            </div>

            {/* Recommended skills */}
            <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-display font-semibold text-white text-sm mb-4">Recommended Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {recommendedSkills.map(skill => (
                  <span key={skill} className="tag bg-primary-500/10 text-primary-300 border border-primary-500/20 text-xs">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
