import { useState } from 'react';
import { Search, TrendingUp, Users, DollarSign, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { careerDomains } from '../data/careers';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface ExplorerProps {
  onNavigate: (page: string) => void;
}

export default function Explorer({ onNavigate }: ExplorerProps) {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<typeof careerDomains[0] | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const filtered = careerDomains.filter(c =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  async function toggleBookmark(careerId: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!user) { onNavigate('login'); return; }
    const isBookmarked = bookmarked.has(careerId);
    const next = new Set(bookmarked);
    if (isBookmarked) {
      next.delete(careerId);
      await supabase.from('bookmarks').delete().eq('user_id', user.id).eq('reference_id', careerId).eq('type', 'career');
    } else {
      next.add(careerId);
      const career = careerDomains.find(c => c.id === careerId);
      await supabase.from('bookmarks').upsert({ type: 'career', reference_id: careerId, metadata: { title: career?.title, icon: career?.icon } });
    }
    setBookmarked(next);
  }

  if (selectedDomain) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <button onClick={() => setSelectedDomain(null)} className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            ← Back to Explorer
          </button>

          <div className="glass-card p-8 mb-6 animate-fade-up">
            <div className="flex items-start gap-5">
              <span className="text-6xl">{selectedDomain.icon}</span>
              <div className="flex-1">
                <h1 className="font-display font-bold text-3xl text-white mb-2">{selectedDomain.title}</h1>
                <p className="text-white/60 text-lg mb-4">{selectedDomain.description}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">{selectedDomain.avgSalary}</span>
                    <span className="text-white/40 text-sm">avg salary</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold">{selectedDomain.growth}</span>
                    <span className="text-white/40 text-sm">job growth</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => onNavigate('roadmap')} className="btn-primary py-2.5 px-5 text-sm">View Roadmap</button>
                <button onClick={() => onNavigate('assessment')} className="btn-secondary py-2.5 px-5 text-sm">Take Assessment</button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Skills */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-display font-semibold text-white mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedDomain.skills.map(skill => (
                  <span key={skill} className="tag bg-primary-500/10 text-primary-300 border border-primary-500/20">{skill}</span>
                ))}
              </div>
            </div>

            {/* Roles */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-display font-semibold text-white mb-4">Job Roles</h3>
              <div className="space-y-2">
                {selectedDomain.roles.map(role => (
                  <div key={role} className="flex items-center gap-2 text-sm text-white/60 bg-white/5 px-3 py-2 rounded-lg">
                    <ChevronRight className="w-4 h-4 text-primary-400" />
                    {role}
                  </div>
                ))}
              </div>
            </div>

            {/* Career path */}
            <div className="glass-card p-6 md:col-span-2 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-display font-semibold text-white mb-4">Typical Career Progression</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                {['Intern / Fresher', 'Junior Engineer', 'Mid-level Engineer', 'Senior Engineer', 'Lead / Architect', 'Director / VP'].map((stage, i, arr) => (
                  <div key={stage} className="flex items-center gap-2">
                    <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-primary-500/10 to-violet-500/10 border border-primary-500/20 text-xs text-center">
                      <div className="text-white/30 text-xs mb-0.5">{['0–1y', '1–3y', '3–5y', '5–8y', '8–12y', '12y+'][i]}</div>
                      <div className="text-white/80 font-medium">{stage}</div>
                    </div>
                    {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Top companies */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="font-display font-semibold text-white mb-4">Top Hiring Companies</h3>
              <div className="flex flex-wrap gap-2">
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Flipkart', 'Infosys', 'TCS'].map(co => (
                  <span key={co} className="tag bg-white/5 border border-white/10 text-white/60 text-sm">{co}</span>
                ))}
              </div>
            </div>

            {/* Work life */}
            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <h3 className="font-display font-semibold text-white mb-4">Work Lifestyle</h3>
              <div className="space-y-3">
                {[
                  { label: 'Remote-friendly', value: '85%', color: 'bg-emerald-400' },
                  { label: 'Work-life balance', value: '72%', color: 'bg-primary-400' },
                  { label: 'Growth potential', value: '92%', color: 'bg-violet-400' },
                  { label: 'Job satisfaction', value: '78%', color: 'bg-amber-400' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/50">{item.label}</span>
                      <span className="text-white/70">{item.value}</span>
                    </div>
                    <div className="progress-bar">
                      <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: item.value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="tag bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4 mx-auto">
            <Users className="w-3 h-3" /> Career Explorer
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-3">Explore Tech Careers</h1>
          <p className="text-white/50 max-w-xl mx-auto">Discover career paths with real salary data, growth trends, and skill requirements</p>
        </div>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Search careers or skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-12 py-4 text-base"
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Active Career Paths', value: careerDomains.length, icon: TrendingUp },
            { label: 'Avg Salary (Mid-level)', value: '₹18 LPA', icon: DollarSign },
            { label: 'Students Placed', value: '50,000+', icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass-card p-4 text-center">
              <Icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
              <div className="font-display font-bold text-white">{value}</div>
              <div className="text-xs text-white/40">{label}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((domain, i) => (
            <div
              key={domain.id}
              onClick={() => setSelectedDomain(domain)}
              className="glass-card p-5 cursor-pointer card-hover group relative animate-fade-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {/* Bookmark */}
              <button
                onClick={e => toggleBookmark(domain.id, e)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg glass hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
              >
                {bookmarked.has(domain.id)
                  ? <BookmarkCheck className="w-4 h-4 text-primary-400" />
                  : <Bookmark className="w-4 h-4 text-white/40" />}
              </button>

              <div className="text-4xl mb-3">{domain.icon}</div>
              <h3 className="font-display font-semibold text-white text-sm mb-1 group-hover:text-primary-300 transition-colors">
                {domain.title}
              </h3>
              <p className="text-xs text-white/40 mb-3 line-clamp-2">{domain.description}</p>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Avg Salary</span>
                  <span className="text-emerald-400 font-medium">{domain.avgSalary}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Growth</span>
                  <span className="text-primary-400 font-medium">{domain.growth}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {domain.skills.slice(0, 2).map(s => (
                  <span key={s} className="tag bg-white/5 text-white/40 text-xs py-0.5 border border-white/10">{s}</span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-primary-400 text-xs group-hover:gap-2 gap-1 transition-all">
                <span>Explore career</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/30 text-lg">No careers match "{search}"</p>
            <button onClick={() => setSearch('')} className="btn-outline mt-4">Clear Search</button>
          </div>
        )}
      </div>
    </div>
  );
}
