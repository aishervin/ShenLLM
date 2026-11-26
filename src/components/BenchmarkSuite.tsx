import React, { useState } from 'react';
import { BENCHMARK_RESULTS } from '../data/kernels';
import { BarChart3, Zap, ShieldCheck, Cpu, HardDrive, Clock, TrendingUp } from 'lucide-react';

export const BenchmarkSuite: React.FC = () => {
  const [metric, setMetric] = useState<'tokensPerSec' | 'memoryFootprintMB' | 'startupMs'>('tokensPerSec');

  const maxVal = Math.max(...BENCHMARK_RESULTS.map((b) => b[metric]));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-emerald-950/40 border border-emerald-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-2">
              <BarChart3 className="w-4 h-4" />
              <span>PERFORMANCE & HARDWARE BENCHMARKS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              SHΞN™ vs Standard Inference Runtimes
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Benchmarked on Qwen3-0.6B (Q8_0 quantization) across 16 CPU cores. Pure NASM assembly eliminates OS scheduling and C/libc runtime bloat.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 p-1 rounded-xl">
            {(['tokensPerSec', 'memoryFootprintMB', 'startupMs'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  metric === m
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {m === 'tokensPerSec' ? 'Tokens / Sec' : m === 'memoryFootprintMB' ? 'Memory (MB)' : 'Startup (ms)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Benchmark Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Summary Stats */}
        <div className="space-y-4">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Key Performance Insights</span>
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block">Inference Speedup</span>
                <span className="text-lg font-bold text-emerald-400">+54% faster</span>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Compared to native C++ llama.cpp running on the same hardware threads.</p>
              </div>

              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block">Memory Footprint</span>
                <span className="text-lg font-bold text-cyan-400">48 MB RAM</span>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Zero virtual machine overhead, zero Python garbage collection.</p>
              </div>

              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block">Cold Boot Latency</span>
                <span className="text-lg font-bold text-blue-400">4 - 12 ms</span>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Boots instantly into long mode without interpreter initialization.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Center: Visual Comparison Bars */}
        <div className="lg:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>
                {metric === 'tokensPerSec' ? 'Throughput (Tokens / Second - Higher is Better)' :
                 metric === 'memoryFootprintMB' ? 'Memory Usage (MB - Lower is Better)' :
                 'Cold Boot Latency (Milliseconds - Lower is Better)'}
              </span>
            </h2>
            <span className="text-xs font-mono text-zinc-500">Qwen3-0.6B Q8_0</span>
          </div>

          <div className="space-y-5">
            {BENCHMARK_RESULTS.map((item, idx) => {
              const val = item[metric];
              const percentage = metric === 'tokensPerSec' ? (val / 180) * 100 : (val / 3000) * 100;
              const isSHEN = item.isAssembly;

              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={`font-medium flex items-center gap-2 ${isSHEN ? 'text-emerald-300 font-bold' : 'text-zinc-300'}`}>
                      {isSHEN && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                      {item.engine}
                    </span>
                    <span className={isSHEN ? 'text-emerald-400 font-bold text-sm' : 'text-zinc-400'}>
                      {val} {metric === 'tokensPerSec' ? 'tok/s' : metric === 'memoryFootprintMB' ? 'MB' : 'ms'}
                    </span>
                  </div>

                  <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden p-0.5 border border-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isSHEN
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                          : 'bg-zinc-700'
                      }`}
                      style={{ width: `${Math.max(Math.min(percentage, 100), 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500">
            <span>Test Hardware: AMD EPYC / Intel Xeon 16-Core AVX2</span>
            <span>Dataset: Wikitext-103 perplexity eval</span>
          </div>
        </div>

      </div>

    </div>
  );
};
