import React, { useState, useEffect } from 'react';
import { Theme, Screen, UserStats } from './types';
import { INITIAL_USER_STATS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AuthScreen } from './components/AuthScreen';
import { QuizScreen } from './components/QuizScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { ProfileModal } from './components/ProfileModal';
import { RecoveryModal } from './components/RecoveryModal';
import { SanctuaryModal } from './components/SanctuaryModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [screen, setScreen] = useState<Screen>('quiz'); // default to Quiz arena to showcase the primary experience
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);
  const [sanctuaryModalOpen, setSanctuaryModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync theme class with document.body and html
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('theme-dark-mode');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('theme-dark-mode');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addToast = (message: string, icon: string = 'info', isError: boolean = false) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, icon, isError }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const handleToggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    addToast(
      nextTheme === 'light' ? 'Solar dawn mode active' : 'Night sky mode active',
      nextTheme === 'light' ? 'light_mode' : 'dark_mode'
    );
  };

  const handleSetThemeExplicit = (newTheme: Theme) => {
    setTheme(newTheme);
    addToast(
      newTheme === 'light' ? 'Solar dawn mode active' : 'Night sky mode active',
      newTheme === 'light' ? 'light_mode' : 'dark_mode'
    );
  };

  const handleBeginVoyage = (identifier: string) => {
    setUserStats((prev) => ({
      ...prev,
      email: identifier.includes('@') ? identifier : `${identifier}@aether.io`,
      name: identifier.includes('@')
        ? identifier.split('@')[0].charAt(0).toUpperCase() + identifier.split('@')[0].slice(1)
        : identifier,
    }));
    setScreen('quiz');
  };

  const handleRecoverySubmit = (email: string) => {
    setRecoveryModalOpen(false);
    addToast(`Recovery scroll transmitted to ${email}`, 'mark_email_read');
  };

  const handleSanctuarySubmit = (name: string, email: string) => {
    setSanctuaryModalOpen(false);
    setUserStats((prev) => ({
      ...prev,
      name,
      email,
    }));
    addToast(`Sanctuary consecrated for ${name}!`, 'sparkles');
    setScreen('quiz');
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col font-sans transition-colors duration-500">
      {/* Top Header - shown on Quiz and Leaderboard screens */}
      {screen !== 'auth' && (
        <Header
          theme={theme}
          onToggleTheme={handleToggleTheme}
          currentScreen={screen}
          userStats={userStats}
          onOpenProfile={() => setProfileModalOpen(true)}
          onNavigate={(target) => setScreen(target)}
        />
      )}

      {/* Main Screen Views */}
      <main className="flex-1 flex flex-col w-full relative z-10">
        {screen === 'auth' && (
          <AuthScreen
            theme={theme}
            onToggleTheme={handleSetThemeExplicit}
            onBeginVoyage={handleBeginVoyage}
            onOpenRecovery={() => setRecoveryModalOpen(true)}
            onOpenSanctuary={() => setSanctuaryModalOpen(true)}
            showToast={addToast}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            theme={theme}
            userStats={userStats}
            onOpenProfile={() => setProfileModalOpen(true)}
            showToast={addToast}
          />
        )}

        {screen === 'rankings' && (
          <LeaderboardScreen
            theme={theme}
            userStats={userStats}
            onOpenProfile={() => setProfileModalOpen(true)}
            showToast={addToast}
          />
        )}
      </main>

      {/* Floating Bottom Nav */}
      <BottomNav
        currentScreen={screen}
        onNavigate={(target) => setScreen(target)}
        theme={theme}
      />

      {/* Modals */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        userStats={userStats}
        theme={theme}
      />

      <RecoveryModal
        isOpen={recoveryModalOpen}
        onClose={() => setRecoveryModalOpen(false)}
        onSubmit={handleRecoverySubmit}
        theme={theme}
      />

      <SanctuaryModal
        isOpen={sanctuaryModalOpen}
        onClose={() => setSanctuaryModalOpen(false)}
        onSubmit={handleSanctuarySubmit}
        theme={theme}
      />

      {/* Ambient Toast Container */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
