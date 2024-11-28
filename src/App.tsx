import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { UserList } from './components/UserList';
import { RolesList } from './components/RolesList';
import { PermissionList } from './components/PermissionList';
import { useThemeStore } from './store/themeStore';

export function App() {
  const [activeView, setActiveView] = useState('users');
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const renderContent = () => {
    switch (activeView) {
      case 'users':
        return <UserList />;
      case 'roles':
        return <RolesList />;
      case 'permissions':
        return <PermissionList />;
      default:
        return <div className='text-white'>Settings view coming soon</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 lg:overflow-auto pt-16 lg:pt-0">
        <main className="p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;