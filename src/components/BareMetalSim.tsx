import React, { useState } from 'react';
import { HardDrive, Play, RefreshCw, Terminal, Cpu, ShieldCheck, CheckCircle2, Server } from 'lucide-react';
import { BootLog } from '../types';

export const BareMetalSim: React.FC = () => {
  const [isBooting, setIsBooting] = useState(false);
  const [bootCompleted, setBootCompleted] = useState(false);
  const [logs, setLogs] = useState<BootLog[]>([
    { id: '1', timestamp: '00:00.01', level: 'info', message: 'Multiboot2 header verified at 0x00100000.' },
    { id: '2', timestamp: '00:00.04', level: 'hardware', message: 'CPU switched to 64-bit Long Mode (CR0.PG=1, IA32_EFER.LME=1).' },
    { id: '3', timestamp: '00:00.08', level: 'success', message: 'Page tables initialized (Identity mapping 0-4GB).' }
  ]);

  const handleBootSequence = () => {
    setIsBooting(true);
    setBootCompleted(false);
    setLogs([
      { id: '1', timestamp: '00:00.01', level: 'info', message: 'Multiboot2 header verified at 0x00100000.' },
      { id: '2', timestamp: '00:00.04', level: 'hardware', message: 'CPU switched to 64-bit Long Mode (CR0.PG=1, IA32_EFER.LME=1).' },
      { id: '3', timestamp: '00:00.08', level: 'success', message: 'Page tables initialized (Identity mapping 0-4GB).' }
    ]);

    const bootSteps = [
      { delay: 300, level: 'hardware' as const, msg: 'APIC initialized. Sending SIPI to wake up secondary CPU cores (Cores 0-15).' },
      { delay: 600, level: 'info' as const, msg: 'Allocating 512MB physical RAM region for Qwen3-0.6B Q8_0 weights map.' },
      { delay: 900, level: 'success' as const, msg: 'Direct memory mapping of weights completed successfully in 0.42ms.' },
      { delay: 1200, level: 'info' as const, msg: 'Configuring VGA text buffer (0xB8000) & PS/2 keyboard controller.' },
      { delay: 1600, level: 'success' as const, msg: 'SHΞN™ Bare-Metal OS Kernel fully booted in 74ms. Ready for inference.' }
    ];

    bootSteps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          {
            id: (idx + 4).toString(),
            timestamp: `00:00.${12 + idx * 15}`,
            level: step.level,
            message: step.msg
          }
        ]);
        if (idx === bootSteps.length - 1) {
          setIsBooting(false);
          setBootCompleted(true);
        }
      }, step.delay);
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-blue-950/40 border border-blue-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-mono mb-2">
              <HardDrive className="w-4 h-4" />
              <span>STANDALONE BARE-METAL OS KERNEL (asm-llm-os.elf)</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Bare-Metal OS & ISO Boot Simulator
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Boot directly into 64-bit Long Mode in under 100ms. Wakes all CPU cores via APIC, maps model weights straight from physical RAM, and runs with zero OS kernel abstraction.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleBootSequence}
              disabled={isBooting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-zinc-950 font-bold text-sm shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isBooting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isBooting ? 'Booting OS Kernel...' : 'Boot Bare-Metal ISO'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: System Status & Architecture */}
        <div className="space-y-4">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-400" />
              <span>OS Specifications</span>
            </h2>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                <span>Kernel Size:</span>
                <span className="text-cyan-400">~22 KB (ELF64)</span>
              </div>
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                <span>Bootloader:</span>
                <span className="text-white">Multiboot2 Standard</span>
              </div>
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                <span>Core Awakening:</span>
                <span className="text-emerald-400">Local APIC / SIPI</span>
              </div>
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                <span>I/O Interface:</span>
                <span className="text-amber-400">VGA 0xB8000 & Serial</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Dependency:</span>
                <span className="text-red-400 font-bold">None (Bare-Metal)</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
              Physical RAM Layout
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 bg-zinc-950 rounded border border-zinc-800 flex justify-between">
                <span className="text-zinc-400">0x000000 - 0x0FFFFF</span>
                <span className="text-blue-400">BIOS / IVT</span>
              </div>
              <div className="p-2 bg-zinc-950 rounded border border-zinc-800 flex justify-between">
                <span className="text-zinc-400">0x100000 - 0x1FFFFF</span>
                <span className="text-cyan-400">SHΞN™ Kernel Image</span>
              </div>
              <div className="p-2 bg-zinc-950 rounded border border-zinc-800 flex justify-between">
                <span className="text-zinc-400">0x200000 - 0x400000</span>
                <span className="text-emerald-400">Qwen3-0.6B Weights</span>
              </div>
              <div className="p-2 bg-zinc-950 rounded border border-zinc-800 flex justify-between">
                <span className="text-zinc-400">0x500000+</span>
                <span className="text-amber-400">KV-Cache & Stack</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Terminal Console Output */}
        <div className="lg:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[550px]">
          <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950/80 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono font-semibold text-zinc-200">SHΞN™ Bare-Metal Serial Console (COM1)</span>
            </div>
            <div className="flex items-center gap-2">
              {bootCompleted ? (
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Boot Complete (&lt; 100ms)
                </span>
              ) : isBooting ? (
                <span className="flex items-center gap-1.5 text-xs font-mono text-blue-400 animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Booting Kernel...
                </span>
              ) : (
                <span className="text-xs font-mono text-zinc-500">Idle (Click Boot ISO)</span>
              )}
            </div>
          </div>

          <div className="flex-1 bg-zinc-950 p-6 font-mono text-xs overflow-y-auto space-y-2">
            <div className="text-zinc-500">SHΞN™ Bootloader v1.0 [Multiboot2 Specification]</div>
            <div className="text-zinc-500">Copyright (C) SHΞN™ LLM. Zero C/libc dependencies.</div>
            <div className="text-zinc-500">----------------------------------------------------</div>
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3">
                <span className="text-zinc-600 shrink-0">[{log.timestamp}]</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-semibold shrink-0 ${
                  log.level === 'success' ? 'bg-emerald-500/20 text-emerald-300' :
                  log.level === 'hardware' ? 'bg-blue-500/20 text-blue-300' :
                  log.level === 'warn' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-zinc-800 text-zinc-300'
                }`}>
                  {log.level}
                </span>
                <span className={log.level === 'success' ? 'text-emerald-300' : 'text-zinc-200'}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-zinc-950/90 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Target: x86_64 UEFI / BIOS ISO Image</span>
            <span className="text-cyan-400">Status: {bootCompleted ? 'Running OS Kernel' : 'Ready'}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
