import { useState } from 'react';
import { Brain, ChevronRight, ChevronLeft, Sparkles, TrendingUp, Target, AlertCircle, CheckCircle, Lightbulb, Download, BookOpen } from 'lucide-react';
import { careerDomains } from '../data/careers';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface AssessmentProps {
  onNavigate: (page: string) => void;
}

interface FormData {
  name: string;
  branch: string;
  cgpa: string;
  skills: string;
  languages: string;
  interests: string;
  workStyle: string;
  experience: string;
  certifications: string;
  goals: string;
}

interface CareerMatch {
  career: typeof careerDomains[0];
  matchPercent: number;
  strengths: string[];
  gaps: string[];
  suggestions: string[];
}

const branches = ['Computer Science (CSE)', 'Information Technology (IT)', 'Electronics & Communication (ECE)', 'Electrical Engineering (EE)', 'Mechanical Engineering (ME)', 'Civil Engineering (CE)', 'Chemical Engineering (ChE)', 'Other'];
const workStyles = ['Remote First', 'Hybrid', 'On-site', 'Startup culture', 'Corporate environment', 'Research-oriented'];
const experienceOptions = ['Fresher (0 years)', '< 1 year (Intern)', '1–2 years', '2–4 years', '4+ years'];

function generateMatches(data: FormData): CareerMatch[] {
  const skills = (data.skills + ' ' + data.languages + ' ' + data.interests + ' ' + data.certifications).toLowerCase();
  const cgpaNum = parseFloat(data.cgpa) || 7;

  const skillWeights: Record<string, string[]> = {
    'ai-ml': ['python', 'machine learning', 'tensorflow', 'pytorch', 'data', 'statistics', 'numpy', 'scikit'],
    'data-science': ['python', 'sql', 'data', 'analytics', 'tableau', 'statistics', 'r', 'excel'],
    'web-dev': ['javascript', 'react', 'html', 'css', 'node', 'typescript', 'angular', 'vue'],
    'cyber-security': ['security', 'networking', 'kali', 'ethical hacking', 'linux', 'firewall', 'ctf'],
    'cloud': ['aws', 'azure', 'gcp', 'cloud', 'docker', 'kubernetes', 'devops', 'terraform'],
    'devops': ['docker', 'jenkins', 'kubernetes', 'ci/cd', 'ansible', 'git', 'bash', 'linux'],
    'mobile': ['flutter', 'react native', 'android', 'ios', 'kotlin', 'swift', 'firebase'],
    'uiux': ['figma', 'design', 'ux', 'ui', 'adobe', 'prototyping', 'sketch', 'canva'],
    'blockchain': ['solidity', 'ethereum', 'web3', 'smart contract', 'blockchain', 'defi', 'nft'],
    'product': ['product', 'management', 'agile', 'scrum', 'analytics', 'strategy', 'roadmap'],
  };

  return careerDomains.map(career => {
    const weights = skillWeights[career.id] || [];
    let matchCount = weights.filter(w => skills.includes(w)).length;
    const maxMatch = weights.length || 1;
    let matchPercent = Math.round((matchCount / maxMatch) * 60);

    // CGPA bonus
    if (cgpaNum >= 8.5) matchPercent += 20;
    else if (cgpaNum >= 7.5) matchPercent += 15;
    else if (cgpaNum >= 6.5) matchPercent += 10;
    else matchPercent += 5;

    // Experience bonus
    if (data.experience.includes('1–2') || data.experience.includes('2–4')) matchPercent += 10;
    if (data.experience.includes('4+')) matchPercent += 15;

    // Certification bonus
    if (data.certifications.trim().length > 10) matchPercent += 5;

    matchPercent = Math.min(98, Math.max(30, matchPercent));

    const strengths = career.skills.slice(0, 3).filter(s => skills.includes(s.toLowerCase()));
    if (strengths.length === 0) strengths.push('Analytical thinking', 'Problem solving');

    const gaps = career.skills.slice(0, 4).filter(s => !skills.includes(s.toLowerCase())).slice(0, 3);
    const suggestions = [
      `Complete a ${career.title} certification on Coursera or Udemy`,
      `Build 2–3 portfolio projects showcasing ${career.skills[0]} skills`,
      gaps.length > 0 ? `Learn ${gaps.join(', ')} to fill skill gaps` : 'Focus on advanced topics in your domain',
      'Contribute to open source projects in this field',
    ];

    return { career, matchPercent, strengths, gaps, suggestions };
  }).sort((a, b) => b.matchPercent - a.matchPercent).slice(0, 5);
}

export default function Assessment({ onNavigate }: AssessmentProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '', branch: '', cgpa: '', skills: '', languages: '', interests: '',
    workStyle: '', experience: '', certifications: '', goals: '',
  });
  const [results, setResults] = useState<CareerMatch[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const steps = [
    { title: 'Personal Info', icon: '👤' },
    { title: 'Skills', icon: '💡' },
    { title: 'Preferences', icon: '⚙️' },
    { title: 'Goals', icon: '🎯' },
  ];

  function update(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleGenerate() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    const matches = generateMatches(formData);
    setResults(matches);

    if (user) {
      await supabase.from('career_reports').insert({
        title: `Career Assessment – ${new Date().toLocaleDateString()}`,
        input_data: formData as unknown as Record<string, unknown>,
        results: { matches: matches.map(m => ({ careerId: m.career.id, matchPercent: m.matchPercent, strengths: m.strengths, gaps: m.gaps, suggestions: m.suggestions })) },
      });
    }
    setLoading(false);
  }

  const canNext = () => {
    if (step === 0) return formData.name && formData.branch && formData.cgpa;
    if (step === 1) return formData.skills && formData.languages;
    if (step === 2) return formData.workStyle && formData.experience;
    return formData.goals;
  };

  if (results) {
    const top = results[0];
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display font-bold text-3xl text-white mb-2">Your Career Analysis</h2>
            <p className="text-white/50">Based on your profile, here are your top career matches</p>
          </div>

          {/* Top match highlight */}
          <div className="glass-card p-8 mb-6 border-primary-500/20 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="text-5xl mb-2">{top.career.icon}</div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-primary-400">{top.matchPercent}%</div>
                  <div className="text-xs text-white/40">match</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="tag bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs">Best Match</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">{top.career.title}</h3>
                <p className="text-white/50 text-sm mb-4">{top.career.description}</p>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: `${top.matchPercent}%` }} />
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-emerald-400 font-medium">Avg Salary: {top.career.avgSalary}</span>
                  <span className="text-white/40">Growth: {top.career.growth}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => onNavigate('roadmap')} className="btn-primary py-2.5 px-5 text-sm">
                  <BookOpen className="inline w-4 h-4 mr-2" /> View Roadmap
                </button>
                <button className="btn-secondary py-2.5 px-5 text-sm">
                  <Download className="inline w-4 h-4 mr-2" /> Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Analysis cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h4 className="font-semibold text-white">Your Strengths</h4>
              </div>
              <ul className="space-y-2">
                {(top.strengths.length > 0 ? top.strengths : ['Problem solving', 'Analytical thinking', 'Coding fundamentals']).map(s => (
                  <li key={s} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h4 className="font-semibold text-white">Skill Gaps</h4>
              </div>
              <ul className="space-y-2">
                {(top.gaps.length > 0 ? top.gaps : ['Advanced algorithms', 'System design', 'Cloud deployment']).map(g => (
                  <li key={g} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-5 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-primary-400" />
                <h4 className="font-semibold text-white">Suggestions</h4>
              </div>
              <ul className="space-y-2">
                {top.suggestions.slice(0, 3).map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full flex-shrink-0 mt-1.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All matches */}
          <h3 className="font-display font-semibold text-white mb-4">All Career Matches</h3>
          <div className="space-y-3">
            {results.map((match, i) => (
              <div key={match.career.id} className="glass-card p-5 flex items-center gap-4 card-hover animate-fade-up" style={{ animationDelay: `${0.1 * i}s` }}>
                <span className="text-2xl">{match.career.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-white text-sm">{match.career.title}</h4>
                    <span className={`font-bold text-sm ${i === 0 ? 'text-primary-400' : 'text-white/60'}`}>{match.matchPercent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${match.matchPercent}%`, transitionDelay: `${i * 0.1}s` }} />
                  </div>
                </div>
                <button onClick={() => onNavigate('roadmap')} className="text-xs text-primary-400 hover:text-primary-300 whitespace-nowrap ml-2">
                  View Roadmap →
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <button onClick={() => { setResults(null); setStep(0); }} className="btn-secondary flex-1">
              Retake Assessment
            </button>
            <button onClick={() => onNavigate('dashboard')} className="btn-primary flex-1">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-500/25">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">AI Career Assessment</h1>
          <p className="text-white/50">Answer a few questions and our AI will match you with the perfect careers</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-white' : 'text-white/30'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i < step ? 'bg-emerald-500' : i === step ? 'bg-gradient-to-br from-primary-500 to-violet-500' : 'bg-white/10'
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : <span>{s.icon}</span>}
                </div>
                <span className="hidden sm:block text-xs font-medium">{s.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${i < step ? 'bg-emerald-500' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="glass-card p-8 animate-fade-up">
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-white text-lg mb-6">Personal Information</h3>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Full Name *</label>
                <input type="text" placeholder="Enter your full name" value={formData.name} onChange={e => update('name', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">B.Tech Branch *</label>
                <select value={formData.branch} onChange={e => update('branch', e.target.value)} className="select-field">
                  <option value="">Select your branch</option>
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Current CGPA *</label>
                <input type="number" step="0.1" min="0" max="10" placeholder="e.g. 8.5" value={formData.cgpa} onChange={e => update('cgpa', e.target.value)} className="input-field" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-white text-lg mb-6">Skills & Technologies</h3>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Technical Skills *</label>
                <textarea rows={3} placeholder="e.g. Data structures, Machine learning, Web development, Databases..." value={formData.skills} onChange={e => update('skills', e.target.value)} className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Programming Languages *</label>
                <input type="text" placeholder="e.g. Python, JavaScript, Java, C++..." value={formData.languages} onChange={e => update('languages', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Areas of Interest</label>
                <input type="text" placeholder="e.g. AI, Cloud computing, Mobile apps, Cybersecurity..." value={formData.interests} onChange={e => update('interests', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Certifications (if any)</label>
                <input type="text" placeholder="e.g. AWS Cloud Practitioner, Google Analytics, TensorFlow..." value={formData.certifications} onChange={e => update('certifications', e.target.value)} className="input-field" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-white text-lg mb-6">Work Preferences</h3>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Preferred Work Style *</label>
                <div className="grid grid-cols-2 gap-2">
                  {workStyles.map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => update('workStyle', style)}
                      className={`p-3 rounded-xl text-sm text-left transition-all border ${
                        formData.workStyle === style
                          ? 'border-primary-500 bg-primary-500/10 text-primary-300'
                          : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Experience Level *</label>
                <div className="space-y-2">
                  {experienceOptions.map(exp => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => update('experience', exp)}
                      className={`w-full p-3 rounded-xl text-sm text-left transition-all border ${
                        formData.experience === exp
                          ? 'border-primary-500 bg-primary-500/10 text-primary-300'
                          : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-white text-lg mb-6">Your Goals</h3>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Career Goals *</label>
                <textarea rows={4} placeholder="Describe your career aspirations. E.g. I want to become an AI engineer at a top tech company within 2 years. I'm passionate about building intelligent systems..." value={formData.goals} onChange={e => update('goals', e.target.value)} className="input-field resize-none" />
              </div>
              <div className="glass-card p-4 border-primary-500/20">
                <div className="flex gap-2">
                  <Sparkles className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/60">
                    Our AI will analyze your profile and generate personalized career matches with a detailed roadmap, skill gap analysis, and salary insights.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="btn-secondary flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!canNext() || loading}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing your profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Results
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {!user && (
          <div className="text-center mt-6 glass-card p-4 border-amber-500/20">
            <p className="text-sm text-white/50">
              <button onClick={() => onNavigate('login')} className="text-primary-400 hover:underline">Sign in</button> to save your assessment results and access your personal dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
