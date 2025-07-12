import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import BrowsePage from './pages/BrowsePage';
import Dashboard from './pages/Dashboard';
import ItemDetailPage from './pages/ItemDetailPage';
import AddItemPage from './pages/AddItemPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [formType, setFormType] = useState<'login' | 'register'>('login');

  const handleNavigate = (page: string, itemId?: string, formType?: 'login' | 'register') => {
    setCurrentPage(page);
    if (itemId) {
      setSelectedItemId(itemId);
    }
    if (formType) {
      setFormType(formType);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} initialForm={formType} />;
      case 'browse':
        return <BrowsePage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'item-detail':
        return selectedItemId ? (
          <ItemDetailPage itemId={selectedItemId} onNavigate={handleNavigate} />
        ) : (
          <BrowsePage onNavigate={handleNavigate} />
        );
      case 'add-item':
        return <AddItemPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPanel onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          {renderPage()}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;