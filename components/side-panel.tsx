'use client';
import { useEffect } from 'react';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: number;
}

export default function SidePanel({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width = 400 
}: SidePanelProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className="fixed right-0 top-0 h-full bg-usgc-panel border-l border-usgc-line z-50 flex flex-col"
        style={{ width }}
      >
        {/* Header */}
        <div className="border-b border-usgc-line px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-usgc-muted hover:text-usgc-text focus-ring p-1"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>

        {/* Footer */}
        <div className="border-t border-usgc-line px-4 py-2 text-xs text-usgc-muted">
          Press Esc to close
        </div>
      </div>
    </>
  );
}

// Helper component for section headers
export function PanelSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-usgc-line">
      <div className="px-4 py-2 bg-usgc-line/20">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// Helper component for key-value pairs
export function PanelField({ label, value, type = 'text' }: { 
  label: string; 
  value: string | number; 
  type?: 'text' | 'number' | 'date' | 'status';
}) {
  const formatValue = () => {
    switch (type) {
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'status':
        return (
          <span className={`inline-block px-1 py-0.5 text-xs font-mono ${
            value === 'active' || value === 'confirmed' ? 'bg-usgc-success/20 text-usgc-success' :
            value === 'pending' ? 'bg-usgc-warning/20 text-usgc-warning' :
            'bg-usgc-error/20 text-usgc-error'
          }`}>
            {String(value).toUpperCase()}
          </span>
        );
      default:
        return value;
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-usgc-muted">{label}</span>
      <span className={`text-sm font-mono ${
        type === 'number' ? 'text-right' : ''
      }`}>
        {formatValue()}
      </span>
    </div>
  );
}
