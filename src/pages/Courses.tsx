import { useState } from 'react';
import { BookOpen, Star, Clock, Award, Filter, Search, ExternalLink } from 'lucide-react';
import { careerDomains, courses } from '../data/careers';

const platforms = ['All', 'Coursera', 'Udemy', 'LinkedIn Learning', 'A Cloud Guru'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Courses() {
  const [selectedCareer, setSelectedCareer] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = courses.filter(c => {
    const matchCareer = selectedCareer === 'all' || c.career === selectedCareer;
    const matchPlatform = selectedPlatform === 'All' || c.platform === selectedPlatform;
    const matchLevel = selectedLevel === 'All' || c.level === selectedLevel;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchCareer && matchPlatform && matchLevel && matchSearch;
  });

  const levelColors: Record<string, string> = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Intermediate: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    Advanced: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  };

  const platformColors: Record<string, string> = {
    Coursera: 'bg-blue-500/10 text-blue-400',
    Udemy: 'bg-orange-500/10 text-orange-400',
    'LinkedIn Learning': 'bg-sky-500/10 text-sky-400',
    'A Cloud Guru': 'bg-purple-500/10 text-purple-400',
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="tag bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-4 mx-auto">
            <BookOpen className="w-3 h-3" /> Course Recommendations
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-3">AI Course Recommendations</h1>
          <p className="text-white/50 max-w-xl mx-auto">Curated courses from top platforms to accelerate your career journey</p>
        </div>

        {/* Career filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <button
            onClick={() => setSelectedCareer('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCareer === 'all' ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'glass text-white/50 hover:text-white'}`}
          >
            All Careers
          </button>
          {careerDomains.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCareer(c.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCareer === c.id ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'glass text-white/50 hover:text-white'}`}
            >
              {c.icon} {c.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search courses or skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/40" />
            <div className="flex gap-2">
              {platforms.map(p => (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${selectedPlatform === p ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'glass text-white/50 hover:text-white'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {levels.map(l => (
              <button
                key={l}
                onClick={() => setSelectedLevel(l)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${selectedLevel === l ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'glass text-white/50 hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-white/40 text-sm mb-5">Showing {filtered.length} courses</p>

        {/* Course grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course, i) => (
            <div key={course.id} className="glass-card p-6 flex flex-col card-hover animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span className={`tag border text-xs ${levelColors[course.level] || 'bg-white/10 text-white/50'}`}>
                  {course.level}
                </span>
                <span className={`tag text-xs ${platformColors[course.platform] || 'bg-white/10 text-white/50'}`}>
                  {course.platform}
                </span>
              </div>

              <h3 className="font-display font-semibold text-white mb-2 flex-1">{course.title}</h3>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-white/40 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {course.rating}
                </span>
                {course.certificate && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Award className="w-3.5 h-3.5" /> Cert
                  </span>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {course.skills.slice(0, 4).map(skill => (
                  <span key={skill} className="tag bg-white/5 text-white/40 border border-white/10 text-xs py-0.5">{skill}</span>
                ))}
              </div>

              {/* CTA */}
              <button className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 mt-auto">
                Enroll Now <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/30 text-lg mb-4">No courses found for your filters</p>
            <button onClick={() => { setSelectedCareer('all'); setSelectedPlatform('All'); setSelectedLevel('All'); setSearch(''); }} className="btn-outline">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
