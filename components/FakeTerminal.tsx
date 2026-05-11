"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

type FakeTerminalProps = {
  open: boolean;
  onClose: () => void;
};

type Entry = {
  kind: "input" | "output" | "error" | "success" | "ascii" | "system";
  text: string;
};

const COMMANDS = [
  "help", "whoami", "about", "ls projects", "cat skills.txt", "contact",
  "education", "experience", "stack", "resume", "github", "date",
  "neofetch", "history", "clear", "sudo rm -rf /", "matrix", "echo"
];

function getCommandOutput(command: string, history: string[]): { entries: Entry[]; action?: string } {
  const normalized = command.trim().toLowerCase();

  // Handle echo command
  if (normalized.startsWith("echo ")) {
    const text = command.trim().slice(5);
    return { entries: [{ kind: "output", text: text || "" }] };
  }

  switch (normalized) {
    case "help":
      return {
        entries: [
          { kind: "system", text: "╭─ Available Commands ─────────────────────────╮" },
          { kind: "output", text: "  whoami          → Who is this person?" },
          { kind: "output", text: "  about           → Detailed bio" },
          { kind: "output", text: "  ls projects     → List all projects" },
          { kind: "output", text: "  cat skills.txt  → View technical skills" },
          { kind: "output", text: "  contact         → Contact information" },
          { kind: "output", text: "  education       → Academic background" },
          { kind: "output", text: "  experience      → Timeline / journey" },
          { kind: "output", text: "  stack           → Tech stack breakdown" },
          { kind: "output", text: "  resume          → Open resume (PDF)" },
          { kind: "output", text: "  github          → Open GitHub profile" },
          { kind: "output", text: "  date            → Current date & time" },
          { kind: "output", text: "  neofetch        → System info (fun)" },
          { kind: "output", text: "  echo <text>     → Echo back text" },
          { kind: "output", text: "  history         → Command history" },
          { kind: "output", text: "  clear           → Clear terminal" },
          { kind: "system", text: "╰──────────────────────────────────────────────╯" },
          { kind: "system", text: "  Tip: Use ↑/↓ for history, Tab for autocomplete" },
        ]
      };

    case "whoami":
      return {
        entries: [
          { kind: "success", text: "astik" },
          { kind: "output", text: "Student Builder • Python Dev • AIML Explorer" },
          { kind: "output", text: "Currently: 2nd year B.Tech CSE (AIML)" },
          { kind: "output", text: "Location: India" },
        ]
      };

    case "about":
      return {
        entries: [
          { kind: "system", text: "┌─ About Astik Tripathi ───────────────────────┐" },
          { kind: "output", text: "│ A second-year CS student obsessed with      │" },
          { kind: "output", text: "│ building things that actually work: ML       │" },
          { kind: "output", text: "│ systems, embedded hardware, interactive UIs, │" },
          { kind: "output", text: "│ and everything in between. Thinks deeply     │" },
          { kind: "output", text: "│ before acting, learns by doing, and loves    │" },
          { kind: "output", text: "│ solving problems without obvious answers.    │" },
          { kind: "system", text: "└──────────────────────────────────────────────┘" },
          { kind: "success", text: "Mindset: Deep Thinker • Experimental • Learning-Driven" },
        ]
      };

    case "ls projects":
      return {
        entries: [
          { kind: "system", text: "drwxr-xr-x  projects/" },
          { kind: "success", text: "├── traffic-detection-system/" },
          { kind: "output", text: "│   └── Python, OpenCV, ML, Computer Vision" },
          { kind: "success", text: "├── traffic-accident-severity-prediction/" },
          { kind: "output", text: "│   └── Python, Scikit-learn, Data Analysis" },
          { kind: "success", text: "└── smash-sessions-unleashed/" },
          { kind: "output", text: "    └── Frontend Dev, Interactive UI, Web Design" },
          { kind: "system", text: "3 projects total" },
        ]
      };

    case "cat skills.txt":
      return {
        entries: [
          { kind: "system", text: "=== Core Skills ===" },
          { kind: "success", text: "Python .............. ████████████████████░░ 96%" },
          { kind: "success", text: "Git & OSS ........... ██████████████████░░░░ 90%" },
          { kind: "success", text: "Flask/FastAPI/Next ... ████████████████████░ 88%" },
          { kind: "success", text: "DSA ................. ████████████████░░░░░ 84%" },
          { kind: "success", text: "ML Frameworks ....... ████████████████░░░░░ 82%" },
          { kind: "output", text: "UI/UX Design ........ ███████████████░░░░░░ 79%" },
          { kind: "output", text: "C Programming ....... ███████████████░░░░░░ 78%" },
          { kind: "output", text: "Embedded Systems .... ██████████████░░░░░░░ 74%" },
          { kind: "output", text: "Networking .......... █████████████░░░░░░░░ 73%" },
          { kind: "system", text: "=== Learning ===" },
          { kind: "output", text: "AI-Assisted Dev ..... ████████████░░░░░░░░░ 63%" },
          { kind: "output", text: "AIML Engineering .... ███████████░░░░░░░░░░ 58%" },
          { kind: "output", text: "Full-Stack .......... ██████████░░░░░░░░░░░ 53%" },
          { kind: "output", text: "3D Web Dev .......... █████████░░░░░░░░░░░░ 46%" },
        ]
      };

    case "contact":
      return {
        entries: [
          { kind: "system", text: "╭─ Contact Information ────────────────────────╮" },
          { kind: "success", text: "  📧 Email:    astik.tr@gmail.com" },
          { kind: "success", text: "  📱 Phone:    +91 9259500529" },
          { kind: "success", text: "  🐙 GitHub:   github.com/astik-t" },
          { kind: "success", text: "  🔗 LinkedIn: linkedin.com/in/astik-tripathi" },
          { kind: "system", text: "╰──────────────────────────────────────────────╯" },
          { kind: "output", text: "Status: Open to opportunities • Collaborations welcome" },
        ]
      };

    case "education":
      return {
        entries: [
          { kind: "system", text: "🎓 Education" },
          { kind: "success", text: "Graphic Era Deemed to be University" },
          { kind: "output", text: "B.Tech CSE with AIML • 2025–2029" },
          { kind: "output", text: "Coursework: PBL Projects, AIML, Data Mining, C" },
        ]
      };

    case "experience":
      return {
        entries: [
          { kind: "system", text: "📅 Journey Timeline" },
          { kind: "output", text: "2023 → Started CS journey (first Python script)" },
          { kind: "output", text: "2024 → Built first Arduino project" },
          { kind: "output", text: "2025 → Dived into ML/AI, first model complete" },
          { kind: "output", text: "2025 → Started contributing to open source" },
          { kind: "output", text: "2026 → Built real-world ML projects" },
          { kind: "output", text: "2026 → Started C for fundamentals" },
          { kind: "output", text: "2026 → Frameworks & deployment tools" },
          { kind: "success", text: "NOW  → 2nd year, building deeper 🚀" },
        ]
      };

    case "stack":
      return {
        entries: [
          { kind: "system", text: "⚡ Tech Stack" },
          { kind: "success", text: "Languages:   Python, C, JavaScript, TypeScript" },
          { kind: "success", text: "ML/AI:       PyTorch, Scikit-learn, OpenCV" },
          { kind: "success", text: "Web:         Next.js, React, Flask, FastAPI" },
          { kind: "success", text: "Styling:     Tailwind CSS, Framer Motion" },
          { kind: "success", text: "Tools:       Git, VS Code, Arduino, Vercel" },
          { kind: "output", text: "Learning:    Three.js, R3F, Full-Stack, AIML Eng." },
        ]
      };

    case "resume":
      return {
        entries: [{ kind: "success", text: "Opening resume in new tab..." }],
        action: "resume"
      };

    case "github":
      return {
        entries: [{ kind: "success", text: "Opening GitHub profile..." }],
        action: "github"
      };

    case "date":
      return {
        entries: [
          { kind: "success", text: new Date().toLocaleString("en-IN", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short"
          })},
        ]
      };

    case "neofetch":
      return {
        entries: [
          { kind: "ascii", text: "        ╭─────────╮" },
          { kind: "ascii", text: "       ╱    ▲    ╱│" },
          { kind: "ascii", text: "      ╱  ASTIK  ╱ │" },
          { kind: "ascii", text: "     ╱    ▼    ╱  │" },
          { kind: "ascii", text: "    ╰─────────╯   │" },
          { kind: "ascii", text: "    │         │  ╱" },
          { kind: "ascii", text: "    │  ◉   ◉  │╱" },
          { kind: "ascii", text: "    ╰─────────╯" },
          { kind: "output", text: "" },
          { kind: "success", text: "OS:       AstikOS v2.0 (Portfolio Edition)" },
          { kind: "output", text: "Host:     astik-tripathi.dev" },
          { kind: "output", text: "Kernel:   Next.js 16.2.6" },
          { kind: "output", text: "Shell:    FakeTerminal v2.0" },
          { kind: "output", text: "Theme:    Cinematic Dark [monochrome]" },
          { kind: "output", text: "Renderer: Framer Motion + OGL" },
          { kind: "output", text: "Font:     Outfit / Sora / JetBrains Mono" },
          { kind: "output", text: "Uptime:   Since 2023 ⏱" },
          { kind: "success", text: "Status:   Building something great ✨" },
        ]
      };

    case "history":
      if (history.length === 0) {
        return { entries: [{ kind: "output", text: "No commands in history." }] };
      }
      return {
        entries: history.map((cmd, i) => ({
          kind: "output" as const,
          text: `  ${String(i + 1).padStart(3)}  ${cmd}`
        }))
      };

    case "sudo rm -rf /":
      return {
        entries: [
          { kind: "error", text: "🚫 Permission denied: Nice try!" },
          { kind: "error", text: "This portfolio is protected by plot armor." },
          { kind: "output", text: "Besides, you'd lose all these cool particles..." },
        ]
      };

    case "matrix":
      return {
        entries: [
          { kind: "success", text: "Wake up, Neo..." },
          { kind: "ascii", text: "01001000 01100101 01101100 01101100 01101111" },
          { kind: "output", text: "The Matrix has you..." },
          { kind: "success", text: "Follow the white rabbit. 🐇" },
          { kind: "output", text: "Knock, knock, Astik." },
        ]
      };

    case "echo":
      return { entries: [{ kind: "output", text: "" }] };

    case "clear":
      return { entries: [] };

    default:
      return {
        entries: [
          { kind: "error", text: `command not found: ${command.trim()}` },
          { kind: "output", text: "Type 'help' to see available commands." },
        ]
      };
  }
}

const colorMap: Record<Entry["kind"], string> = {
  input: "text-accent",
  output: "text-muted",
  error: "text-red-400",
  success: "text-emerald-400",
  ascii: "text-accent/70 font-mono",
  system: "text-white/50",
};

export function FakeTerminal({ open, onClose }: FakeTerminalProps) {
  const [entries, setEntries] = useState<Entry[]>([
    { kind: "system", text: "╭─ Astik's Portfolio Terminal v2.0 ──────────────╮" },
    { kind: "system", text: "│ Type 'help' to see commands • Ctrl+` to close │" },
    { kind: "system", text: "╰────────────────────────────────────────────────╯" },
  ]);
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tabSuggestion, setTabSuggestion] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  // Focus input when terminal opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (event: globalThis.KeyboardEvent) => {
      if (event.ctrlKey && event.key === "`") {
        event.preventDefault();
        if (open) {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, open]);

  const prompt = useMemo(() => "astik@portfolio:~$", []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    // Arrow up — go back in history
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
      setTabSuggestion(null);
      return;
    }

    // Arrow down — go forward in history
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCommand("");
      }
      setTabSuggestion(null);
      return;
    }

    // Tab — auto-complete
    if (event.key === "Tab") {
      event.preventDefault();
      const partial = command.trim().toLowerCase();
      if (!partial) return;

      const matches = COMMANDS.filter(cmd => cmd.startsWith(partial) && cmd !== partial);
      if (matches.length === 1) {
        setCommand(matches[0] + (matches[0] === "echo" ? " " : ""));
        setTabSuggestion(null);
      } else if (matches.length > 1) {
        setTabSuggestion(matches.join("  "));
      }
      return;
    }

    setTabSuggestion(null);
  }, [command, commandHistory, historyIndex]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = command.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();

    // Add to history
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    setTabSuggestion(null);

    setEntries((current) => {
      if (normalized === "clear") {
        return [];
      }
      const { entries: outputEntries, action } = getCommandOutput(trimmed, [...commandHistory, trimmed]);

      // Handle actions
      if (action === "resume") {
        setTimeout(() => window.open("/assets/resume.pdf", "_blank", "noopener,noreferrer"), 200);
      } else if (action === "github") {
        setTimeout(() => window.open("https://github.com/astik-t", "_blank", "noopener,noreferrer"), 200);
      }

      return [
        ...current,
        { kind: "input" as const, text: trimmed },
        ...outputEntries,
      ];
    });
    setCommand("");
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-3xl rounded-3xl border border-accent/20 bg-[#07070f]/95 p-4 shadow-2xl shadow-accent/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <span className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent/90">Terminal</p>
              </div>
              <p className="mt-1 text-xs text-muted">Ctrl+` to close • ↑↓ history • Tab complete</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-full border border-white/10 p-2 text-text hover:bg-white/5 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div
            ref={scrollRef}
            className="terminal-glow mt-4 max-h-80 overflow-y-auto rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-sm"
          >
            {entries.map((entry, index) => (
              <motion.div
                key={`${entry.kind}-${index}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: Math.min(index * 0.02, 0.3) }}
                className="mb-1.5 leading-6"
              >
                {entry.kind === "input" ? (
                  <span className="text-accent">{prompt} </span>
                ) : (
                  <span className="text-white/20 select-none">{">"} </span>
                )}
                <span className={colorMap[entry.kind]}>{entry.text}</span>
              </motion.div>
            ))}

            {/* Tab suggestion display */}
            {tabSuggestion && (
              <div className="mb-2 text-xs text-white/30">
                {tabSuggestion}
              </div>
            )}

            <form onSubmit={submit} className="mt-3 flex items-center gap-2">
              <span className="text-accent">{prompt}</span>
              <input
                ref={inputRef}
                autoFocus
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-text outline-none placeholder:text-muted/40 caret-accent"
                placeholder="type a command..."
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
            </form>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}