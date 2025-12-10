'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from './ToastProvider';
import { VALID_ROUTES, TERMINAL_COMMANDS, PERSONAL_INFO } from '@/config/config';

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
}

export default function Terminal() {
  const pathname = usePathname();
  const router = useRouter();
  const { show404 } = useToast();
  const [isInputMode, setIsInputMode] = useState(false);
  const [command, setCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showTui, setShowTui] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  //smooth fade-out animation
  const closeTui = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setShowTui(false);
      setIsClosing(false);
      setIsOpening(false);
    }, 350);
  }, []);

  //fade-in animation when TUI opens
  useEffect(() => {
    if (showTui && isOpening) {
      const timer = setTimeout(() => {
        setIsOpening(false);
      }, 10); // delay to trigger the css
      return () => clearTimeout(timer);
    }
  }, [showTui, isOpening]);

  // Parse the current path into clickable breadcrumb segments
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => ({
      name: segment,
      path: '/' + array.slice(0, index + 1).join('/'),
    }));

  useEffect(() => {
    if (isInputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputMode]);

  // keyboard shortcuts in input mode
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(command.trim());
      setCommand('');
      setIsInputMode(false);
    } else if (e.key === 'Escape') {
      setCommand('');
      setIsInputMode(false);
      setShowTui(false);
    }
  };

  // escape fullscreen terminal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showTui && !isClosing) {
        closeTui();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showTui, isClosing, closeTui]);

  // scroll to bottom when history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  useEffect(() => {
    if (showTui && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTui]);

  // Check if a route exists
  const isValidRoute = (path: string): boolean => {
    return VALID_ROUTES.includes(path);
  };

  // Execute terminal commands
  const executeCommand = (cmd: string) => {
    if (!cmd) return;

    const [action, ...args] = cmd.split(' ');
    const commandKey = action.toLowerCase();

    // Check if command exists in TERMINAL_COMMANDS
    if (TERMINAL_COMMANDS[commandKey as keyof typeof TERMINAL_COMMANDS]) {
      const commandConfig = TERMINAL_COMMANDS[commandKey as keyof typeof TERMINAL_COMMANDS];
      
      if (commandConfig.action === 'navigate') {
        handleNavigateCommand(commandKey, args);
      } else if (commandConfig.action === 'tui') {
        handleTuiCommand(commandKey, args);
      }
    } else {
      // Unknown command - show error in terminal, not 404 toast
      handleTuiCommand('error', [commandKey]);
    }
  };

  // Navigate to different routes or external links
  const handleNavigateCommand = (command: string, args: string[]) => {
    switch (command) {
      case 'cd':
        if (args[0]) {
          const targetPath = args[0].startsWith('/') ? args[0] : `/${args[0]}`;
          if (isValidRoute(targetPath)) {
            router.push(targetPath);
          } else {
            show404(targetPath);
          }
        } else {
          // cd without arguments - just show current location
          router.push('/');
        }
        break;
      case 'github':
        window.open(PERSONAL_INFO.github, '_blank');
        break;
      case 'linkedin':
        window.open(PERSONAL_INFO.linkedin, '_blank');
        break;
      case 'resume':
        window.open(PERSONAL_INFO.resume, '_blank');
        break;
    }
  };

  // Commands that display output in the fullscreen terminal
  const handleTuiCommand = (command: string, args: string[]) => {
    let output = '';

    switch (command) {
      case 'whoami':
        output = `${PERSONAL_INFO.name}\n${PERSONAL_INFO.bio}`;
        break;
      case 'help':
        output = 'Available commands:\n';
        Object.entries(TERMINAL_COMMANDS).forEach(([cmd, config]) => {
          // Skip hidden commands
          if (!(config as any).hidden) {
            output += `  ${config.usage.padEnd(25)} ${config.description}\n`;
          }
        });
        output += '\nTip: Press ESC or type "exit" to close this terminal.';
        break;
      case 'ls':
        output = `Available routes:\n${VALID_ROUTES.join('\n')}`;
        break;
      case 'skills':
        output = `Tech Stack:\n${PERSONAL_INFO.skills.map(s => `  • ${s}`).join('\n')}`;
        break;
      case 'contact':
        output = `Contact Information:\nEmail: ${PERSONAL_INFO.email}\nGitHub: ${PERSONAL_INFO.github}\nLinkedIn: ${PERSONAL_INFO.linkedin}`;
        break;
      case 'date':
        output = new Date().toLocaleDateString();
        break;
      case 'time':
        output = new Date().toLocaleTimeString();
        break;
      case 'echo':
        output = args.length > 0 ? args.join(' ') : '';
        break;
      case 'clear':
        setCommandHistory([]);
        return;
      case 'exit':
        closeTui();
        return;
      case 'sudo':
        output = 'yo yo chill! 😎\n\nNice try, but you already have all the permissions you need here.\nNo need to go full hackerman mode.';
        break;
      case 'matrix':
        output = '🟢 Entering the Matrix...\n\n01010111 01100101 01101100 01100011 01101111 01101101 01100101\n\nJust kidding! No red pill needed here. 💊\nBut hey, you found an easter egg!';
        break;
      case 'open':
        // Just open the terminal with no output
        output = '';
        break;
      case 'error':
        // Custom error handling for unknown commands
        const unknownCmd = args[0] || 'unknown';
        output = `bash: ${unknownCmd}: command not found\n\nType 'help' to see available commands.`;
        break;
      default:
        output = `Command "${command}" not implemented yet`
    }

    setCommandHistory(prev => [...prev, { 
      command: `${command} ${args.join(' ')}`.trim(), 
      output, 
      timestamp: new Date() 
    }]);
    
    // Show the fullscreen terminal with a smooth fade-in
    setIsClosing(false); // Reset closing state just in case
    setShowTui(true);
    setIsOpening(true);
  };

  // Click anywhere on the breadcrumb to start typing commands
  const handleTerminalClick = () => {
    setIsInputMode(true);
  };

  return (
    <>
      <div 
        className="font-mono text-md text-zinc-600 dark:text-zinc-400 cursor-text"
        onClick={handleTerminalClick}
      >
        {!isInputMode ? (
          <>
            <Link
              href="/"
              className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              ~
            </Link>

            {segments.map((segment) => (
              <span key={segment.path}>
                <span>/</span>
                <Link
                  href={segment.path}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  {segment.name}
                </Link>
              </span>
            ))}
            <span>/</span>
          </>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-green-600 dark:text-green-400">~{pathname === '/' ? '' : pathname}</span>
            <span className="text-zinc-600 dark:text-zinc-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (!command) setIsInputMode(false);
              }}
              className="bg-transparent outline-none border-none text-zinc-900 dark:text-zinc-100 flex-1 min-w-[200px]"
              placeholder=" "
            />
          </div>
        )}
      </div>

      {/* Fullscreen Interactive Terminal with Glass Effect */}
      {showTui && (
        <div 
          className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-md transition-opacity duration-350 ease-in-out ${
            isClosing ? 'opacity-0' : isOpening ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="h-full w-full flex items-center justify-center p-8">
            {/* Glass Terminal Container */}
            <div className="w-full max-w-5xl h-full max-h-[85vh] bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-lg shadow-2xl p-6 flex flex-col overflow-hidden">
              
              {/* Terminal Content */}
              <div className="flex-1 overflow-y-scroll space-y-3 font-mono text-sm">
                {/* Command History */}
                {commandHistory.map((entry, index) => (
                  <div key={index} className="space-y-1.5">
                    {/* Command Input Line */}
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 dark:text-green-400 shrink-0">~{pathname === '/' ? '' : pathname}</span>
                      <span className="text-zinc-400 dark:text-zinc-500 shrink-0">$</span>
                      <span className="text-zinc-800 dark:text-zinc-200">{entry.command}</span>
                    </div>
                    {/* Command Output */}
                    {entry.output && (
                      <div className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap pl-4 leading-relaxed">
                        {entry.output}
                      </div>
                    )}
                  </div>
                ))}

                {/* Current Input Line */}
                <div className="flex items-center gap-2">
                  <span className="text-green-500 dark:text-green-400 shrink-0">~{pathname === '/' ? '' : pathname}</span>
                  <span className="text-zinc-400 dark:text-zinc-500 shrink-0">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        executeCommand(currentCommand.trim());
                        setCurrentCommand('');
                      } else if (e.key === 'Escape') {
                        closeTui();
                      }
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-500"
                    placeholder="Type a command..."
                    autoFocus
                  />
                </div>

                {/* autoscroll anchor */}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
