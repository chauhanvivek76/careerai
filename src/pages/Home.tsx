import { useState, useEffect } from 'react';
import { ArrowRight, Star, TrendingUp, Users, Award, Zap, ChevronRight, Play, CheckCircle, Sparkles } from 'lucide-react';
import { careerDomains } from '../data/careers';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { value: '50,000+', label: 'Students Guided', icon: Users },
  { value: '95%', label: 'Placement Rate', icon: Award },
  { value: '200+', label: 'Career Paths', icon: TrendingUp },
  { value: '4.9/5', label: 'Average Rating', icon: Star },
];

const successStories = [
  { name: 'Priya Sharma', college: 'IIT Delhi', placed: 'Google', role: 'ML Engineer', salary: '₹42 LPA', cgpa: '8.9', avatar: 'PS', branch: 'CSE' },
  { name: 'Rahul Verma', college: 'NIT Trichy', placed: 'Microsoft', role: 'Software Engineer', salary: '₹28 LPA', cgpa: '8.2', avatar: 'RV', branch: 'IT' },
  { name: 'Sneha Patel', college: 'BITS Pilani', placed: 'Amazon', role: 'Data Scientist', salary: '₹32 LPA', cgpa: '8.7', avatar: 'SP', branch: 'CS' },
  { name: 'Arjun Mehta', college: 'VIT Vellore', placed: 'Flipkart', role: 'DevOps Engineer', salary: '₹22 LPA', cgpa: '8.0', avatar: 'AM', branch: 'ECE' },
];

const features = [
  { icon: Sparkles, title: 'AI-Powered Analysis', desc: 'Advanced algorithms analyze your skills, interests, and goals to provide hyper-personalized career recommendations.' },
  { icon: TrendingUp, title: 'Real-Time Market Data', desc: 'Access live salary trends, in-demand skills, and hiring insights from top tech companies.' },
  { icon: Zap, title: 'Instant Roadmaps', desc: 'Get step-by-step learning paths tailored to your current skill level and target career.' },
  { icon: Award, title: 'Certification Guidance', desc: 'Know exactly which certifications matter for your target role and how to earn them efficiently.' },
];

export default function Home({ onNavigate }: HomeProps) {
  const [activeStory, setActiveStory] = useState(0);
  const [visibleDomains, setVisibleDomains] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => setActiveStory(s => (s + 1) % successStories.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating orbs */}
        <div className="absolute top-32 left-[10%] w-4 h-4 bg-primary-400/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-48 right-[15%] w-3 h-3 bg-violet-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-[20%] w-5 h-5 bg-primary-500/30 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-64 left-[70%] w-2 h-2 bg-violet-300/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium text-primary-300 mb-8 animate-fade-in border border-primary-500/20">
              <Sparkles className="w-4 h-4" />
              AI-Powered Career Intelligence Platform
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            <h1 className="section-heading text-5xl sm:text-6xl lg:text-7xl mb-6 animate-fade-up text-white">
              Find Your Perfect{' '}
              <span className="gradient-text">Career</span>{' '}
              with AI
            </h1>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 animate-fade-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
              Personalized career assessments, step-by-step roadmaps, salary insights, and AI guidance — everything a B.Tech student needs to land their dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <button onClick={() => onNavigate('assessment')} className="btn-primary text-base px-8 py-4 group">
                Start AI Assessment
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => onNavigate('explorer')} className="btn-secondary text-base px-8 py-4 group">
                <Play className="inline-block mr-2 w-4 h-4" />
                Explore Careers
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {['IIT Students', 'NIT Graduates', 'BITS Alumni', '200+ Colleges'].map((badge, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-white/40">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass-card p-6 text-center card-hover">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-3 border border-primary-500/20">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>
                <div className="font-display font-bold text-2xl text-white mb-1">{value}</div>
                <div className="text-sm text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4 mx-auto">
              <Sparkles className="w-3 h-3" /> Why CareerAI
            </div>
            <h2 className="section-heading text-white mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Our AI-powered platform gives B.Tech students an unfair advantage in the competitive tech job market.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="glass-card p-6 card-hover group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 flex items-center justify-center mb-5 border border-primary-500/20 group-hover:border-primary-500/40 transition-colors">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Domains */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/0 via-navy-900/50 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-4 mx-auto">
              <TrendingUp className="w-3 h-3" /> Career Domains
            </div>
            <h2 className="section-heading text-white mb-4">
              Explore{' '}
              <span className="gradient-text">Popular Careers</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              From AI/ML to Product Management — find the career path that aligns with your passion and skills.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {careerDomains.slice(0, visibleDomains).map((domain, i) => (
              <div
                key={domain.id}
                onClick={() => onNavigate('explorer')}
                className="glass-card p-6 cursor-pointer card-hover group animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{domain.icon}</span>
                    <div>
                      <h3 className="font-display font-semibold text-white text-sm group-hover:text-primary-300 transition-colors">
                        {domain.title}
                      </h3>
                      <div className={`text-xs font-medium mt-0.5 ${domain.color}`}>{domain.avgSalary}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {domain.growth}
                  </div>
                </div>
                <p className="text-xs text-white/50 mb-4 leading-relaxed">{domain.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {domain.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="tag bg-white/5 text-white/50 border border-white/10 text-xs py-0.5">
                      {skill}
                    </span>
                  ))}
                  {domain.skills.length > 3 && (
                    <span className="tag bg-white/5 text-white/30 text-xs py-0.5">+{domain.skills.length - 3}</span>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-white/30">{domain.roles.length} roles</span>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>

          {visibleDomains < careerDomains.length && (
            <div className="text-center mt-8">
              <button onClick={() => setVisibleDomains(careerDomains.length)} className="btn-secondary px-8">
                View All {careerDomains.length} Careers
                <ChevronRight className="inline ml-2 w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 mx-auto">
              <Star className="w-3 h-3" /> Success Stories
            </div>
            <h2 className="section-heading text-white mb-4">
              Students Who{' '}
              <span className="gradient-text">Made It</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {successStories.map((story, i) => (
              <div
                key={story.name}
                className={`glass-card p-6 card-hover cursor-pointer transition-all duration-300 ${activeStory === i ? 'border-primary-500/30 shadow-lg shadow-primary-500/10' : ''}`}
                onClick={() => setActiveStory(i)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white font-bold">
                    {story.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{story.name}</p>
                    <p className="text-xs text-white/50">{story.college}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Branch</span>
                    <span className="text-white/80">{story.branch}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">CGPA</span>
                    <span className="text-white/80">{story.cgpa}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Role</span>
                    <span className="text-white/80">{story.role}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white/40">{story.placed}</span>
                    <span className="text-sm font-bold text-emerald-400">{story.salary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-violet-600/10 pointer-events-none" />
            <div className="relative">
              <h2 className="section-heading text-white mb-4">
                Ready to Find Your{' '}
                <span className="gradient-text">Dream Career?</span>
              </h2>
              <p className="text-white/60 mb-8 text-lg">
                Join 50,000+ B.Tech students who've already discovered their perfect career path with CareerAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => onNavigate('assessment')} className="btn-primary px-10 py-4 text-base">
                  Start Free Assessment
                  <ArrowRight className="inline ml-2 w-5 h-5" />
                </button>
                <button onClick={() => onNavigate('signup')} className="btn-secondary px-10 py-4 text-base">
                  Create Free Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
