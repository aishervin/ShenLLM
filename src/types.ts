export type ActiveTab = 'playground' | 'chat' | 'baremetal' | 'benchmarks' | 'trainer' | 'docs';

export interface AssemblyKernel {
  id: string;
  name: string;
  description: string;
  code: string;
  registersUsed: string[];
  cyclesPerToken: number;
  category: 'attention' | 'matmul' | 'norm' | 'quantization';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tokensGenerated?: number;
  tokensPerSec?: number;
  latencyMs?: number;
  instructionsExecuted?: string;
  registersDump?: Record<string, string>;
}

export interface BenchmarkData {
  engine: string;
  tokensPerSec: number;
  memoryFootprintMB: number;
  startupMs: number;
  cpuUtilization: number;
  isAssembly: boolean;
}

export interface BootLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'hardware';
  message: string;
}
