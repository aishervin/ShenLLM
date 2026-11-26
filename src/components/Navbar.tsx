import React from 'react';
import { ActiveTab } from '../types';
import { 
  Cpu, 
  Terminal, 
  HardDrive, 
  BarChart3, 
  Activity, 
  BookOpen, 
  ShieldCheck, 
  Zap,
  Github
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'playground', label: 'ASM Playground', icon: <Cpu className="w-4 h-4" />, badge: 'NASM' },
    { id: 'chat', label: 'Inference Terminal', icon: <Terminal className="w-4 h-4" />, badge: 'Qwen3' },
    { id: 'baremetal', label: 'Bare-Metal OS', icon: <HardDrive className="w-4 h-4" />, badge: 'ISO' },
    { id: 'benchmarks', label: 'Benchmarks', icon: <BarChart3 className="w-4 h-4" />, badge: '54% Faster' },
    { id: 'trainer', label: 'Mini-GPT Trainer', icon: <Activity className="w-4 h-4" />, badge: 'TUI' },
    { id: 'docs', label: 'Architecture', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-zinc-950 animate-ping" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-zinc-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">SHΞN™ <span className="text-cyan-400">LLM</span></span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded">
                v1.0 ASM
              </span>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-2">
              <span>100% Pure x86-64 NASM</span>
              <span className="text-zinc-600">•</span>
              <span className="text-cyan-400/80 font-mono">Zero C/libc</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 p-1 rounded-xl overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap relative ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                    isActive ? 'bg-cyan-400/20 text-cyan-200' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Status / GitHub link */}
        <div className="hidden xl:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AVX2 / F16C Active</span>
          </div>
          <a
            href="https://github.com/alesha-pro/llm.asm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>alesha-pro/llm.asm</span>
          </a>
        </div>

      </div>
    </header>
  );
};
