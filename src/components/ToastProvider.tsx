'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import MissingPage from '@/components/MissingPage';

interface ToastContextType {
  show404: (path: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ show: boolean; path: string }>({
    show: false,
    path: '',
  });

  const show404 = (path: string) => {
    setToast({ show: true, path });
  };

  return (
    <ToastContext.Provider value={{ show404 }}>
      {children}
      <MissingPage
        show={toast.show}
        path={toast.path}
        onCloseAction={() => setToast({ show: false, path: '' })}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
