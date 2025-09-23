import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  umbanda: {
    orixa: string;
    description: string;
    elements: string[];
  };
}

interface ThemeContextType {
  currentTheme: Theme;
  availableThemes: Theme[];
  setTheme: (themeId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultThemes: Theme[] = [
  {
    id: 'iansa-ogum',
    name: 'Iansã & Ogum Beira Mar',
    colors: {
      primary: '#2563EB', // Ogum Blue
      secondary: '#DC2626', // Ogum Red
      accent: '#FFF4B1', // Iansã Yellow
      background: '#93C5FD', // Light Blue
      text: '#1F2937',
    },
    fonts: {
      heading: 'Dancing Script',
      body: 'Inter',
    },
    umbanda: {
      orixa: 'Iansã & Ogum Beira Mar',
      description: 'Vento, raio, força e proteção dos mares',
      elements: ['⚡', '🌬️', '⚔️', '🌊'],
    },
  },
  {
    id: 'oxum-oxala',
    name: 'Oxum & Oxalá',
    colors: {
      primary: '#D4AF37', // Gold
      secondary: '#FFFFFF', // White
      accent: '#F3E5AB', // Light Gold
      background: '#FEF3C7', // Cream
      text: '#92400E',
    },
    fonts: {
      heading: 'Dancing Script',
      body: 'Inter',
    },
    umbanda: {
      orixa: 'Oxum & Oxalá',
      description: 'Amor, prosperidade, paz e sabedoria',
      elements: ['💛', '🤍', '🌹', '🕊️'],
    },
  },
  {
    id: 'xango-iemanja',
    name: 'Xangô & Iemanjá',
    colors: {
      primary: '#7C3AED', // Purple
      secondary: '#0EA5E9', // Blue
      accent: '#FDE68A', // Light Yellow
      background: '#E0E7FF', // Light Purple
      text: '#1E1B4B',
    },
    fonts: {
      heading: 'Dancing Script',
      body: 'Inter',
    },
    umbanda: {
      orixa: 'Xangô & Iemanjá',
      description: 'Justiça, proteção, maternidade e mar',
      elements: ['⚡', '🌊', '👑', '🐚'],
    },
  },
  {
    id: 'ogum-oxossi',
    name: 'Ogum & Oxóssi',
    colors: {
      primary: '#DC2626', // Red
      secondary: '#059669', // Green
      accent: '#FEF3C7', // Light Yellow
      background: '#F0FDF4', // Light Green
      text: '#1F2937',
    },
    fonts: {
      heading: 'Dancing Script',
      body: 'Inter',
    },
    umbanda: {
      orixa: 'Ogum & Oxóssi',
      description: 'Guerra, caça, proteção e natureza',
      elements: ['⚔️', '🏹', '🌿', '🦌'],
    },
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Carregar tema salvo do localStorage
    const savedThemeId = localStorage.getItem('theme');
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (savedThemeId) {
      const theme = defaultThemes.find(t => t.id === savedThemeId);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
    
    setIsDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    // Aplicar tema no CSS
    const root = document.documentElement;
    const theme = currentTheme;
    
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts.body);
    
    // Aplicar modo escuro
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [currentTheme, isDarkMode]);

  const setTheme = (themeId: string) => {
    const theme = defaultThemes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('theme', themeId);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      availableThemes: defaultThemes,
      setTheme,
      isDarkMode,
      toggleDarkMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
