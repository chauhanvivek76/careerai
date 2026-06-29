import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  'What career suits a CSE student?',
  'How to prepare for tech interviews?',
  'Best certifications for AI/ML?',
  'Resume tips for freshers',
];

function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase();

  if (lower.includes('career') && (lower.includes('cse') || lower.includes('cs') || lower.includes('computer'))) {
    return "CSE students have excellent career options! Based on current market demand, here are the top paths:\n\n🤖 **AI/ML Engineer** – ₹12–30 LPA (fastest growing)\n💻 **Full Stack Developer** – ₹8–22 LPA (high demand)\n☁️ **Cloud Engineer** – ₹11–26 LPA (excellent remote options)\n🔒 **Cyber Security** – ₹10–28 LPA (critical shortage of talent)\n\nI recommend taking our AI Assessment to get a personalized match based on your specific skills and interests!";
  }
  if (lower.includes('interview') || lower.includes('placement')) {
    return "Great question! Here's a structured interview prep plan:\n\n**Phase 1 (1–2 months):**\n• Master DSA – practice 2–3 LeetCode problems daily\n• Focus on Arrays, Trees, Graphs, DP\n\n**Phase 2 (2–4 weeks before):**\n• Core CS concepts (OS, DBMS, Networks, OOPs)\n• System Design basics for SDE-2+ roles\n\n**Phase 3 (Interview week):**\n• Mock interviews on Pramp or Interviewing.io\n• Review behavioral questions (STAR format)\n• Research each company's culture\n\nWant specific resources for any of these phases?";
  }
  if (lower.includes('salary') || lower.includes('package') || lower.includes('ctc')) {
    return "Salary ranges for fresh graduates (India, 2024):\n\n| Role | Entry | Mid (5yr) |\n|------|-------|----------|\n| AI/ML | ₹10–18L | ₹25–35L |\n| Data Science | ₹8–15L | ₹20–28L |\n| Full Stack | ₹6–12L | ₹15–22L |\n| DevOps | ₹8–14L | ₹18–26L |\n| Cloud | ₹10–16L | ₹22–32L |\n\nFactors that boost salary: certifications (+15–20%), tier-1 college (+20%), competitive programming (+10–15%), and relevant internships.\n\nCheck our Salary Predictor for personalized estimates!";
  }
  if (lower.includes('certificate') || lower.includes('certification')) {
    return "Top certifications by career path:\n\n🤖 **AI/ML:** DeepLearning.AI TF Developer, Google ML Engineer\n☁️ **Cloud:** AWS SAA, GCP ACE, Azure AZ-104\n🔒 **Security:** CompTIA Security+, CEH, OSCP\n💻 **Web Dev:** Meta Front-End, Google UX Design\n⚙️ **DevOps:** CKA, Terraform Associate, AWS DevOps\n\n**Tips:**\n• Start with Cloud Practitioner (AWS) – easiest entry\n• CompTIA Security+ is vendor-neutral and respected\n• Google certificates are beginner-friendly and recognized\n\nWhich domain are you targeting?";
  }
  if (lower.includes('resume') || lower.includes('cv')) {
    return "Resume tips for B.Tech students:\n\n✅ **Format:** 1 page (fresher), clean ATS-friendly template\n\n**Essential sections:**\n1. Contact info + LinkedIn + GitHub\n2. Education (CGPA if > 7.5)\n3. Skills (technical + tools)\n4. Projects (2–4 with impact metrics)\n5. Internships / Experience\n6. Certifications\n\n**Pro tips:**\n• Quantify achievements: 'Improved app performance by 40%'\n• Use action verbs: built, developed, automated, optimized\n• Tailor keywords to each job description (ATS optimization)\n• Include a link to your GitHub/portfolio\n• PDF format, max 1MB\n\nNeed help reviewing a specific section?";
  }
  if (lower.includes('roadmap') || lower.includes('path') || lower.includes('learn')) {
    return "Learning roadmaps depend on your target career. Here's a quick guide:\n\n**Starting from scratch:**\n1. Pick ONE domain (don't try everything at once)\n2. Follow structured roadmap (roadmap.sh is great)\n3. Build projects as you learn (not after)\n4. Contribute to open source\n5. Network and seek mentorship\n\n**Time estimates:**\n• Beginner level: 3–4 months\n• Job-ready level: 8–12 months\n• Senior level: 3–5 years\n\nCheck our Roadmaps section for detailed week-by-week plans for each career path!";
  }
  if (lower.includes('remote') || lower.includes('wfh') || lower.includes('work from home')) {
    return "Remote work opportunities in tech:\n\n**Most remote-friendly roles:**\n• Software Development (85% remote options)\n• Data Science (80%)\n• Cybersecurity (75%)\n• Cloud Engineering (80%)\n• UI/UX Design (70%)\n\n**Top remote-first companies hiring India:**\n• GitLab, Automattic, Basecamp\n• Remote.com, Deel\n• Many US/EU startups\n\n**Salary note:** Remote international roles can pay 2–5x more than local Indian salaries. With the right skills, ₹50–100 LPA is achievable remotely.";
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('help')) {
    return "Hello! 👋 I'm CareerAI Assistant, your personal career guidance mentor!\n\nI can help you with:\n🎯 Career path recommendations\n📚 Learning roadmaps and resources\n💰 Salary insights and negotiations\n📝 Resume building tips\n🎤 Interview preparation\n🏅 Certification guidance\n📊 Market trends and insights\n\nWhat would you like to know about your tech career?";
  }
  if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('ml')) {
    return "AI/ML is one of the hottest career paths right now!\n\n**Why AI/ML?**\n• ₹12–40 LPA salary range\n• 42% projected job growth\n• Applied in every industry\n\n**Getting started:**\n1. **Python** (numpy, pandas, matplotlib)\n2. **Math** (Linear Algebra, Statistics, Calculus)\n3. **Scikit-learn** → **TensorFlow/PyTorch**\n4. **Kaggle competitions** to build portfolio\n\n**Entry points:**\n• Andrew Ng's ML course (Coursera)\n• fast.ai Practical Deep Learning\n• Kaggle Learn (free)\n\nYour first goal: Complete Kaggle's Titanic competition!\n\nShall I create a personalized AI/ML roadmap for your current skill level?";
  }

  return "That's a great question! Based on my knowledge of the tech industry:\n\nFor the most accurate and personalized guidance, I recommend:\n\n1. **Take our AI Assessment** – Get career matches based on YOUR specific skills and goals\n2. **Explore Career Paths** – Browse all available career domains with salary data\n3. **Check Roadmaps** – Get step-by-step learning plans\n\nI can answer specific questions about:\n• Career paths and salaries\n• Interview preparation\n• Certifications and courses\n• Resume building\n• Industry trends\n\nWhat specific aspect of your career would you like to explore?";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! 👋 I'm your CareerAI assistant. Ask me anything about tech careers, interview prep, salary insights, or learning resources!" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text?: string) {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    const reply = getBotResponse(msg);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary-500 to-violet-500 rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/25 hover:scale-110 active:scale-95 transition-all duration-300 z-50 animate-glow"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 rounded-full border-2 border-navy-950 animate-pulse" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-[380px] transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[520px]'} flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-violet-600 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">CareerAI Assistant</p>
          <p className="text-white/60 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Online
          </p>
        </div>
        <button onClick={() => setIsMinimized(!isMinimized)} className="text-white/60 hover:text-white transition-colors">
          <Minimize2 className="w-4 h-4" />
        </button>
        <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-navy-900/95 backdrop-blur-xl">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-primary-500 to-violet-500 text-white rounded-tr-sm'
                    : 'bg-white/10 text-white/80 rounded-tl-sm border border-white/10'
                }`}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start animate-fade-up">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {messages.length === 1 && (
            <div className="px-3 py-2 bg-navy-900/95 border-t border-white/10">
              <p className="text-xs text-white/30 mb-2">Quick questions</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map(q => (
                  <button key={q} onClick={() => sendMessage(q)} className="text-xs px-2.5 py-1.5 rounded-full glass text-white/50 hover:text-white hover:bg-white/10 transition-all">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 bg-navy-900/95 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask about careers, skills, salaries..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-all"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 bg-gradient-to-br from-primary-500 to-violet-500 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/25 transition-all"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
