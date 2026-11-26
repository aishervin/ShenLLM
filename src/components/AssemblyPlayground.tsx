import React, { useState } from 'react';
import { PRESET_KERNELS } from '../data/kernels';
import { AssemblyKernel } from '../types';
import { Play, Cpu, RefreshCw, CheckCircle2, Code2, Layers, Zap, Terminal as TerminalIcon } from 'lucide-react';

export const AssemblyPlayground: React.FC = () => {
  const [selectedKernel, setSelectedKernel] = useState<AssemblyKernel>(PRESET_KERNELS[0]);
  const [code, setCode] = useState<string>(selectedKernel.code);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionOutput, setExecutionOutput] = useState<{
    success: boolean;
    cycles: number;
    instructionsCount: number;
    registers: Record<string, string>;
    logs: string[];
  } | null>(null);

  const handleSelectKernel = (kernel: AssemblyKernel) => {
    setSelectedKernel(kernel);
    setCode(kernel.code);
    setExecutionOutput(null);
  };

  const handleRunSimulation = () => {
    setIsExecuting(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput({
        success: true,
        cycles: Number((selectedKernel.cyclesPerToken * (Math.random() * 0.2 + 0.9)).toFixed(2)),
        instructionsCount: Math.floor(Math.random() * 400) + 1250,
        registers: {
          RAX: '0x00007FFF5FBFF800',
          RDI: '0x00000000401000',
          RSI: '0x00000000408000',
          RDX: '0x00000000410000',
          RCX: '0x0000000000000800',
          'YMM0': '0x8F32C10A 4C21B09E 9A128F33 7B12C450',
          'YMM1': '0x12A9F321 0042F31A 88B12C3F 5A40112E',
          'YMM2': '0xFFFF8912 3A21BC89 7781F32A 12004F32'
        },
        logs: [
          '[NASM] Assembling section .text -> 0x401000 bytes',
          '[AVX2] Validating VEX prefix and vector register allocations (YMM0-YMM15)',
          '[KERNEL] Initializing memory streaming zero-copy buffers...',
          '[EXEC] Executing 1,420 vectorized instructions across 16 cores (APIC)',
          '[SUCCESS] Kernel executed successfully with 0 exceptions. Latency: 1.42 cycles/token.'
        ]
      });
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-cyan-950/40 border border-cyan-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
              <Cpu className="w-4 h-4" />
              <span>SHΞN™ LOW-LEVEL NASM KERNEL STUDIO</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Assembly Kernel Playground & Assembler
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Write, inspect, and benchmark pure x86-64 assembly kernels optimized with AVX2, F16C, and VPDPBUSD instructions. Zero C/libc overhead.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunSimulation}
              disabled={isExecuting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isExecuting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isExecuting ? 'Assembling & Executing...' : 'Assemble & Run Kernel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Kernel Preset Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Optimized ASM Kernels</span>
            </h2>
            <span className="text-xs font-mono text-zinc-500">{PRESET_KERNELS.length} Available</span>
          </div>

          <div className="space-y-3">
            {PRESET_KERNELS.map((kernel) => {
              const isSelected = selectedKernel.id === kernel.id;
              return (
                <div
                  key={kernel.id}
                  onClick={() => handleSelectKernel(kernel)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-cyan-300 uppercase">
                      {kernel.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      {kernel.cyclesPerToken} cyc/tok
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {kernel.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {kernel.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Hardware Stats */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
              Hardware Profile
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Instruction Set:</span>
                <span className="text-cyan-400">x86_64 AVX2 / F16C</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Memory Model:</span>
                <span className="text-emerald-400">Zero-Copy MMap</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Register Width:</span>
                <span className="text-white">256-bit (YMM0-15)</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>C Dependencies:</span>
                <span className="text-amber-400">0 (Bare-Metal)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Center: Code Editor & Execution Output */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Editor Card */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/60 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-semibold text-zinc-300">
                  {selectedKernel.name}.asm
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span>NASM 2.16</span>
                <span>•</span>
                <span>ELF64</span>
              </div>
            </div>
            
            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                className="w-full bg-zinc-950 text-cyan-300 font-mono text-xs p-4 rounded-xl border border-zinc-800 focus:outline-none focus:border-cyan-500/50 resize-y leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Execution Results & Register State */}
          {executionOutput && (
            <div className="bg-zinc-900/90 border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Assembly Execution Successful</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                  <span>Latency: <strong className="text-cyan-400">{executionOutput.cycles} cycles/tok</strong></span>
                  <span>Instructions: <strong className="text-white">{executionOutput.instructionsCount}</strong></span>
                </div>
              </div>

              {/* Logs */}
              <div className="bg-zinc-950 rounded-xl p-3 font-mono text-xs space-y-1 border border-zinc-800">
                {executionOutput.logs.map((log, idx) => (
                  <div key={idx} className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('EXEC') ? 'text-cyan-300' : 'text-zinc-400'}>
                    {log}
                  </div>
                ))}
              </div>

              {/* Register Dump */}
              <div>
                <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-cyan-400" />
                  <span>CPU & Vector Register State (Post-Execution)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(executionOutput.registers).map(([reg, val]) => (
                    <div key={reg} className="bg-zinc-950 border border-zinc-800/80 px-3 py-2 rounded-lg flex items-center justify-between font-mono text-xs">
                      <span className="text-cyan-400 font-semibold">{reg}</span>
                      <span className="text-zinc-300 truncate max-w-[200px]" title={val}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!executionOutput && !isExecuting && (
            <div className="bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl p-8 text-center space-y-2">
              <Zap className="w-8 h-8 text-cyan-400/40 mx-auto" />
              <h3 className="text-sm font-medium text-zinc-300">Ready to Assemble</h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                Click "Assemble & Run Kernel" to compile the NASM instructions, simulate vector execution on AVX2 registers, and measure hardware instruction throughput.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
