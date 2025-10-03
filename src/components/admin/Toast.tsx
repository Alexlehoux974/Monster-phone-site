'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const colors = {
    success: 'bg-green-500/10 border-green-500/50 text-green-500',
    error: 'bg-red-500/10 border-red-500/50 text-red-500',
    warning: 'bg-orange-500/10 border-orange-500/50 text-orange-500',
    info: 'bg-blue-500/10 border-blue-500/50 text-blue-500',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${colors[type]} backdrop-blur-sm shadow-lg animate-in slide-in-from-top-5 duration-300`}
    >
      <div>{icons[type]}</div>
      <p className="text-sm font-medium text-white">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
