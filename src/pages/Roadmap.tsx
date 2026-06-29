import { useState } from 'react';
import { BookOpen, Clock, ChevronRight, CheckCircle, Award, Code, Briefcase, Mic, Star, ChevronDown } from 'lucide-react';
import { careerDomains } from '../data/careers';
import { roadmaps } from '../data/careers';

interface RoadmapProps {
  onNavigate: (page: string) => void;
}

const levelColors = {
  Beginner: 'from-emerald-500 to-teal-500',
  Intermediate: 'from-primary-500 to-blue-500',
  Advanced: 'from-violet-500 to-purple-500',
};
const levelBg = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Intermediate: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  Advanced: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

export default function Roadmap({ onNavigate }: RoadmapProps) {
  const [selectedCareer, setSelectedCareer] = useState('ai-ml');
  const [expandedStage, setExpandedStage] = useState<number | null>(0);

  const roadmap = roadmaps[selectedCareer];
  const career = careerDomains.find(c => c.id === selectedCareer);
  const availableRoadmaps = Object.keys(roadmaps);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="tag bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-4 mx-auto">
            <BookOpen className="w-3 h-3" /> Learning Roadmaps
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-3">Personalized Learning Roadmaps</h1>
          <p className="text-white/50 max-w-xl mx-auto">Step-by-step career roadmaps from beginner to job-ready professional</p>
        </div>

        {/* Career selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {careerDomains.filter(c => availableRoadmaps.includes(c.id)).concat(careerDomains.filter(c => !availableRoadmaps.includes(c.id))).slice(0, 12).map(career => (
            <button
              key={career.id}
              onClick={() => { if (availableRoadmaps.includes(career.id)) { setSelectedCareer(career.id); setExpandedStage(0); } }}
              className={`glass-card p-3 text-center transition-all duration-200 ${
                selectedCareer === career.id
                  ? 'border-primary-500/40 bg-primary-500/10'
                  : availableRoadmaps.includes(career.id) ? 'hover:border-white/20 cursor-pointer' : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="text-2xl mb-1">{career.icon}</div>
              <div className="text-xs text-white/60 leading-tight">{career.title.split(' ')[0]}</div>
              {!availableRoadmaps.includes(career.id) && <div className="text-xs text-white/30 mt-0.5">Coming soon</div>}
            </button>
          ))}
        </div>

        {roadmap && career && (
          <>
            {/* Roadmap header */}
            <div className="glass-card p-6 mb-6 animate-fade-up">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{career.icon}</span>
                  <div>
                    <h2 className="font-display font-bold text-2xl text-white">{roadmap.title}</h2>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="flex items-center gap-1.5 text-sm text-white/50">
                        <Clock className="w-4 h-4" /> {roadmap.totalDuration}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                        <Star className="w-4 h-4" /> {career.avgSalary} after completion
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:ml-auto flex gap-2">
                  <button onClick={() => onNavigate('courses')} className="btn-primary py-2 px-4 text-sm">
                    Find Courses
                  </button>
                  <button onClick={() => onNavigate('salary')} className="btn-secondary py-2 px-4 text-sm">
                    Salary Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-violet-500 to-purple-500 opacity-30 hidden md:block" />

              <div className="space-y-4">
                {roadmap.stages.map((stage, i) => (
                  <div key={stage.level} className="md:pl-16 relative animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    {/* Timeline dot */}
                    <div className={`absolute left-3.5 top-6 w-5 h-5 rounded-full bg-gradient-to-br ${levelColors[stage.level]} hidden md:flex items-center justify-center shadow-lg`}>
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>

                    <div className="glass-card overflow-hidden">
                      {/* Stage header */}
                      <button
                        onClick={() => setExpandedStage(expandedStage === i ? null : i)}
                        className="w-full flex items-center gap-4 p-5 text-left"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${levelColors[stage.level]} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <span className="text-white font-bold text-xs">{i + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-display font-semibold text-white">{stage.level}</h3>
                            <span className={`tag border text-xs ${levelBg[stage.level]}`}>{stage.duration}</span>
                          </div>
                          <p className="text-sm text-white/40">{stage.topics.slice(0, 3).join(', ')}...</p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${expandedStage === i ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Stage content */}
                      {expandedStage === i && (
                        <div className="px-5 pb-6 border-t border-white/10 pt-5 animate-fade-down">
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {/* Topics */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="w-4 h-4 text-primary-400" />
                                <h4 className="text-sm font-medium text-white">Topics to Learn</h4>
                              </div>
                              <ul className="space-y-1.5">
                                {stage.topics.map(topic => (
                                  <li key={topic} className="flex items-start gap-2 text-sm text-white/60">
                                    <ChevronRight className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Projects */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Code className="w-4 h-4 text-violet-400" />
                                <h4 className="text-sm font-medium text-white">Projects to Build</h4>
                              </div>
                              <ul className="space-y-1.5">
                                {stage.projects.map(project => (
                                  <li key={project} className="flex items-start gap-2 text-sm text-white/60">
                                    <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                                    {project}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Certifications & Resources */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Award className="w-4 h-4 text-amber-400" />
                                <h4 className="text-sm font-medium text-white">Certifications</h4>
                              </div>
                              <ul className="space-y-1.5 mb-4">
                                {stage.certifications.map(cert => (
                                  <li key={cert} className="flex items-start gap-2 text-sm text-white/60">
                                    <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    {cert}
                                  </li>
                                ))}
                              </ul>
                              <div className="flex items-center gap-2 mb-3">
                                <Briefcase className="w-4 h-4 text-emerald-400" />
                                <h4 className="text-sm font-medium text-white">Resources</h4>
                              </div>
                              <ul className="space-y-1.5">
                                {stage.resources.map(res => (
                                  <li key={res} className="flex items-start gap-2 text-sm text-white/60">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0 mt-1.5" />
                                    {res}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Interview prep */}
                <div className="md:pl-16 relative animate-fade-up" style={{ animationDelay: '0.4s' }}>
                  <div className="absolute left-3.5 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 hidden md:flex items-center justify-center shadow-lg">
                    <Mic className="w-3 h-3 text-white" />
                  </div>
                  <div className="glass-card p-6 border-amber-500/20">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <Mic className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="font-display font-semibold text-white">Interview Preparation</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {roadmap.interviewPrep.map(tip => (
                        <div key={tip} className="flex items-center gap-2 text-sm text-white/60 bg-white/5 px-3 py-2 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
