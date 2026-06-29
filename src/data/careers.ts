export interface CareerDomain {
  id: string;
  title: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  avgSalary: string;
  growth: string;
  skills: string[];
  roles: string[];
}

export const careerDomains: CareerDomain[] = [
  {
    id: 'ai-ml',
    title: 'AI / ML Engineer',
    icon: '🤖',
    color: 'text-blue-400',
    gradient: 'from-blue-600 to-cyan-500',
    description: 'Build intelligent systems, train models, and deploy AI solutions at scale.',
    avgSalary: '₹12–30 LPA',
    growth: '+42%',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'MLOps', 'Statistics'],
    roles: ['ML Engineer', 'AI Researcher', 'NLP Engineer', 'Computer Vision Engineer'],
  },
  {
    id: 'data-science',
    title: 'Data Scientist',
    icon: '📊',
    color: 'text-violet-400',
    gradient: 'from-violet-600 to-purple-500',
    description: 'Extract insights from data to drive strategic business decisions.',
    avgSalary: '₹10–25 LPA',
    growth: '+36%',
    skills: ['Python', 'R', 'SQL', 'Tableau', 'Pandas', 'Statistics'],
    roles: ['Data Scientist', 'Data Analyst', 'Business Analyst', 'BI Developer'],
  },
  {
    id: 'web-dev',
    title: 'Full Stack Developer',
    icon: '💻',
    color: 'text-emerald-400',
    gradient: 'from-emerald-600 to-teal-500',
    description: 'Build end-to-end web applications from UI to backend systems.',
    avgSalary: '₹8–22 LPA',
    growth: '+25%',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs', 'Docker'],
    roles: ['Full Stack Dev', 'Frontend Dev', 'Backend Dev', 'Web Architect'],
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security Engineer',
    icon: '🔒',
    color: 'text-red-400',
    gradient: 'from-red-600 to-orange-500',
    description: 'Protect systems, networks, and data from cyber threats and attacks.',
    avgSalary: '₹10–28 LPA',
    growth: '+33%',
    skills: ['Networking', 'Ethical Hacking', 'SIEM', 'Python', 'Cryptography', 'Compliance'],
    roles: ['Security Analyst', 'Penetration Tester', 'SOC Analyst', 'Security Architect'],
  },
  {
    id: 'cloud',
    title: 'Cloud Engineer',
    icon: '☁️',
    color: 'text-sky-400',
    gradient: 'from-sky-600 to-blue-500',
    description: 'Design, deploy, and manage scalable cloud infrastructure and services.',
    avgSalary: '₹11–26 LPA',
    growth: '+28%',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Docker'],
    roles: ['Cloud Architect', 'Cloud DevOps', 'Solutions Architect', 'Site Reliability Engineer'],
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    icon: '⚙️',
    color: 'text-amber-400',
    gradient: 'from-amber-600 to-yellow-500',
    description: 'Streamline software delivery through automation, CI/CD, and infrastructure.',
    avgSalary: '₹9–24 LPA',
    growth: '+30%',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'Ansible', 'Terraform', 'Git'],
    roles: ['DevOps Engineer', 'Platform Engineer', 'Release Engineer', 'SRE'],
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    icon: '📱',
    color: 'text-pink-400',
    gradient: 'from-pink-600 to-rose-500',
    description: 'Create native and cross-platform mobile apps for iOS and Android.',
    avgSalary: '₹8–20 LPA',
    growth: '+22%',
    skills: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'REST APIs'],
    roles: ['iOS Developer', 'Android Developer', 'React Native Dev', 'Flutter Developer'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Designer',
    icon: '🎨',
    color: 'text-fuchsia-400',
    gradient: 'from-fuchsia-600 to-pink-500',
    description: 'Design intuitive user experiences and visually stunning interfaces.',
    avgSalary: '₹7–18 LPA',
    growth: '+18%',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems', 'CSS'],
    roles: ['UX Designer', 'UI Designer', 'Product Designer', 'Design Lead'],
  },
  {
    id: 'blockchain',
    title: 'Blockchain Developer',
    icon: '⛓️',
    color: 'text-orange-400',
    gradient: 'from-orange-600 to-red-500',
    description: 'Build decentralized applications and smart contracts on blockchain networks.',
    avgSalary: '₹12–32 LPA',
    growth: '+45%',
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'Rust', 'Smart Contracts', 'DeFi'],
    roles: ['Smart Contract Dev', 'DApp Developer', 'Blockchain Architect', 'Web3 Engineer'],
  },
  {
    id: 'product',
    title: 'Product Manager',
    icon: '🚀',
    color: 'text-lime-400',
    gradient: 'from-lime-600 to-green-500',
    description: 'Define product vision, strategy, and roadmap to deliver user value.',
    avgSalary: '₹15–40 LPA',
    growth: '+20%',
    skills: ['Product Strategy', 'Data Analysis', 'Agile', 'User Research', 'SQL', 'Communication'],
    roles: ['Product Manager', 'Product Lead', 'APM', 'Chief Product Officer'],
  },
  {
    id: 'iot',
    title: 'IoT Engineer',
    icon: '🔌',
    color: 'text-teal-400',
    gradient: 'from-teal-600 to-cyan-500',
    description: 'Connect physical devices to digital systems through embedded programming.',
    avgSalary: '₹8–22 LPA',
    growth: '+38%',
    skills: ['C/C++', 'MQTT', 'Arduino', 'Raspberry Pi', 'Cloud IoT', 'Networking'],
    roles: ['Embedded Engineer', 'IoT Architect', 'Firmware Developer', 'Systems Engineer'],
  },
  {
    id: 'game-dev',
    title: 'Game Developer',
    icon: '🎮',
    color: 'text-indigo-400',
    gradient: 'from-indigo-600 to-violet-500',
    description: 'Design and develop immersive video games for PC, console, and mobile.',
    avgSalary: '₹6–20 LPA',
    growth: '+15%',
    skills: ['Unity', 'Unreal Engine', 'C#', 'C++', 'Game Design', '3D Modeling'],
    roles: ['Game Developer', 'Game Designer', 'Level Designer', 'Technical Artist'],
  },
];

export interface RoadmapStage {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  topics: string[];
  projects: string[];
  certifications: string[];
  resources: string[];
}

export interface Roadmap {
  careerId: string;
  title: string;
  totalDuration: string;
  interviewPrep: string[];
  stages: RoadmapStage[];
}

export const roadmaps: Record<string, Roadmap> = {
  'ai-ml': {
    careerId: 'ai-ml',
    title: 'AI/ML Engineer Roadmap',
    totalDuration: '12–18 months',
    interviewPrep: [
      'ML system design interviews',
      'Coding problems in Python',
      'Statistics & probability questions',
      'Model evaluation metrics',
      'MLOps & deployment scenarios',
    ],
    stages: [
      {
        level: 'Beginner',
        duration: '3–4 months',
        topics: ['Python fundamentals', 'NumPy & Pandas', 'Linear Algebra basics', 'Statistics', 'Data visualization (Matplotlib, Seaborn)', 'Scikit-learn basics'],
        projects: ['EDA on Titanic dataset', 'House price prediction (Linear Regression)', 'MNIST digit classifier'],
        certifications: ['Google Python Crash Course', 'Coursera ML by Andrew Ng (Week 1–5)'],
        resources: ['fast.ai Practical DL', 'Kaggle Learn', 'StatQuest YouTube'],
      },
      {
        level: 'Intermediate',
        duration: '4–5 months',
        topics: ['Deep learning (ANN, CNN, RNN)', 'TensorFlow / PyTorch', 'NLP fundamentals', 'Computer Vision', 'Feature engineering', 'Model evaluation & tuning'],
        projects: ['Sentiment analysis app', 'Image classification (ResNet)', 'Customer churn prediction', 'Object detection with YOLO'],
        certifications: ['DeepLearning.AI TensorFlow Developer', 'Coursera Deep Learning Specialization'],
        resources: ['PyTorch documentation', 'd2l.ai', 'Papers With Code'],
      },
      {
        level: 'Advanced',
        duration: '4–5 months',
        topics: ['Transformers & LLMs', 'MLOps (MLflow, Kubeflow)', 'Distributed training', 'Model deployment (FastAPI, Docker)', 'A/B testing', 'RAG & Vector databases'],
        projects: ['LLM fine-tuning project', 'Real-time ML pipeline', 'Recommendation system', 'Multi-modal AI app'],
        certifications: ['AWS Machine Learning Specialty', 'Google Professional ML Engineer'],
        resources: ['Hugging Face documentation', 'MLOps Community', 'Andrej Karpathy lectures'],
      },
    ],
  },
  'data-science': {
    careerId: 'data-science',
    title: 'Data Scientist Roadmap',
    totalDuration: '10–14 months',
    interviewPrep: ['SQL query writing', 'Case study interviews', 'Statistics & A/B testing', 'Python coding', 'Business acumen questions'],
    stages: [
      {
        level: 'Beginner',
        duration: '3 months',
        topics: ['Python & R basics', 'SQL fundamentals', 'Statistics & Probability', 'Data cleaning', 'Exploratory Data Analysis', 'Tableau / Power BI'],
        projects: ['Sales data analysis', 'Netflix content analysis', 'COVID-19 data visualization'],
        certifications: ['IBM Data Science Certificate', 'Google Data Analytics'],
        resources: ['Mode Analytics SQL Tutorial', 'Kaggle Learn', 'Data36'],
      },
      {
        level: 'Intermediate',
        duration: '4 months',
        topics: ['Machine Learning algorithms', 'Advanced statistics', 'Feature engineering', 'Time series analysis', 'A/B testing', 'Big Data tools (Spark)'],
        projects: ['Fraud detection system', 'Time series forecasting', 'Recommendation engine'],
        certifications: ['DataCamp Data Scientist Track', 'Coursera Applied ML'],
        resources: ['Towards Data Science blog', 'Analytics Vidhya', 'StatQuest'],
      },
      {
        level: 'Advanced',
        duration: '3–4 months',
        topics: ['Deep learning for DS', 'NLP & text mining', 'Cloud data platforms', 'Experiment design', 'Causal inference', 'Model productionization'],
        projects: ['End-to-end DS pipeline', 'NLP topic modeling', 'Causal impact study'],
        certifications: ['AWS Data Analytics Specialty', 'Databricks Certified Associate'],
        resources: ['The Book of Why', 'Designing Data-Intensive Applications', 'Eugene Yan blog'],
      },
    ],
  },
  'web-dev': {
    careerId: 'web-dev',
    title: 'Full Stack Developer Roadmap',
    totalDuration: '8–12 months',
    interviewPrep: ['DSA problem solving', 'System design', 'JavaScript fundamentals', 'React patterns', 'REST & GraphQL API design'],
    stages: [
      {
        level: 'Beginner',
        duration: '2–3 months',
        topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'Responsive design', 'Git & GitHub', 'React basics', 'REST APIs'],
        projects: ['Portfolio website', 'Todo app with React', 'Weather app using API'],
        certifications: ['freeCodeCamp Responsive Web Design', 'The Odin Project'],
        resources: ['MDN Web Docs', 'javascript.info', 'React docs'],
      },
      {
        level: 'Intermediate',
        duration: '3–4 months',
        topics: ['TypeScript', 'Node.js & Express', 'Databases (PostgreSQL, MongoDB)', 'Authentication & JWT', 'State management (Redux/Zustand)', 'Testing'],
        projects: ['E-commerce site', 'Blog platform with CMS', 'Real-time chat app'],
        certifications: ['Meta Front-End Developer', 'freeCodeCamp Back-End'],
        resources: ['Full Stack Open', 'roadmap.sh', 'Fireship YouTube'],
      },
      {
        level: 'Advanced',
        duration: '3–4 months',
        topics: ['Docker & CI/CD', 'Microservices', 'GraphQL', 'Performance optimization', 'WebSockets', 'Cloud deployment (Vercel, AWS)'],
        projects: ['SaaS application', 'Microservices architecture', 'Real-time collaborative editor'],
        certifications: ['AWS Solutions Architect', 'Docker Certified Associate'],
        resources: ['System Design Primer', 'The Pragmatic Programmer', 'Kent C. Dodds blog'],
      },
    ],
  },
  'cyber-security': {
    careerId: 'cyber-security',
    title: 'Cyber Security Engineer Roadmap',
    totalDuration: '12–16 months',
    interviewPrep: ['Network protocol questions', 'CTF challenges', 'Incident response scenarios', 'Vulnerability assessment', 'Compliance frameworks'],
    stages: [
      {
        level: 'Beginner',
        duration: '3–4 months',
        topics: ['Networking fundamentals (TCP/IP, DNS)', 'Linux basics', 'Python scripting', 'Cryptography basics', 'OWASP Top 10', 'Security concepts'],
        projects: ['Home lab setup', 'Network scanning with Nmap', 'Password cracker in Python'],
        certifications: ['CompTIA Security+', 'Cisco CyberOps Associate'],
        resources: ['TryHackMe', 'HackTheBox', 'Professor Messer YouTube'],
      },
      {
        level: 'Intermediate',
        duration: '4–5 months',
        topics: ['Penetration testing', 'Web app security', 'SIEM tools', 'Forensics basics', 'Exploit development', 'Vulnerability management'],
        projects: ['Bug bounty submissions', 'Vulnerable machine exploitation', 'Security audit report'],
        certifications: ['CEH (Certified Ethical Hacker)', 'eJPT', 'CompTIA PenTest+'],
        resources: ['Offensive Security materials', 'PortSwigger Web Academy', 'SANS Internet Stormcast'],
      },
      {
        level: 'Advanced',
        duration: '4–5 months',
        topics: ['Red team operations', 'Malware analysis', 'Cloud security', 'Zero-day research', 'Security architecture', 'Incident response'],
        projects: ['Red team assessment', 'Malware reverse engineering', 'Cloud security hardening'],
        certifications: ['OSCP', 'CISSP', 'AWS Security Specialty'],
        resources: ['Practical Malware Analysis book', 'Red Team Development', 'ATT&CK framework'],
      },
    ],
  },
  'cloud': {
    careerId: 'cloud',
    title: 'Cloud Engineer Roadmap',
    totalDuration: '10–14 months',
    interviewPrep: ['Cloud architecture design', 'Cost optimization scenarios', 'High availability patterns', 'Security best practices', 'Disaster recovery'],
    stages: [
      {
        level: 'Beginner',
        duration: '2–3 months',
        topics: ['Cloud fundamentals (IaaS/PaaS/SaaS)', 'AWS/Azure/GCP basics', 'Linux administration', 'Networking (VPC, subnets)', 'Storage services', 'IAM & security'],
        projects: ['Deploy a static website on S3', 'Launch EC2 with auto-scaling', 'Set up VPC with subnets'],
        certifications: ['AWS Cloud Practitioner', 'Google Associate Cloud Engineer', 'Azure Fundamentals (AZ-900)'],
        resources: ['A Cloud Guru', 'AWS documentation', 'Cloud Academy'],
      },
      {
        level: 'Intermediate',
        duration: '4 months',
        topics: ['Serverless (Lambda/Cloud Functions)', 'Containers (Docker/ECS)', 'Infrastructure as Code (Terraform)', 'CI/CD pipelines', 'Monitoring (CloudWatch)', 'Database services'],
        projects: ['Serverless REST API', 'Containerized microservice', 'IaC for a complete environment'],
        certifications: ['AWS Solutions Architect Associate', 'Terraform Associate', 'CKA'],
        resources: ['HashiCorp Learn', 'Kubernetes documentation', 'Adrian Cantrill courses'],
      },
      {
        level: 'Advanced',
        duration: '4 months',
        topics: ['Multi-cloud architecture', 'Kubernetes (EKS/GKE/AKS)', 'Service mesh (Istio)', 'Cost optimization', 'Cloud security (CSPM)', 'Data engineering on cloud'],
        projects: ['Multi-region DR setup', 'Kubernetes platform engineering', 'Cloud cost dashboard'],
        certifications: ['AWS Solutions Architect Professional', 'GCP Professional Cloud Architect', 'CKS'],
        resources: ['Google Cloud Architecture Framework', 'AWS Well-Architected', 'The DevOps Handbook'],
      },
    ],
  },
  'devops': {
    careerId: 'devops',
    title: 'DevOps Engineer Roadmap',
    totalDuration: '10–14 months',
    interviewPrep: ['CI/CD pipeline design', 'Kubernetes troubleshooting', 'Scripting challenges', 'Monitoring & observability', 'Incident management'],
    stages: [
      {
        level: 'Beginner',
        duration: '2–3 months',
        topics: ['Linux administration', 'Shell scripting (Bash)', 'Git & version control', 'Networking basics', 'Docker containers', 'CI/CD concepts'],
        projects: ['Dockerize an application', 'Set up a Jenkins pipeline', 'Automate deployments with scripts'],
        certifications: ['Docker Certified Associate', 'Linux Foundation LFCA'],
        resources: ['The Linux Command Line book', 'Docker documentation', 'TechWorld with Nana YouTube'],
      },
      {
        level: 'Intermediate',
        duration: '4 months',
        topics: ['Kubernetes orchestration', 'Ansible (configuration management)', 'Terraform (IaC)', 'Prometheus & Grafana', 'Log management (ELK)', 'Security scanning'],
        projects: ['Kubernetes cluster setup', 'Full CI/CD for a microservice app', 'Monitoring dashboard'],
        certifications: ['CKA', 'HashiCorp Terraform Associate', 'AWS DevOps Engineer'],
        resources: ['Kubernetes documentation', 'Ansible Galaxy', 'DevOps Roadmap (roadmap.sh)'],
      },
      {
        level: 'Advanced',
        duration: '4 months',
        topics: ['GitOps (ArgoCD/Flux)', 'Service mesh (Istio)', 'Chaos engineering', 'SRE practices', 'Platform engineering', 'Cost optimization'],
        projects: ['GitOps pipeline', 'Chaos engineering experiment', 'Internal developer platform'],
        certifications: ['CKAD', 'AWS Solutions Architect', 'CKS'],
        resources: ['Site Reliability Engineering book', 'The Phoenix Project', 'Weaveworks blog'],
      },
    ],
  },
};

export const courses = [
  { id: '1', title: 'Machine Learning Specialization', career: 'ai-ml', level: 'Intermediate', duration: '3 months', platform: 'Coursera', rating: 4.9, certificate: true, skills: ['Python', 'Scikit-learn', 'TensorFlow', 'Statistics'], price: 'Paid' },
  { id: '2', title: 'Deep Learning Specialization', career: 'ai-ml', level: 'Advanced', duration: '4 months', platform: 'Coursera', rating: 4.8, certificate: true, skills: ['Neural Networks', 'CNN', 'RNN', 'PyTorch'], price: 'Paid' },
  { id: '3', title: 'IBM Data Science Professional Certificate', career: 'data-science', level: 'Beginner', duration: '4 months', platform: 'Coursera', rating: 4.6, certificate: true, skills: ['Python', 'SQL', 'Pandas', 'Tableau'], price: 'Paid' },
  { id: '4', title: 'Full Stack Web Development Bootcamp', career: 'web-dev', level: 'Beginner', duration: '6 months', platform: 'Udemy', rating: 4.7, certificate: true, skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'], price: 'Paid' },
  { id: '5', title: 'AWS Certified Solutions Architect', career: 'cloud', level: 'Intermediate', duration: '2 months', platform: 'A Cloud Guru', rating: 4.8, certificate: true, skills: ['AWS', 'Cloud Architecture', 'Security', 'Networking'], price: 'Paid' },
  { id: '6', title: 'Ethical Hacking Course', career: 'cyber-security', level: 'Intermediate', duration: '3 months', platform: 'Udemy', rating: 4.7, certificate: true, skills: ['Kali Linux', 'Metasploit', 'Wireshark', 'Networking'], price: 'Paid' },
  { id: '7', title: 'DevOps with Docker & Kubernetes', career: 'devops', level: 'Intermediate', duration: '2 months', platform: 'LinkedIn Learning', rating: 4.6, certificate: true, skills: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform'], price: 'Paid' },
  { id: '8', title: 'React & TypeScript Complete Guide', career: 'web-dev', level: 'Intermediate', duration: '2 months', platform: 'Udemy', rating: 4.8, certificate: true, skills: ['React', 'TypeScript', 'Redux', 'Testing'], price: 'Paid' },
  { id: '9', title: 'Google Data Analytics Certificate', career: 'data-science', level: 'Beginner', duration: '3 months', platform: 'Coursera', rating: 4.8, certificate: true, skills: ['SQL', 'Tableau', 'R', 'Data Analysis'], price: 'Paid' },
  { id: '10', title: 'Figma UI/UX Design Essentials', career: 'uiux', level: 'Beginner', duration: '1 month', platform: 'Udemy', rating: 4.7, certificate: true, skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'], price: 'Paid' },
  { id: '11', title: 'Blockchain & Smart Contracts', career: 'blockchain', level: 'Intermediate', duration: '2 months', platform: 'Udemy', rating: 4.5, certificate: true, skills: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat'], price: 'Paid' },
  { id: '12', title: 'Flutter App Development Bootcamp', career: 'mobile', level: 'Beginner', duration: '2 months', platform: 'Udemy', rating: 4.7, certificate: true, skills: ['Flutter', 'Dart', 'Firebase', 'State Management'], price: 'Paid' },
];

export const salaryData: Record<string, { entry: number; mid: number; senior: number; locations: Record<string, number> }> = {
  'ai-ml': { entry: 8, mid: 18, senior: 35, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
  'data-science': { entry: 7, mid: 15, senior: 28, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
  'web-dev': { entry: 5, mid: 12, senior: 22, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
  'cyber-security': { entry: 7, mid: 16, senior: 30, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
  'cloud': { entry: 8, mid: 18, senior: 32, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
  'devops': { entry: 7, mid: 16, senior: 28, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
  'mobile': { entry: 5, mid: 12, senior: 20, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
  'uiux': { entry: 4, mid: 10, senior: 18, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
  'blockchain': { entry: 9, mid: 20, senior: 38, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
  'product': { entry: 10, mid: 22, senior: 45, locations: { Bangalore: 1.3, Mumbai: 1.2, Delhi: 1.1, Hyderabad: 1.15, Pune: 1.05, Chennai: 1.0 } },
};
