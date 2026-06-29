import { useState } from 'react';
import { DollarSign, TrendingUp, MapPin, Briefcase, GraduationCap, Award, BarChart3 } from 'lucide-react';
import { careerDomains, salaryData } from '../data/careers';

export default function Salary() {
  const [careerId, setCareerId] = useState('ai-ml');
  const [location, setLocation] = useState('Bangalore');
  const [experience, setExperience] = useState('0');
  const [education, setEducation] = useState('BTech');

  const career = careerDomains.find(c => c.id === careerId);
  const salary = salaryData[careerId] || salaryData['web-dev'];
  const locationMultiplier = salary.locations[location] || 1.0;

  const educationMultiplier: Record<string, number> = { BTech: 1.0, MTech: 1.2, PhD: 1.4, Diploma: 0.8 };
  const expMultiplier = 1 + parseInt(experience) * 0.12;

  const entryLPA = Math.round(salary.entry * locationMultiplier * (educationMultiplier[education] || 1));
  const midLPA = Math.round(salary.mid * locationMultiplier * (educationMultiplier[education] || 1) * expMultiplier);
  const seniorLPA = Math.round(salary.senior * locationMultiplier * (educationMultiplier[education] || 1));
  const avgLPA = Math.round((entryLPA + midLPA) / 2);

  const growthData = [
    { year: 'Year 0', lpa: entryLPA },
    { year: 'Year 2', lpa: Math.round(entryLPA * 1.4) },
    { year: 'Year 4', lpa: Math.round(midLPA * 0.8) },
    { year: 'Year 6', lpa: midLPA },
    { year: 'Year 8', lpa: Math.round(midLPA * 1.3) },
    { year: 'Year 10+', lpa: seniorLPA },
  ];
  const maxLpa = Math.max(...growthData.map(d => d.lpa));

  const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai'];
  const educations = [
    { value: 'BTech', label: 'B.Tech / B.E.' },
    { value: 'MTech', label: 'M.Tech / MCA' },
    { value: 'PhD', label: 'PhD' },
    { value: 'Diploma', label: 'Diploma' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="tag bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 mx-auto">
            <DollarSign className="w-3 h-3" /> Salary Intelligence
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-3">Salary Predictor</h1>
          <p className="text-white/50 max-w-xl mx-auto">Get accurate salary estimates based on your role, location, and experience</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Filters */}
          <div className="glass-card p-6 h-fit animate-fade-up">
            <h3 className="font-display font-semibold text-white mb-5">Filter Options</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Career Domain
                </label>
                <select value={careerId} onChange={e => setCareerId(e.target.value)} className="select-field">
                  {careerDomains.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Location
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        location === loc ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-white/5 border border-white/10 text-white/50 hover:border-white/20'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Education Level
                </label>
                <div className="space-y-2">
                  {educations.map(edu => (
                    <button
                      key={edu.value}
                      onClick={() => setEducation(edu.value)}
                      className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all ${
                        education === edu.value ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300' : 'bg-white/5 border border-white/10 text-white/50 hover:border-white/20'
                      }`}
                    >
                      {edu.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Years of Experience: {experience}
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>0 yrs</span><span>15 yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-5">
            {/* Career badge */}
            {career && (
              <div className="glass-card p-4 flex items-center gap-3 animate-fade-up">
                <span className="text-3xl">{career.icon}</span>
                <div>
                  <h3 className="font-semibold text-white">{career.title}</h3>
                  <p className="text-sm text-white/40">{location} · {education} · {experience} yrs exp</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {career.growth} growth
                </div>
              </div>
            )}

            {/* Salary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Average', value: `₹${avgLPA} LPA`, color: 'text-white', bg: 'from-primary-500/10 to-violet-500/10', border: 'border-primary-500/20' },
                { label: 'Entry Level', value: `₹${entryLPA} LPA`, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/20' },
                { label: 'Mid Level', value: `₹${midLPA} LPA`, color: 'text-primary-400', bg: 'from-primary-500/10 to-blue-500/10', border: 'border-primary-500/20' },
                { label: 'Senior Level', value: `₹${seniorLPA} LPA`, color: 'text-violet-400', bg: 'from-violet-500/10 to-purple-500/10', border: 'border-violet-500/20' },
              ].map(card => (
                <div key={card.label} className={`glass-card p-4 bg-gradient-to-br ${card.bg} border ${card.border} text-center animate-fade-up`}>
                  <div className={`font-display font-bold text-lg ${card.color}`}>{card.value}</div>
                  <div className="text-xs text-white/40 mt-1">{card.label}</div>
                </div>
              ))}
            </div>

            {/* Salary growth chart */}
            <div className="glass-card p-6 animate-fade-up">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-primary-400" />
                <h3 className="font-display font-semibold text-white">Salary Growth Projection</h3>
              </div>
              <div className="relative">
                <div className="flex items-end gap-3 h-40">
                  {growthData.map((d, i) => (
                    <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-white/50 font-medium">₹{d.lpa}L</span>
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-primary-600 to-violet-500 transition-all duration-1000 ease-out"
                        style={{ height: `${(d.lpa / maxLpa) * 100}%`, opacity: 0.7 + (i / growthData.length) * 0.3 }}
                      />
                      <span className="text-xs text-white/30">{d.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills that increase salary */}
            <div className="glass-card p-6 animate-fade-up">
              <h3 className="font-display font-semibold text-white mb-4">High-Value Skills for {career?.title}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {(career?.skills || []).map((skill, i) => {
                  const bonus = [15, 20, 12, 18, 10, 25][i % 6];
                  return (
                    <div key={skill} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                      <span className="text-sm text-white/70">{skill}</span>
                      <span className="text-xs font-medium text-emerald-400">+{bonus}% salary</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
