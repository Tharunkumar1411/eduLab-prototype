/**
 * Inspector Fin Chatbot Component.
 * Multi-turn Gemini chat interface integrated across Playground and Trading Lab.
 * Supports context-awareness, dynamic model selection, quick suggestions,
 * and a scrollable message thread.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Bot, ChevronDown, ChevronUp, CornerDownLeft, Maximize2, MessageSquare, Minimize2, RotateCcw, Send, Sparkles, X, Zap } from 'lucide-react';

import { generateProactiveHint, ProactiveHint } from '../../engine/proactiveHints.ts';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isHintTriggered?: boolean;
}

export interface ChatContext {
  currentPillar: 'home' | 'playground' | 'tools';
  // Playground
  activeCaseId?: string;
  activeCaseTitle?: string;
  activeCaseTicker?: string;
  caseCompany?: string;
  caseStep?: 'scenario' | 'investigate' | 'decision' | 'debrief';
  unlockedClueTitles?: string[];
  unlockedClueCount?: number;
  totalCluesCount?: number;
  actionPointsRemaining?: number;
  concernCount?: number;
  supportCount?: number;
  neutralCount?: number;
  selectedDecisionTitle?: string;
  reasoningScore?: number;
  // Tools / Trading Lab
  selectedStockSymbol?: string;
  selectedStockName?: string;
  selectedStockSector?: string;
  labTab?: 'explorer' | 'tech_tools' | 'builder' | 'results' | 'comparison' | 'calculators';
  strategyName?: string;
  entryConditionsCount?: number;
  exitConditionsCount?: number;
  hasStopLoss?: boolean;
  stopLossPercent?: number | null;
  hasTakeProfit?: boolean;
  takeProfitPercent?: number | null;
  latestBacktestReturn?: number;
  latestDrawdown?: number;
  benchmarkReturn?: number;
  winRate?: number;
  totalTrades?: number;
  profitFactor?: number;
  hasExperimentRun?: boolean;
  experimentReturnDiff?: number;
  experimentDrawdownDiff?: number;
}

interface InspectorFinChatbotProps {
  context: ChatContext;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
}

export const InspectorFinChatbot: React.FC<InspectorFinChatbotProps> = ({
  context,
  isOpen: controlledIsOpen,
  onOpenChange,
  externalPrompt,
  onClearExternalPrompt,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (valOrFn: boolean | ((prev: boolean) => boolean)) => {
    const nextVal = typeof valOrFn === 'function' ? valOrFn(isOpen) : valOrFn;
    if (onOpenChange) {
      onOpenChange(nextVal);
    } else {
      setInternalIsOpen(nextVal);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [modelChoice, setModelChoice] = useState<'gemini-3.5-flash' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [isLoading, setIsLoading] = useState(false);
  const [dismissedHintId, setDismissedHintId] = useState<string | null>(null);

  // Automatically compute proactive hint based on current state
  const proactiveHint: ProactiveHint = generateProactiveHint(context);
  const isHintDismissed = dismissedHintId === proactiveHint.id;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm Inspector Fin, your financial detective & quantitative trading mentor.
I am actively monitoring your progress and can offer forensic clues, ratio breakdowns, or backtest diagnostics.

Ask me any doubt, or click the proactive observation below to explore!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Context-specific quick prompts
  const getContextualPrompts = () => {
    return proactiveHint.suggestedPrompts;
  };

  const handleSendMessage = async (textToSend?: string, isHintAction: boolean = false) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isHintTriggered: isHintAction,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(m => ({ role: m.role, content: m.content })),
          context,
          model: modelChoice,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response generated. Please ask again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `I encountered a hiccup connecting to the analytical servers (${err.message || 'Network error'}). Please try asking again!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically trigger message when external prompt is requested (e.g. from Home AI prompt section)
  useEffect(() => {
    if (externalPrompt && externalPrompt.trim()) {
      setIsOpen(true);
      handleSendMessage(externalPrompt.trim());
      if (onClearExternalPrompt) {
        onClearExternalPrompt();
      }
    }
  }, [externalPrompt]);

  const handleDiscussProactiveHint = () => {
    const query = `Fin, I noticed your hint: "${proactiveHint.hintText}". Can you explain why this specific dynamic matters and what questions I should ask myself next?`;
    handleSendMessage(query, true);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'reset',
        role: 'assistant',
        content: `Investigation log cleared! Current context: ${
          context.currentPillar === 'playground'
            ? `Playground Case: ${context.activeCaseTitle || 'Case File'} (${context.caseStep || 'investigation'})`
            : `Trading Lab: ${context.selectedStockSymbol || 'Indian Stocks'} (${context.labTab || 'explorer'})`
        }. What would you like to examine?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button with Proactive Insight Teaser */}
      {!isOpen && (
        <div className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
          {/* Proactive hint teaser bubble (desktop/tablet only to avoid cluttering mobile viewport, fully dismissible) */}
          {!isHintDismissed && (
            <div
              onClick={() => {
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 150);
              }}
              className="hidden sm:block cursor-pointer max-w-[280px] sm:max-w-[340px] p-2.5 rounded-xl bg-slate-900/95 border border-teal-500/40 shadow-xl backdrop-blur-md text-xs text-slate-200 hover:border-teal-400 transition-all transform hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-teal-400">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Fin's Insight · {proactiveHint.badge}</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 font-medium group-hover:text-teal-300">Tap to discuss →</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDismissedHintId(proactiveHint.id);
                    }}
                    className="p-0.5 text-slate-500 hover:text-slate-200 rounded transition-colors text-xs"
                    title="Dismiss teaser"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                "{proactiveHint.hintText}"
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => inputRef.current?.focus(), 150);
            }}
            className="flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs shadow-2xl shadow-teal-950/60 border border-teal-400/40 transition-all transform hover:scale-105 active:scale-95"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950/40 flex items-center justify-center font-bold text-amber-300 text-xs">
              🕵️
            </div>
            <span>Ask Inspector Fin</span>
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
          </button>
        </div>
      )}

      {/* Slide-over / Modal Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-[110] transition-all duration-300 flex flex-col bg-slate-900 border border-slate-700/80 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md ${
            isExpanded
              ? 'inset-4 sm:inset-10'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[450px] h-[600px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-950 border border-teal-600/50 flex items-center justify-center text-sm shadow-inner">
                🕵️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-100">
                    Inspector Fin
                  </h3>
                  <span className="text-[10px] font-semibold text-teal-400 bg-teal-950 px-1.5 py-0.2 rounded border border-teal-800/40">
                    Live Mentor
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[210px]">
                  {context.currentPillar === 'playground'
                    ? `Case: ${context.activeCaseTitle || 'Case Library'}${context.caseStep ? ` · ${context.caseStep}` : ''}`
                    : `Trading Lab: ${context.selectedStockSymbol || 'Stocks'}${context.labTab ? ` · ${context.labTab}` : ''}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              {/* Clear */}
              <button
                onClick={handleClearHistory}
                className="p-1.5 hover:text-slate-200 hover:bg-slate-850 rounded-lg transition-colors"
                title="Clear conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Expand / Collapse */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:text-slate-200 hover:bg-slate-850 rounded-lg transition-colors hidden sm:block"
                title={isExpanded ? 'Collapse view' : 'Expand view'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-rose-400 hover:bg-slate-850 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Model Selector Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/70 border-b border-slate-850 text-[11px]">
            <span className="text-slate-400 font-medium">Model Speed:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setModelChoice('gemini-3.5-flash')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  modelChoice === 'gemini-3.5-flash'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Balanced (3.5 Flash)
              </button>
              <button
                onClick={() => setModelChoice('gemini-3.1-flash-lite')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors flex items-center gap-1 ${
                  modelChoice === 'gemini-3.1-flash-lite'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-2.5 h-2.5" />
                <span>Fast (Lite)</span>
              </button>
            </div>
          </div>

          {/* Proactive Live Progress Insight Card */}
          {!isHintDismissed && (
            <div className="m-3 p-3 bg-slate-950/80 border border-teal-500/30 rounded-xl relative shadow-md">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                    Proactive Analysis · {proactiveHint.badge}
                  </span>
                </div>
                <button
                  onClick={() => setDismissedHintId(proactiveHint.id)}
                  className="text-slate-500 hover:text-slate-300 text-xs p-0.5"
                  title="Dismiss insight"
                >
                  ✕
                </button>
              </div>

              <h4 className="text-xs font-bold text-slate-100 mb-1">
                {proactiveHint.title}
              </h4>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                {proactiveHint.hintText}
              </p>

              <div className="mt-2.5 flex items-center justify-between border-t border-slate-850 pt-2">
                <span className="text-[10px] text-slate-400 font-medium">
                  Non-prescriptive guidance
                </span>

                <button
                  onClick={handleDiscussProactiveHint}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-400 hover:text-teal-300 transition-colors disabled:opacity-50"
                >
                  <span>Discuss this with Fin</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed whitespace-pre-wrap ${
                      isAssistant
                        ? 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-tl-xs shadow-sm'
                        : msg.isHintTriggered
                        ? 'bg-teal-700 text-white rounded-tr-xs shadow-sm border border-teal-500/40'
                        : 'bg-teal-600 text-white rounded-tr-xs shadow-sm'
                    }`}
                  >
                    {msg.content}
                  </div>

                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="p-3 bg-slate-800 rounded-2xl rounded-tl-xs border border-slate-700/60 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-400 ml-1">Fin is evaluating the clues...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Contextual Questions Carousel */}
          <div className="p-2.5 bg-slate-950 border-t border-slate-800">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1.5">
              Live Stage Doubts:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {getContextualPrompts().map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-750 text-[11px] text-slate-300 hover:text-teal-300 hover:border-teal-500/50 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-850 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question about this clue, metric, or rule..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white disabled:text-slate-600 transition-colors shrink-0 shadow-sm"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

