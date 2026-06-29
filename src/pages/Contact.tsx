import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Github, Youtube, CheckCircle, ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Is CareerAI free to use?', a: 'Yes! The core features including AI Assessment, Roadmaps, Career Explorer, and Chatbot are completely free. We also offer a premium plan with advanced features.' },
  { q: 'How accurate are the career recommendations?', a: 'Our AI uses a multi-factor analysis including your skills, interests, CGPA, branch, and work preferences. Results are 85–95% aligned with real placement outcomes based on our student cohort data.' },
  { q: 'Can I save my assessment results?', a: 'Yes! Create a free account and all your assessments, bookmarks, and progress are saved automatically in your personal dashboard.' },
  { q: 'Do you provide placement assistance?', a: 'We provide guidance, roadmaps, and preparation resources. For direct placement assistance, we partner with select companies through our premium Career Connect program.' },
  { q: 'Is the salary data up to date?', a: 'Our salary database is updated quarterly using data from LinkedIn, Glassdoor, Naukri, and direct partnerships with companies. Last updated: Q4 2024.' },
  { q: 'Can I use CareerAI for non-CS branches?', a: 'Absolutely! CareerAI supports ECE, EE, ME, CE and other branches. Many tech roles are open to all engineering graduates with the right skills.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@careerai.in', href: 'mailto:contact@careerai.in' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MapPin, label: 'Location', value: 'Koramangala, Bangalore, India', href: '#' },
  ];

  const socials = [
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <div className="tag bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-4 mx-auto">
            <Mail className="w-3 h-3" /> Contact Us
          </div>
          <h1 className="section-heading text-white mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Have questions, feedback, or need help? We'd love to hear from you. Our team responds within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact info */}
          <div className="space-y-5">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="glass-card p-5 flex items-center gap-4 card-hover block animate-fade-up"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 flex items-center justify-center border border-primary-500/20">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">{label}</p>
                  <p className="text-white font-medium text-sm">{value}</p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="glass-card p-5 animate-fade-up">
              <p className="text-sm font-medium text-white mb-4">Follow Us</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/10 text-white/50 hover:text-white transition-all text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Office hours */}
            <div className="glass-card p-5 animate-fade-up">
              <p className="text-sm font-medium text-white mb-3">Support Hours</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/50">
                  <span>Mon – Fri</span>
                  <span>9:00 AM – 7:00 PM IST</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Sat</span>
                  <span>10:00 AM – 4:00 PM IST</span>
                </div>
                <div className="flex justify-between text-white/30">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="glass-card p-12 text-center h-full flex flex-col items-center justify-center animate-fade-up">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-5">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">Message Sent!</h3>
                <p className="text-white/50 max-w-sm mb-6">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another Message</button>
              </div>
            ) : (
              <div className="glass-card p-8 animate-fade-up">
                <h3 className="font-display font-semibold text-white text-xl mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/50 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/50 mb-1.5">Email *</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5">Subject *</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      className="select-field"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option>Career Guidance Question</option>
                      <option>Technical Support</option>
                      <option>Partnership Inquiry</option>
                      <option>Feedback / Suggestions</option>
                      <option>Report a Bug</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5">Message *</label>
                    <textarea
                      rows={5}
                      placeholder="Describe your question or feedback in detail..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="input-field resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display font-bold text-2xl text-white text-center mb-8">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-white text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 border-t border-white/10 pt-4 animate-fade-down">
                    <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
