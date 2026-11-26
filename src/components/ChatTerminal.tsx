import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { Terminal, Send, Cpu, Zap, Sliders, Shield, Sparkles, User, Bot, RefreshCw } from 'lucide-react';

export const ChatTerminal: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: 'SHΞN™ LLM v1.0 Kernel Initialized. Model: Qwen3-0.6B (Q8_0 Quantized). Execution: 100% Pure x86-64 NASM. Ready for low-latency inference.',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Greetings. I am SHΞN™ LLM, running entirely on bare-metal assembly without C/libc overhead. Ask me anything or request code, architecture analysis, or matrix multiplication benchmarks.',
      timestamp: new Date().toLocaleTimeString(),
      tokensGenerated: 34,
      tokensPerSec: 142.8,
      latencyMs: 84
    }
  ]);
  const [input, setInput] = useState('');
  const [quantization, setQuantization] = useState<'Q8_0' | 'INT8' | 'INT4' | 'FP16'>('Q8_0');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = input;
    setInput('');
    setIsStreaming(true);

    // Simulate SHΞN™ assembly-speed streaming response
    setTimeout(() => {
      let responseText = '';
      if (query.toLowerCase().includes('asm') || query.toLowerCase().includes('assembly') || query.toLowerCase().includes('kernel')) {
        responseText = `SHΞN™ ASM Engine: Processed via AVX2 vectorized dot products (` + quantization + `). Execution time: 1.14ms. Zero memory allocations outside pre-allocated KV-cache buffer.`;
      } else if (query.toLowerCase().includes('benchmark') || query.toLowerCase().includes('speed')) {
        responseText = `SHΞN™ LLM runs at 142.8 tokens/sec on Qwen3-0.6B with ` + quantization + ` quantization, outperforming llama.cpp by ~48% due to pure NASM register scheduling and manual cache line pre-fetching.`;
      } else {
        responseText = `[SHΞN™ Inference Kernel Response]: Query executed across 16 CPU cores via APIC wakeup. Model parameters mapped directly from physical RAM. Generated 42 tokens in 294ms (142.8 tok/sec).`;
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toLocaleTimeString(),
        tokensGenerated: 42,
        tokensPerSec: 142.8,
        latencyMs: 294,
        instructionsExecuted: '4,829,102 instructions',
        registersDump: {
          'RAX': '0x00007FFF5FBFF800',
          'RSI': '0x00000000408000',
          'YMM0': '0x8F32C10A 4C21B09E'
        }
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsStreaming(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Left Sidebar: Inference Controls */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Sliders className="w-4 h-4" />
            <span>Inference Parameters</span>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono text-zinc-400 block">Quantization Mode</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Q8_0', 'INT8', 'INT4', 'FP16'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setQuantization(mode)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono transition-all border ${
                    quantization === mode
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
            <div className="flex justify-between text-zinc-400">
              <span>Active Model:</span>
              <span className="text-white">Qwen3-0.6B</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Engine Backend:</span>
              <span className="text-cyan-400">Pure NASM x86_64</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>KV-Cache Size:</span>
              <span className="text-emerald-400">512 MB (Static)</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>C Dependencies:</span>
              <span className="text-amber-400">None</span>
            </div>
          </div>

          <div className="bg-zinc-950 border border-cyan-500/20 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <Zap className="w-4 h-4" />
              <span>Assembly Acceleration</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Inference runs via direct instruction pipelining, bypassing OS system calls for thread synchronization.
            </p>
          </div>
        </div>
      </div>

      {/* Right / Center: Chat Window */}
      <div className="lg:col-span-3 flex flex-col h-[700px] bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-zinc-950/80 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-semibold text-zinc-200">SHΞN™ LLM Interactive Console</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Ready (142.8 tok/sec)
            </span>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isSystem = msg.role === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="bg-zinc-950 border border-cyan-500/30 rounded-xl p-3 text-xs font-mono text-cyan-300 text-center">
                  {msg.content}
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
                
                <div className={`max-w-xl rounded-2xl px-4 py-3 space-y-2 ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-sm'
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-bl-sm font-mono text-xs'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  
                  {!isUser && msg.tokensGenerated && (
                    <div className="flex flex-wrap items-center gap-3 pt-2 mt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                      <span>⚡ <strong className="text-cyan-400">{msg.tokensPerSec} tok/sec</strong></span>
                      <span>⏱️ <strong className="text-white">{msg.latencyMs}ms</strong></span>
                      <span>📦 <strong className="text-emerald-400">{msg.tokensGenerated} tokens</strong></span>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-zinc-300" />
                  </div>
                )}
              </div>
            );
          })}
          {isStreaming && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs font-mono text-cyan-400 animate-pulse">
                SHΞN™ NASM Engine executing inference pipeline...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-zinc-950/80 border-t border-zinc-800 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask SHΞN™ LLM or request assembly execution..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 font-mono"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
