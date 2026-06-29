import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Assessment from './pages/Assessment';
import Roadmap from './pages/Roadmap';
import Salary from './pages/Salary';
import Courses from './pages/Courses';
import Explorer from './pages/Explorer';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

type Page = 'home' | 'login' | 'signup' | 'assessment' | 'roadmap' | 'salary' | 'courses' | 'explorer' | 'dashboard' | 'about' | 'contact';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  function navigate(page: string) {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const showFooter = !['login', 'signup'].includes(currentPage);
  const showChatbot = !['login', 'signup'].includes(currentPage);

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main className="flex-1">
        {currentPage === 'home' && <Home onNavigate={navigate} />}
        {(currentPage === 'login' || currentPage === 'signup') && (
          <Auth mode={currentPage} onNavigate={navigate} />
        )}
        {currentPage === 'assessment' && <Assessment onNavigate={navigate} />}
        {currentPage === 'roadmap' && <Roadmap onNavigate={navigate} />}
        {currentPage === 'salary' && <Salary />}
        {currentPage === 'courses' && <Courses />}
        {currentPage === 'explorer' && <Explorer onNavigate={navigate} />}
        {currentPage === 'dashboard' && <Dashboard onNavigate={navigate} />}
        {currentPage === 'about' && <About onNavigate={navigate} />}
        {currentPage === 'contact' && <Contact />}
      </main>

      {showFooter && <Footer onNavigate={navigate} />}
      {showChatbot && <Chatbot />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
