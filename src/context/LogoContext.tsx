import React, { createContext, useContext, useState, useEffect } from 'react';

interface LogoContextType {
  customLogoUrl: string | null;
  setCustomLogoUrl: (url: string | null) => void;
  uploadLogoFile: (file: File) => void;
  resetLogo: () => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'dato_corporate_logo_custom';

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customLogoUrl, setCustomLogoUrlState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setCustomLogoUrlState(saved);
      }
    } catch {
      // Ignore local storage errors in sandboxed iframes
    }
  }, []);

  const setCustomLogoUrl = (url: string | null) => {
    setCustomLogoUrlState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch {
      // LocalStorage quota or access error handling
    }
  };

  const uploadLogoFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomLogoUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetLogo = () => {
    setCustomLogoUrl(null);
  };

  return (
    <LogoContext.Provider value={{ customLogoUrl, setCustomLogoUrl, uploadLogoFile, resetLogo }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};
