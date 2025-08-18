'use client';
import { useState, useEffect } from 'react';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
}

export default function CommandPalette({ isOpen, onClose, items }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredItems, setFilteredItems] = useState<CommandItem[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
      return;
    }

    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
    setSelectedIndex(0);
  }, [query, items, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredItems.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredItems.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            filteredItems[selectedIndex].action();
            onClose();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-usgc-panel border border-usgc-line w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="border-b border-usgc-line px-4 py-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-usgc-muted font-mono">/</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands..."
              className="flex-1 bg-transparent border-none outline-none text-sm font-mono"
              autoFocus
            />
            <span className="text-xs text-usgc-muted">
              {filteredItems.length} results
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-auto">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-usgc-muted">
              No commands found
            </div>
          ) : (
            <div>
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-usgc-line transition-colors ${
                    index === selectedIndex ? 'bg-usgc-line' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-xs text-usgc-muted mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-usgc-muted font-mono">
                      {item.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-usgc-line px-4 py-2 flex items-center justify-between text-xs text-usgc-muted">
          <div className="flex items-center space-x-4">
            <span>↑↓ Navigate</span>
            <span>Enter Select</span>
            <span>Esc Close</span>
          </div>
          <span>Command Palette</span>
        </div>
      </div>
    </div>
  );
}
