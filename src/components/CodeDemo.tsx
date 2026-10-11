import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';

export const ReactIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 14,
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="32" height="32" rx="6" fill="#3178C6" />
    <path
      d="M8.2 12.5H18.8V15.2H14.8V25H11.7V15.2H8.2V12.5ZM23.4 20.3C22.2 20.3 21.2 20.7 20.5 21.4C19.8 22.1 19.4 23 19.3 24.1H16.8C16.9 22.3 17.6 20.9 18.8 19.8C20 18.7 21.5 18.2 23.4 18.2C25.2 18.2 26.6 18.7 27.7 19.7C28.8 20.7 29.3 22 29.3 23.6C29.3 24.6 29 25.4 28.5 26.2C28 26.9 27.2 27.6 26.1 28.1C25 28.6 23.7 29 22.2 29.3C21.4 29.5 20.7 29.6 20.2 29.9C19.7 30.1 19.4 30.5 19.4 31C19.4 31.5 19.7 31.9 20.2 32.2C20.7 32.5 21.5 32.6 22.5 32.6C23.6 32.6 24.5 32.4 25.3 31.9C26.1 31.4 26.6 30.7 26.7 29.8H29.2C29.1 31.4 28.3 32.7 27 33.7C25.7 34.7 24 35.2 22.1 35.2C20.3 35.2 18.8 34.8 17.6 33.9C16.4 33 15.8 31.7 15.8 30.1C15.8 29.1 16.1 28.3 16.6 27.6C17.1 26.9 17.9 26.3 18.9 25.8C19.9 25.3 21.2 24.9 22.7 24.6C23.6 24.4 24.3 24.2 24.8 23.9C25.3 23.6 25.6 23.2 25.6 22.6C25.6 22 25.3 21.5 24.8 21.1C24.3 20.6 23.6 20.3 22.6 20.3H23.4Z"
      fill="white"
      transform="scale(0.7) translate(2, -2)"
    />
  </svg>
);

export const CodeHeader: React.FC<{
  fileName?: string;
  icon?: React.ReactNode;
  code?: string;
  className?: string;
}> = ({
  fileName = 'developer.ts',
  icon = <ReactIcon size={14} />,
  code = '',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore copy error
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-3.5 py-2.5 border-b border-white/10 dark:border-white/10 border-zinc-200/80 bg-zinc-950/60 dark:bg-zinc-950/70 select-none ${className}`.trim()}
    >
      <div className="flex items-center gap-2">
        {/* Window action dots */}
        <div className="flex items-center gap-1.5 mr-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/90 border border-[#E0443E]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/90 border border-[#DEA123]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/90 border border-[#1AAB29]/40" />
        </div>

        {/* Tab badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.05] dark:bg-white/[0.05] border border-white/10 dark:border-white/10 text-xs font-mono text-zinc-300 dark:text-zinc-300">
          {icon}
          <span className="text-[11px] font-medium tracking-tight text-emerald-400 dark:text-emerald-400">
            {fileName}
          </span>
        </div>
      </div>

      {code && (
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors focus:outline-none"
          title="Copy code"
          aria-label="Copy developer profile code"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export const CodeBlock: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 border-zinc-200/80 bg-zinc-950/90 dark:bg-[#0c0c10]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all ${className}`.trim()}
    >
      {/* Subtle ambient violet/emerald inner glow */}
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      {children}
    </div>
  );
};

interface Token {
  type: 'keyword' | 'type' | 'key' | 'string' | 'punctuation' | 'whitespace' | 'other';
  text: string;
}

const tokenizeTypeScript = (code: string): Token[] => {
  const tokenRegex =
    /(\b(?:type|const|export|default)\b)|(\b(?:DeveloperProfile|string)\b)|(\b(?:name|education|role|frontend|backend|cloudDevOps|databases)\b)|("[^"\\]*(?:\\.[^"\\]*)*")|([{}[\],;:=])|(\s+)|([A-Za-z0-9_$]+)/g;

  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match[1]) {
      tokens.push({ type: 'keyword', text: match[1] });
    } else if (match[2]) {
      tokens.push({ type: 'type', text: match[2] });
    } else if (match[3]) {
      tokens.push({ type: 'key', text: match[3] });
    } else if (match[4]) {
      tokens.push({ type: 'string', text: match[4] });
    } else if (match[5]) {
      tokens.push({ type: 'punctuation', text: match[5] });
    } else if (match[6]) {
      tokens.push({ type: 'whitespace', text: match[6] });
    } else {
      tokens.push({ type: 'other', text: match[0] });
    }
  }

  return tokens;
};

const renderToken = (token: Token, index: number) => {
  switch (token.type) {
    case 'keyword':
      return (
        <span key={index} className="text-[#C084FC] dark:text-[#C084FC] font-semibold">
          {token.text}
        </span>
      );
    case 'type':
      return (
        <span key={index} className="text-[#38BDF8] dark:text-[#38BDF8]">
          {token.text}
        </span>
      );
    case 'key':
      return (
        <span key={index} className="text-[#34D399] dark:text-[#34D399]">
          {token.text}
        </span>
      );
    case 'string':
      return (
        <span key={index} className="text-[#FCD34D] dark:text-[#FCD34D]">
          {token.text}
        </span>
      );
    case 'punctuation':
      return (
        <span key={index} className="text-zinc-400 dark:text-zinc-400">
          {token.text}
        </span>
      );
    default:
      return (
        <span key={index} className="text-zinc-200 dark:text-zinc-200">
          {token.text}
        </span>
      );
  }
};

export interface CodeProps {
  children: string;
  writing?: boolean;
  cursor?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}

export const Code: React.FC<CodeProps> = ({
  children,
  writing = true,
  cursor = true,
  duration = 2.4,
  delay = 0.2,
  className = ''
}) => {
  const fullText = children;
  const [typedLength, setTypedLength] = useState(() => (writing ? 0 : fullText.length));
  const [isTyping, setIsTyping] = useState(writing);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!writing) {
      setTypedLength(fullText.length);
      setIsTyping(false);
      return;
    }

    if (hasAnimatedRef.current) {
      setTypedLength(fullText.length);
      setIsTyping(false);
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTypedLength(fullText.length);
      setIsTyping(false);
      hasAnimatedRef.current = true;
      return;
    }

    const totalChars = fullText.length;
    const typingDurationMs = duration * 1000;
    const intervalMs = Math.max(10, typingDurationMs / totalChars);

    let currentIndex = 0;
    let timer: NodeJS.Timeout | null = null;

    const startTimer = setTimeout(() => {
      timer = setInterval(() => {
        // Step in variable increments (1 to 3 characters) for natural typing rhythm
        const step = Math.floor(Math.random() * 2) + 1;
        currentIndex = Math.min(totalChars, currentIndex + step);
        setTypedLength(currentIndex);

        if (currentIndex >= totalChars) {
          if (timer) clearInterval(timer);
          setIsTyping(false);
          hasAnimatedRef.current = true;
        }
      }, intervalMs);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimer);
      if (timer) clearInterval(timer);
    };
  }, [fullText, writing, duration, delay]);

  const displayedSlice = useMemo(() => {
    return fullText.slice(0, typedLength);
  }, [fullText, typedLength]);

  const tokens = useMemo(() => {
    return tokenizeTypeScript(displayedSlice);
  }, [displayedSlice]);

  return (
    <div
      ref={containerRef}
      className={`p-4 sm:p-5 font-mono text-[11px] sm:text-[12px] leading-[1.65] overflow-x-auto text-left select-text ${className}`.trim()}
    >
      <pre className="m-0 font-mono whitespace-pre">
        <code>
          {tokens.map((token, i) => renderToken(token, i))}
          {cursor && (
            <span
              className={`inline-block w-1.5 h-3.5 sm:h-4 ml-0.5 bg-cyan-400 dark:bg-cyan-400 align-middle ${
                isTyping ? 'opacity-100' : 'animate-pulse opacity-70'
              }`}
              aria-hidden="true"
            />
          )}
        </code>
      </pre>
    </div>
  );
};

export const DEFAULT_DEVELOPER_CODE = `type DeveloperProfile = {
  name: string;
  education: string;
  role: string;
  frontend: string[];
  backend: string[];
  cloudDevOps: string[];
  databases: string[];
};

const developer: DeveloperProfile = {
  name: "Santhosh Kannan",
  education: "MCA",
  role: "Software Developer",
  frontend: ["React", "TypeScript", "Tailwind CSS"],
  backend: ["Python", "Django", "Django REST Framework"],
  cloudDevOps: ["AWS", "Linux", "Docker", "Git"],
  databases: ["PostgreSQL", "MySQL", "MongoDB"],
};

export default developer;`;

export interface CodeDemoProps {
  code?: string;
  fileName?: string;
  writing?: boolean;
  cursor?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}

export const CodeDemo: React.FC<CodeDemoProps> = ({
  code = DEFAULT_DEVELOPER_CODE,
  fileName = 'developer.ts',
  writing = true,
  cursor = true,
  duration = 2.2,
  delay = 0.3,
  className = ''
}) => {
  return (
    <CodeBlock className={className}>
      <CodeHeader fileName={fileName} code={code} />
      <Code
        writing={writing}
        cursor={cursor}
        duration={duration}
        delay={delay}
      >
        {code}
      </Code>
    </CodeBlock>
  );
};

export default CodeDemo;
