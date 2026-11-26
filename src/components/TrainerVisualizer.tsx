import React, { useState, useEffect } from 'react';
import { Activity, Play, RefreshCw, Terminal, CheckCircle2, Layers, Cpu } from 'lucide-react';

export const TrainerVisualizer: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(3.421);
  const [lossHistory, setLossHistory] = useState<number[]>([3.42, 3.15, 2.89, 2.64, 2.41, 2.20, 2.01, 1.85]);

  useEffect(() => {
    let interval: any;
    if (isTraining && epoch < 50) {
      interval = setInterval(() => {
        setEpoch((prev) => {
          const nextEpoch = prev + 1;
          const newLoss = Number((Math.max(0.45, loss - (Math.random() * 0.08 + 0.02))).toFixed(3));
          setLoss(newLoss);
          setLossHistory((h) => [...h.slice(-12), newLoss]);
          if (nextEpoch >= 50) setIsTraining(false);
          return nextEpoch;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isTraining, epoch, loss]);

  const startTraining = () => {
    setIsTraining(true);
    setEpoch(1);
    setLoss(3.421);
    setLossHistory([3.42, 3.15, 2.89, 2.64, 2.41]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-purple-950/40 border border-purple-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-mono mb-2">
              <Activity className="w-4 h-4" />
              <span>FROM-SCRATCH MINI-GPT TRAINER IN PURE ASSEMBLY</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Assembly Neural Network Trainer & TUI
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Train a miniature Transformer model entirely in x86-64 assembly with zero Python dependencies, featuring live Braille TUI rendering and backpropagation weight matrix updates.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={startTraining}
              disabled={isTraining}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isTraining ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isTraining ? `Training Epoch ${epoch}/50...` : 'Start Assembly Trainer'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Training Parameters */}
        <div className="space-y-4">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Hyperparameters</span>
            </h2>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                <span>Model Layers:</span>
                <span className="text-white">4 Attention Blocks</span>
              </div>
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                <span>Embedding Dim:</span>
                <span className="text-cyan-400">256 hidden</span>
              </div>
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                <span>Batch Size:</span>
                <span className="text-emerald-400">32 sequences</span>
              </div>
              <div className="flex justify-between text-zinc-400 border-b border-zinc-800/60 pb-2">
                <span>Optimizer:</span>
                <span className="text-purple-400">AdamW in ASM</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Current Loss:</span>
                <span className="text-emerald-400 font-bold">{loss}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Center: Braille TUI Loss Graph */}
        <div className="lg:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>Live Braille TUI & Loss Trajectory</span>
            </h2>
            <span className="text-xs font-mono text-purple-300">
              {isTraining ? `Epoch ${epoch}/50` : epoch === 50 ? 'Training Complete' : 'Ready'}
            </span>
          </div>

          {/* Braille Graph Simulation */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 font-mono space-y-4">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Loss: 3.5</span>
              <span>Training Loss Curve (Pure NASM Backprop)</span>
              <span>Loss: 0.4</span>
            </div>

            <div className="h-40 flex items-end justify-between gap-2 pt-6 px-2 border-b border-zinc-800">
              {lossHistory.map((val, idx) => {
                const heightPercent = ((3.5 - val) / 3.0) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] text-purple-400">{val}</span>
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t transition-all duration-300"
                      style={{ height: `${Math.max(heightPercent, 10)}%` }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Step 0</span>
              <span>Step 25</span>
              <span>Step 50 (Converged)</span>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Python, Zero PyTorch, Zero CUDA runtime overhead</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Gradients computed directly via vector arithmetic in AVX registers and written to direct RAM buffer locations.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
