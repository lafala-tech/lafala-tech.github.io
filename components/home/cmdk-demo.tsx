'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { Command, CornerDownLeft, RotateCcw, Sparkles, Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { BrowserFrame } from '@/components/shared/browser-frame';
import { cn } from '@/lib/cn';

interface Scenario {
  prompt: string;
  toolName: string;
  toolLabel: string;
  beforeTotal: number;
  afterTotal: number;
  diffLabel: string;
  diffAmount: number;
  toastLabel: string;
}

interface Row {
  name: string;
  qty: string;
  amount: number;
}

type Phase = 'idle' | 'focus' | 'typing' | 'submitting' | 'tool' | 'result' | 'settle';

const TYPE_MS = 48;
const TYPE_JITTER = 18;
const SUBMIT_HOLD_MS = 380;
const TOOL_RUN_MS = 1050;
const SETTLE_MS = 2800;

function format(n: number, currency: string) {
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(Math.round(n));
  return `${sign}${currency}${abs.toLocaleString('en-US')}`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function CmdKDemo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const t = useTranslations('home.cmdkDemo');
  const scenarios = useMemo(() => t.raw('scenarios') as Scenario[], [t]);
  const rows = useMemo(() => t.raw('rows') as Row[], [t]);
  const currency = t('currency');
  const totalLabel = t('totalLabel');
  const hintLabel = t('hintLabel');
  const replayLabel = t('replay');
  const url = t('url');

  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.4 });
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('idle');
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [displayTotal, setDisplayTotal] = useState<number>(scenarios[0]?.beforeTotal ?? 0);
  const [showDiff, setShowDiff] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [iteration, setIteration] = useState(0); // manual replay trigger

  const scenario = scenarios[scenarioIdx];
  const cancelledRef = useRef(false);

  const runTimeline = useCallback(async () => {
    cancelledRef.current = false;
    if (!scenario) return;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => resolve(), ms);
        // Yes, we let lingering timers settle naturally on cancel — they no-op via cancelledRef.
        return id;
      });

    setShowDiff(false);
    setShowToast(false);
    setTyped('');
    setDisplayTotal(scenario.beforeTotal);

    setPhase('focus');
    await wait(700);
    if (cancelledRef.current) return;

    // typing
    setPhase('typing');
    for (let i = 1; i <= scenario.prompt.length; i++) {
      if (cancelledRef.current) return;
      setTyped(scenario.prompt.slice(0, i));
      const jitter = (Math.random() - 0.5) * TYPE_JITTER;
      await wait(Math.max(20, TYPE_MS + jitter));
    }

    // submit
    setPhase('submitting');
    await wait(SUBMIT_HOLD_MS);
    if (cancelledRef.current) return;

    // tool call
    setPhase('tool');
    await wait(TOOL_RUN_MS);
    if (cancelledRef.current) return;

    // result
    setPhase('result');
    setShowToast(true);
    setShowDiff(true);
    if (scenario.beforeTotal !== scenario.afterTotal) {
      const controls = animate(scenario.beforeTotal, scenario.afterTotal, {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setDisplayTotal(v),
      });
      await new Promise<void>((resolve) => {
        controls.then(() => resolve()).catch(() => resolve());
      });
    } else {
      await wait(700);
    }
    if (cancelledRef.current) return;

    // settle then advance to next scenario
    setPhase('settle');
    await wait(SETTLE_MS);
    if (cancelledRef.current) return;

    setScenarioIdx((idx) => (idx + 1) % scenarios.length);
    setPhase('idle');
  }, [scenario, scenarios.length]);

  // Run timeline when in view; halt when out of view / unmount.
  useEffect(() => {
    if (reduced) {
      // Show the "after" state for the current scenario, no animation.
      const s = scenarios[scenarioIdx];
      if (!s) return;
      setTyped(s.prompt);
      setDisplayTotal(s.afterTotal);
      setShowDiff(true);
      setShowToast(false);
      setPhase('settle');
      return;
    }
    if (!inView) return;
    if (phase !== 'idle') return;
    runTimeline();
    return () => {
      cancelledRef.current = true;
    };
    // We only want to start the timeline when these inputs change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, scenarioIdx, iteration, reduced]);

  // Cancel on unmount
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const onReplay = () => {
    cancelledRef.current = true;
    setScenarioIdx(0);
    setPhase('idle');
    setIteration((n) => n + 1);
  };

  const showCmdkOverlay =
    phase === 'focus' || phase === 'typing' || phase === 'submitting' || phase === 'tool';

  const showCaret = phase === 'typing' || phase === 'focus' || phase === 'submitting';

  return (
    <div ref={containerRef} className={cn('relative w-full max-w-2xl', className)}>
      <BrowserFrame url={url} className="bg-background/80">
        <div className="relative">
          {/* Quotation page */}
          <div className={cn('p-4 md:p-6', compact && 'p-3 md:p-4')}>
            {/* Header row */}
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-foreground-subtle text-[10px] uppercase tracking-wider">
                  Quotation
                </div>
                <div className="text-foreground text-sm font-semibold">Q-2026-018</div>
              </div>
              <button
                type="button"
                className="border-border bg-surface text-foreground-muted hover:text-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] transition"
                aria-label={hintLabel}
              >
                <Command className="size-3" />
                K
              </button>
            </div>

            {/* Lines */}
            <ul className="flex flex-col">
              {rows.map((row, i) => (
                <li
                  key={i}
                  className="border-border flex items-center justify-between gap-3 border-b py-2.5 last:border-b-0"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-foreground truncate text-xs font-medium md:text-sm">
                      {row.name}
                    </div>
                    <div className="text-foreground-subtle text-[10px] md:text-[11px]">
                      {row.qty}
                    </div>
                  </div>
                  <div className="text-foreground tabular-nums text-xs font-medium md:text-sm">
                    {format(row.amount, currency)}
                  </div>
                </li>
              ))}
              {/* Diff line */}
              <li
                className={cn(
                  'flex items-center justify-between gap-3 py-2.5 transition-all duration-500',
                  showDiff
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-1 opacity-0',
                )}
                aria-hidden={!showDiff}
              >
                <span className="text-accent text-xs font-medium md:text-sm">
                  {scenario?.diffLabel}
                </span>
                {scenario && scenario.diffAmount !== 0 ? (
                  <span className="text-accent tabular-nums text-xs font-medium md:text-sm">
                    {format(scenario.diffAmount, currency)}
                  </span>
                ) : null}
              </li>
            </ul>

            {/* Total */}
            <div className="border-border-strong mt-4 flex items-center justify-between border-t pt-3">
              <span className="text-foreground-muted text-xs uppercase tracking-wider">
                {totalLabel}
              </span>
              <span className="text-foreground gradient-text tabular-nums text-xl font-semibold md:text-2xl">
                {format(displayTotal, currency)}
              </span>
            </div>
          </div>

          {/* ⌘K overlay */}
          <div
            aria-hidden={!showCmdkOverlay}
            className={cn(
              'glass border-border-strong absolute inset-x-3 top-3 z-20 rounded-xl border p-3 shadow-2xl transition-all duration-200',
              showCmdkOverlay
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none -translate-y-2 opacity-0',
            )}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="text-accent size-4 shrink-0" />
              <div className="text-foreground min-h-[1.25rem] flex-1 text-sm">
                {typed}
                {showCaret ? (
                  <span className="bg-foreground ml-0.5 inline-block h-4 w-px animate-pulse align-middle" />
                ) : null}
              </div>
              <span className="border-border bg-surface text-foreground-subtle inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px]">
                <CornerDownLeft className="size-3" />
              </span>
            </div>
            {/* Tool-call chip */}
            <div
              className={cn(
                'mt-2 transition-all duration-300',
                phase === 'tool' || phase === 'result'
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-1 opacity-0',
              )}
            >
              <div className="bg-brand-soft border-border-strong flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[11px]">
                <Wrench className="text-success size-3 shrink-0" />
                <span className="text-foreground truncate font-mono">
                  {scenario?.toolName}
                </span>
                {phase === 'tool' ? (
                  <span className="ml-auto flex items-center gap-0.5">
                    <span className="bg-foreground-muted size-1 animate-bounce rounded-full [animation-delay:-0.3s]" />
                    <span className="bg-foreground-muted size-1 animate-bounce rounded-full [animation-delay:-0.15s]" />
                    <span className="bg-foreground-muted size-1 animate-bounce rounded-full" />
                  </span>
                ) : (
                  <span className="text-success ml-auto text-[10px]">✓</span>
                )}
              </div>
            </div>
          </div>

          {/* Toast */}
          <div
            aria-hidden={!showToast}
            className={cn(
              'glass border-success/60 absolute bottom-3 right-3 z-30 rounded-lg border px-3 py-2 shadow-xl transition-all duration-300',
              showToast
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-2 opacity-0',
            )}
          >
            <div className="text-foreground flex items-center gap-2 text-xs">
              <span className="bg-success size-1.5 rounded-full" />
              {scenario?.toastLabel}
            </div>
          </div>
        </div>
      </BrowserFrame>

      {/* Footer controls */}
      <div className="text-foreground-subtle mt-3 flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5">
          {scenarios.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1 w-5 rounded-full transition-all duration-300',
                i === scenarioIdx ? 'bg-accent w-8' : 'bg-foreground-subtle/40',
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onReplay}
          className="hover:text-foreground inline-flex items-center gap-1 transition"
        >
          <RotateCcw className="size-3" />
          {replayLabel}
        </button>
      </div>
    </div>
  );
}
