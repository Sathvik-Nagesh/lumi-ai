import { useState, useEffect } from 'react';
import { Sidebar } from './components/sidebar/Sidebar';
import { ChatInterface } from './components/chat/ChatInterface';
import { DotLoader } from './components/ui/dot-loader';
import { ChatManagementProvider } from './contexts/ChatManagementContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { Toaster } from 'react-hot-toast';

const loadingFrames = [
  [14, 7, 0, 8, 6, 13, 20],
  [14, 7, 13, 20, 16, 27, 21],
  [14, 20, 27, 21, 34, 24, 28],
  [27, 21, 34, 28, 41, 32, 35],
  [34, 28, 41, 35, 48, 40, 42],
  [34, 28, 41, 35, 48, 42, 46],
  [34, 28, 41, 35, 48, 42, 38],
  [34, 28, 41, 35, 48, 30, 21],
  [34, 28, 41, 48, 21, 22, 14],
  [34, 28, 41, 21, 14, 16, 27],
  [34, 28, 21, 14, 10, 20, 27],
  [28, 21, 14, 4, 13, 20, 27],
  [28, 21, 14, 12, 6, 13, 20],
  [28, 21, 14, 6, 13, 20, 11],
  [28, 21, 14, 6, 13, 20, 10],
  [14, 6, 13, 20, 9, 7, 21],
];

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set default dark theme
    const savedTheme = localStorage.getItem(import.meta.env.VITE_THEME_STORAGE_KEY || 'lumi-theme');
    if (!savedTheme || savedTheme === 'dark') {
      document.documentElement.className = 'dark';
    } else {
      document.documentElement.className = 'light';
    }
    
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-black transition-colors">
        <div className="flex flex-col items-center gap-8">
          <DotLoader
            frames={loadingFrames}
            className="gap-1"
            dotClassName="bg-purple-600/20 [&.active]:bg-purple-600 size-2"
          />
          <div className="text-lg font-medium text-gray-900 dark:text-white">
            Loading {import.meta.env.VITE_APP_NAME || 'Lumi AI'}...
          </div>
        </div>
      </div>
    );
  }

  return (
    <ConfigProvider>
      <ChatManagementProvider>
        <div className="flex h-screen bg-white dark:bg-black transition-colors">
          <Sidebar />
          <main className="flex-1 flex flex-col relative">
            <ChatInterface />
          </main>
          <Toaster 
            position="top-right"
            toastOptions={{
              className: '',
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
              success: {
                iconTheme: {
                  primary: '#a855f7',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </ChatManagementProvider>
    </ConfigProvider>
  );
}

export default App;
