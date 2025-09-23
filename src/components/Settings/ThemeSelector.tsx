import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { currentTheme, availableThemes, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="umbanda-card p-6">
      <h3 className="umbanda-subtitle mb-6">🎨 Personalização</h3>
      
      {/* Modo Escuro */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Modo Escuro</h4>
            <p className="text-sm text-gray-600">Alternar entre tema claro e escuro</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDarkMode ? 'bg-ogum-blue' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Seleção de Tema */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Tema dos Orixás</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                currentTheme.id === theme.id
                  ? 'border-ogum-blue bg-ogum-blue-light'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <div className="flex space-x-1 mr-3">
                  {theme.umbanda.elements.map((element, index) => (
                    <span key={index} className="text-lg">{element}</span>
                  ))}
                </div>
                <h5 className="font-semibold text-gray-900">{theme.name}</h5>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {theme.umbanda.description}
              </p>
              
              <div className="flex space-x-2">
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Informações do Tema Atual */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-semibold text-gray-900 mb-2">
          Tema Atual: {currentTheme.name}
        </h5>
        <p className="text-sm text-gray-600 mb-2">
          {currentTheme.umbanda.description}
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Elementos:</span>
          {currentTheme.umbanda.elements.map((element, index) => (
            <span key={index} className="text-lg">{element}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
