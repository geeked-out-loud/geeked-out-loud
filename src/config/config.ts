// Configuration file for routes and terminal commands

// Valid routes in the application
export const VALID_ROUTES = ['/'];

// Terminal command definitions
export const TERMINAL_COMMANDS = {
  // Navigation commands
  cd: {
    description: 'Navigate to a path',
    usage: 'cd <path>',
    action: 'navigate',
  },
  ls: {
    description: 'List available pages/routes',
    usage: 'ls',
    action: 'tui',
  },
  
  // Info commands
  whoami: {
    description: 'Show your name/bio',
    usage: 'whoami',
    action: 'tui',
  },
//  skills: {
//    description: 'Show tech stack',
//    usage: 'skills',
//    action: 'tui',
//    hidden: true,
//  },
  contact: {
    description: 'Show contact info',
    usage: 'contact',
    action: 'tui',
  },
  
  // External links
//  resume: {
//    description: 'Open/download resume',
//    usage: 'resume',
//    action: 'navigate',
//    hidden: true,
//  },
  github: {
    description: 'Open GitHub profile in new tab',
    usage: 'github',
    action: 'navigate',
  },
  linkedin: {
    description: 'Open LinkedIn in new tab',
    usage: 'linkedin',
    action: 'navigate',
  },
  
  // Utility commands
  help: {
    description: 'Show all available commands',
    usage: 'help',
    action: 'tui',
  },
  echo: {
    description: 'Display text',
    usage: 'echo <text>',
    action: 'tui',
  },
  date: {
    description: 'Show current date',
    usage: 'date',
    action: 'tui',
  },
  time: {
    description: 'Show current time',
    usage: 'time',
    action: 'tui',
  },
  exit: {
    description: 'Close terminal mode',
    usage: 'exit',
    action: 'tui',
  },
  clear: {
    description: 'Clear terminal',
    usage: 'clear',
    action: 'tui',
  },
  
  // Fun commands
//  sudo: {
//    description: 'yo yo chill',
//    usage: 'sudo <command>',
//    action: 'tui',
//   hidden: true,
//  },
//  matrix: {
//    description: 'Fun matrix animation',
//    usage: 'matrix',
//    action: 'tui',
//    hidden: true,
//  },
  
  // Terminal UI control
  open: {
    description: 'Open fullscreen terminal',
    usage: 'open',
    action: 'tui',
  },
};

// Personal info for terminal outputs
export const PERSONAL_INFO = {
  name: 'Shubhan',
  bio: 'Full Stack Developer',
  github: 'https://github.com/geeked-out-loud',
  linkedin: 'https://www.linkedin.com/in/geeked-out-loud04',
  resume: '/resume.pdf',
  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
  email: 'shhuuubh@gmail.com',
};
