import React, { useState, useEffect } from 'react';
import { Brain, Heart, Sparkles, Target, TrendingUp, Calendar, MessageCircle, Image, MapPin, Settings, User, Moon, Sun } from 'lucide-react';

const ElianaAIDashboard = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [userGoals, setUserGoals] = useState({
    mental: { title: "Organizar mi carrera profesional", progress: 65, status: "En progreso" },
    emocional: { title: "Manejar ansiedad diaria", progress: 40, status: "Trabajando en ello" },
    espiritual: { title: "Meditar 10 min diarios", progress: 80, status: "Casi logrado" }
  });

  const [todayInsights, setTodayInsights] = useState({
    mental: "Revisa tu plan de acción para esta semana",
    emocional: "Tómate 5 minutos para respirar profundamente",
    espiritual: "Hoy es un buen día para reflexionar sobre tu gratitud"
  });

  // Simulación de datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setUserGoals(prev => ({
        ...prev,
        mental: { ...prev.mental, progress: Math.min(prev.mental.progress + Math.random() * 2, 100) }
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const ModuleCard = ({ icon: Icon, title, subtitle, progress, status, color, onClick, insights }) => (
    <div 
      className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } rounded-2xl p-6 border-2 border-transparent hover:border-${color}-500/50`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r from-${color}-500 to-${color}-600 text-white shadow-lg`}>
            <Icon size={24} />
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${
            progress > 70 ? 'bg-green-100 text-green-800' : 
            progress > 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}>
            {status}
          </div>
        </div>
        
        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Progreso
            </span>
            <span className={`text-sm font-bold text-${color}-500`}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className={`h-2 rounded-full bg-gradient-to-r from-${color}-500 to-${color}-600 transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className={`text-xs p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          💡 {insights}
        </div>
      </div>
    </div>
  );

  const QuickActionButton = ({ icon: Icon, label, onClick, color = "blue" }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-${color}-500 to-${color}-600 text-white hover:from-${color}-600 hover:to-${color}-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
    >
      <Icon size={16} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  const handleModuleClick = (module) => {
    setActiveModule(module);
    // Aquí se integrarían las APIs específicas
    console.log(`Activando módulo: ${module}`);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Eliana AI
                </h1>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tu asistente de crecimiento personal
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition-all duration-200`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition-all duration-200`}>
                <Settings size={18} />
              </button>
              <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition-all duration-200`}>
                <User size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            ¡Hola! 👋 
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Enfócate en tus 3 prioridades principales hoy
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <QuickActionButton 
            icon={MessageCircle} 
            label="Chat Rápido" 
            onClick={() => handleModuleClick('chat')}
            color="green"
          />
          <QuickActionButton 
            icon={Image} 
            label="Imagen Relajante" 
            onClick={() => handleModuleClick('imagen')}
            color="purple"
          />
          <QuickActionButton 
            icon={Calendar} 
            label="Planificar Día" 
            onClick={() => handleModuleClick('planificar')}
            color="blue"
          />
          <QuickActionButton 
            icon={TrendingUp} 
            label="Ver Progreso" 
            onClick={() => handleModuleClick('progreso')}
            color="orange"
          />
        </div>

        {/* Main Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ModuleCard
            icon={Brain}
            title="Mental"
            subtitle={userGoals.mental.title}
            progress={userGoals.mental.progress}
            status={userGoals.mental.status}
            color="blue"
            insights={todayInsights.mental}
            onClick={() => handleModuleClick('mental')}
          />
          
          <ModuleCard
            icon={Heart}
            title="Emocional"
            subtitle={userGoals.emocional.title}
            progress={userGoals.emocional.progress}
            status={userGoals.emocional.status}
            color="pink"
            insights={todayInsights.emocional}
            onClick={() => handleModuleClick('emocional')}
          />
          
          <ModuleCard
            icon={Sparkles}
            title="Espiritual"
            subtitle={userGoals.espiritual.title}
            progress={userGoals.espiritual.progress}
            status={userGoals.espiritual.status}
            color="purple"
            insights={todayInsights.espiritual}
            onClick={() => handleModuleClick('espiritual')}
          />
        </div>

        {/* Daily Summary */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Resumen del Día
            </h3>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Target className="text-blue-500" size={16} />
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Objetivos Activos
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>3</p>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="text-green-500" size={16} />
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Progreso Promedio
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {Math.round((userGoals.mental.progress + userGoals.emocional.progress + userGoals.espiritual.progress) / 3)}%
              </p>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="text-purple-500" size={16} />
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Días Consecutivos
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>12</p>
            </div>
          </div>
        </div>

        {/* Active Module Indicator */}
        {activeModule && (
          <div className={`fixed bottom-4 right-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Módulo activo: <span className="font-bold text-blue-500">{activeModule}</span>
            </p>
            <button 
              onClick={() => setActiveModule(null)}
              className="text-xs text-red-500 hover:text-red-700 mt-1"
            >
              Cerrar
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ElianaAIDashboard;