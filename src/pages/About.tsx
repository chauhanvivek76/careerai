import { Brain, Target, Eye, Heart, Users, Award, TrendingUp, Mail, Linkedin, Github, Sparkles, CheckCircle } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const team = [
  { name: 'Aryan Singh', role: 'Founder & CEO', bio: 'IIT Bombay alumnus. Ex-Google engineer with a passion for EdTech.', avatar: 'AS', social: { linkedin: '#', github: '#' } },
  { name: 'Priya Menon', role: 'Head of AI', bio: 'PhD in ML from IISc Bangalore. Built career AI at scale.', avatar: 'PM', social: { linkedin: '#', github: '#' } },
  { name: 'Rahul Joshi', role: 'Product Lead', bio: 'Ex-Flipkart PM. 8 years building ed-tech products students love.', avatar: 'RJ', social: { linkedin: '#', github: '#' } },
  { name: 'Sneha Iyer', role: 'Head of Content', bio: 'Career counselor with 10+ years guiding engineering students.', avatar: 'SI', social: { linkedin: '#', github: '#' } },
];

const benefits = [
  'Personalized AI career assessments in under 5 minutes',
  'Step-by-step roadmaps for 12+ tech career paths',
  'Real-time salary data from 500+ companies',
  'Curated course recommendations from top platforms',
  'AI chatbot available 24/7 for career guidance',
  'Save and track multiple career paths simultaneously',
  'Progress tracking and skill gap analysis',
  'Industry-expert crafted interview prep resources',
];

const stats = [
  { value: '50,000+', label: 'Students Guided', icon: Users },
  { value: '95%', label: 'Placement Rate', icon: Award },
  { value: '200+', label: 'Career Paths', icon: TrendingUp },
  { value: '4.9/5', label: 'Student Rating', icon: Heart },
];

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="tag bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-5 mx-auto">
            <Sparkles className="w-3 h-3" /> About CareerAI
          </div>
          <h1 className="section-heading text-white mb-5">
            Empowering Every B.Tech Student to{' '}
            <span className="gradient-text">Find Their Path</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            CareerAI was built from a simple belief: every engineering student deserves personalized, data-driven career guidance — not generic advice.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="glass-card p-6 text-center animate-fade-up">
              <Icon className="w-6 h-6 text-primary-400 mx-auto mb-3" />
              <div className="font-display font-bold text-2xl text-white mb-1">{value}</div>
              <div className="text-xs text-white/40">{label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="glass-card p-8 animate-fade-up">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-3">Our Mission</h2>
            <p className="text-white/60 leading-relaxed">
              To democratize career guidance using artificial intelligence — giving every B.Tech student, regardless of their college tier or network, access to world-class, personalized career planning tools that were previously only available to the privileged few.
            </p>
          </div>
          <div className="glass-card p-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-3">Our Vision</h2>
            <p className="text-white/60 leading-relaxed">
              A world where every engineering graduate lands a role they are passionate about — fully prepared, confident, and equipped with the right skills. We envision CareerAI becoming the go-to platform for 10 million students by 2030.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="glass-card p-8 mb-16 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-display font-bold text-2xl text-white mb-6 text-center">
            Why Students Love CareerAI
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map(b => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-3xl text-white text-center mb-10">
            Meet the Team Behind <span className="gradient-text">CareerAI</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <div key={member.name} className="glass-card p-6 text-center card-hover animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg">
                  {member.avatar}
                </div>
                <h3 className="font-display font-semibold text-white mb-0.5">{member.name}</h3>
                <p className="text-xs text-primary-400 mb-3">{member.role}</p>
                <p className="text-xs text-white/50 leading-relaxed mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a href={member.social.linkedin} className="text-white/30 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={member.social.github} className="text-white/30 hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card p-10 text-center border-primary-500/20 animate-fade-up">
          <Brain className="w-16 h-16 text-primary-400 mx-auto mb-5" />
          <h2 className="font-display font-bold text-2xl text-white mb-3">
            Ready to Find Your Dream Career?
          </h2>
          <p className="text-white/50 mb-6">Join 50,000+ students who've already discovered their path with CareerAI.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('assessment')} className="btn-primary px-8 py-3">
              Start Free Assessment
            </button>
            <button onClick={() => onNavigate('contact')} className="btn-secondary px-8 py-3">
              <Mail className="inline w-4 h-4 mr-2" /> Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
