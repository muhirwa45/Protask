
import React from 'react';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-white font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Dashboard />
        </div>
        <div className="lg:col-span-2">
          <Schedule />
        </div>
      </main>
    </div>
  );
};

export default App;
