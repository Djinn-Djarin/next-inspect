"use client";

import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (actionId: string, actionFn: () => Promise<void>) => {
    setIsLoading(actionId);
    try {
      await actionFn();
    } catch (err) {
      setResponse(JSON.stringify({ error: String(err) }, null, 2));
    } finally {
      setIsLoading(null);
    }
  };

  const fetchApiGet = () => handleAction('get', async () => {
    const res = await fetch('/api/hello');
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  });

  const fetchApiPost = () => handleAction('post', async () => {
    const res = await fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify({ name: 'Demo User', action: 'testing' }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  });

  const fetchExternal = () => handleAction('external', async () => {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  });

  const triggerError = () => handleAction('error', async () => {
    const res = await fetch('/api/not-found-route');
    const data = await res.json().catch(() => ({ error: 'Not Found', status: res.status }));
    setResponse(JSON.stringify(data, null, 2));
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 h-[400px] bg-gradient-to-b from-indigo-50/80 to-slate-50/20 pointer-events-none border-b border-indigo-100/50" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 space-y-16">
        
        {/* Hero Section */}
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-widest border border-indigo-100/50 mb-2">
            Interactive Demo
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            @djarin/<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">next-inspect</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Zero-code, pluggable network and API logging for Next.js. 
            Trigger the actions below and watch your requests seamlessly pipe into the terminal panel at the bottom of the screen.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2 text-sm font-medium">
            <a href="https://github.com/Djinn-Djarin/next-inspect" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors bg-white hover:bg-slate-50 px-4 py-2 rounded-full shadow-sm border border-slate-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
              GitHub
            </a>
            <a href="https://www.npmjs.com/package/@djarin/next-inspect" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors bg-white hover:bg-rose-50 px-4 py-2 rounded-full shadow-sm border border-rose-100">
              <svg className="w-5 h-5" viewBox="0 0 780 250" fill="currentColor"><path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path></svg>
              NPM
            </a>
          </div>
        </header>

        {/* Dashboard / Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          {/* Left Column: Actions */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Network Actions</h2>
              <p className="text-sm text-slate-500 mt-1">Simulate requests to see the logger in action.</p>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <ActionButton 
                title="GET /api/hello" 
                subtitle="Local same-origin API route"
                color="blue" 
                loading={isLoading === 'get'}
                onClick={fetchApiGet} 
              />
              <ActionButton 
                title="POST /api/hello" 
                subtitle="Sends a JSON request body"
                color="emerald" 
                loading={isLoading === 'post'}
                onClick={fetchApiPost} 
              />
              <ActionButton 
                title="Weather API (External)" 
                subtitle="Cross-origin browser fetch"
                color="violet" 
                loading={isLoading === 'external'}
                onClick={fetchExternal} 
              />
              <ActionButton 
                title="Trigger 404 Error" 
                subtitle="Simulates a failed request"
                color="rose" 
                loading={isLoading === 'error'}
                onClick={triggerError} 
              />
            </div>
          </div>

          {/* Right Column: Code Viewer */}
          <div className="lg:col-span-7 flex flex-col h-[520px]">
            <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 flex flex-col h-full overflow-hidden">
              {/* macOS Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/80 bg-slate-900/50">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-medium text-slate-500 font-mono tracking-wider">RESPONSE.JSON</span>
              </div>
              
              <pre className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed text-indigo-300">
                {response || (
                  <span className="text-slate-500">
                    // Awaiting request...
                    <br/><br/>
                    // 1. Click an action button on the left
                    <br/>
                    // 2. Watch the response data appear here
                    <br/>
                    // 3. See the rich log in the bottom panel!
                  </span>
                )}
              </pre>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function ActionButton({ title, subtitle, color, loading, onClick }: { title: string; subtitle: string; color: 'blue' | 'emerald' | 'violet' | 'rose'; loading: boolean; onClick: () => void }) {
  const colorStyles = {
    blue: 'hover:border-blue-300 hover:ring-4 hover:ring-blue-100 group-hover:text-blue-600',
    emerald: 'hover:border-emerald-300 hover:ring-4 hover:ring-emerald-100 group-hover:text-emerald-600',
    violet: 'hover:border-violet-300 hover:ring-4 hover:ring-violet-100 group-hover:text-violet-600',
    rose: 'hover:border-rose-300 hover:ring-4 hover:ring-rose-100 group-hover:text-rose-600',
  };
  const iconColors = {
    blue: 'text-blue-500',
    emerald: 'text-emerald-500',
    violet: 'text-violet-500',
    rose: 'text-rose-500',
  };

  return (
    <button 
      onClick={onClick}
      disabled={loading}
      className={`group relative w-full text-left bg-white border border-slate-200 p-4 rounded-xl shadow-sm transition-all duration-200 ${colorStyles[color]} ${loading ? 'opacity-70 pointer-events-none' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800 transition-colors">{title}</span>
          <span className="text-xs text-slate-500 mt-0.5">{subtitle}</span>
        </div>
        <div className="flex items-center gap-3">
          {loading ? (
            <svg className={`animate-spin w-5 h-5 ${iconColors[color]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 ${iconColors[color]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          )}
        </div>
      </div>
    </button>
  );
}
