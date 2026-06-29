import { Brain, Twitter, Linkedin, Github, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const footerLinks = {
    Platform: [
      { label: 'AI Assessment', page: 'assessment' },
      { label: 'Learning Roadmaps', page: 'roadmap' },
      { label: 'Salary Predictor', page: 'salary' },
      { label: 'Course Finder', page: 'courses' },
      { label: 'Career Explorer', page: 'explorer' },
    ],
    Company: [
      { label: 'About Us', page: 'about' },
      { label: 'Contact', page: 'contact' },
      { label: 'Dashboard', page: 'dashboard' },
    ],
    Resources: [
      { label: 'Blog', page: 'home' },
      { label: 'Case Studies', page: 'home' },
      { label: 'API Docs', page: 'home' },
    ],
  };

  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-950/80 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Career<span className="gradient-text">AI</span>
              </span>
            </button>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Empowering B.Tech students with AI-driven career guidance, personalized roadmaps, and industry insights.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
                { icon: Mail, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-white/40">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> contact@careerai.in
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> +91 98765 43210
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Bangalore, India
              </span>
            </div>
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} CareerAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
