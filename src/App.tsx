/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { AssemblyPlayground } from './components/AssemblyPlayground';
import { ChatTerminal } from './components/ChatTerminal';
import { BareMetalSim } from './components/BareMetalSim';
import { BenchmarkSuite } from './components/BenchmarkSuite';
import { TrainerVisualizer } from './components/TrainerVisualizer';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { Github, Zap, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      
      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 px-4 lg:px-8 py-8">
        {activeTab === 'playground' && <AssemblyPlayground />}
        {activeTab === 'chat' && <ChatTerminal />}
        {activeTab === 'baremetal' && <BareMetalSim />}
        {activeTab === 'benchmarks' && <BenchmarkSuite />}
        {activeTab === 'trainer' && <TrainerVisualizer />}
        {activeTab === 'docs' && <ArchitectureDocs />}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-6 px-4 lg:px-8 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">SHΞN™ LLM</span>
            <span>•</span>
            <span>Pure x86-64 NASM Inference Engine & Bare-Metal OS</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/alesha-pro/llm.asm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Based on alesha-pro/llm.asm</span>
            </a>
            <span className="text-zinc-700">|</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Zero C/libc
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
