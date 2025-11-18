import React, { useState, useEffect, useRef } from 'react';
import { EditorPlugin } from '../types';
import { useEditor } from '../context/EditorContext';

// Color palette - matching the visual design
const colorPalette = [
  // Row 1: Light colors
  '#E8F5E9', '#FFF9C4', '#FFE0B2', '#F3E5F5', '#E1F5FE', '#F5F5F5',
  // Row 2: Standard colors
  '#4CAF50', '#FFEB3B', '#FF5722', '#9C27B0', '#2196F3', '#9E9E9E',
  // Row 3: Dark colors
  '#1B5E20', '#F57F17', '#B71C1C', '#4A148C', '#0D47A1', '#212121',
  // Row 4: Grays and black
  '#ECEFF1', '#BDBDBD', '#757575', '#424242', '#212121', '#000000'
];

// Color dropdown component
const ColorDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
  type: 'text' | 'background';
  buttonRef: React.RefObject<HTMLButtonElement>;
}> = ({ isOpen, onClose, onSelectColor, type, buttonRef }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useEditor();
  const [showMoreColors, setShowMoreColors] = useState(false);
  const [customColor, setCustomColor] = useState('#000000');

  // Position dropdown below button
  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdown = dropdownRef.current;
      
      dropdown.style.position = 'fixed';
      dropdown.style.top = `${buttonRect.bottom + 4}px`;
      dropdown.style.left = `${buttonRect.left}px`;
      dropdown.style.zIndex = '1000';
    }
  }, [isOpen, buttonRef]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, buttonRef]);

  if (!isOpen) return null;

  const handleColorClick = (color: string) => {
    onSelectColor(color);
    onClose();
  };

  const handleMoreColors = () => {
    setShowMoreColors(true);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    onSelectColor(color);
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className={`reactEditor_colorDropdown ${theme.mode === 'dark' ? 'reactEditor_dark' : ''}`}
    >
      {!showMoreColors ? (
        <>
          <div className="reactEditor_colorPalette">
            {colorPalette.map((color, index) => (
              <button
                key={index}
                type="button"
                className="reactEditor_colorSwatch"
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
                title={color}
              />
            ))}
          </div>
          <div className="reactEditor_colorDropdownFooter">
            <button
              type="button"
              className="reactEditor_colorMoreButton"
              onClick={handleMoreColors}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 4v8M4 8h8" />
              </svg>
              More Colors
            </button>
            {type === 'background' && (
              <button
                type="button"
                className="reactEditor_colorNoColorButton"
                onClick={() => handleColorClick('transparent')}
                title="No Color"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="reactEditor_colorCustom">
          <div className="reactEditor_colorCustomHeader">
            <button
              type="button"
              className="reactEditor_colorBackButton"
              onClick={() => setShowMoreColors(false)}
            >
              ← Back
            </button>
            <span className="reactEditor_colorCustomTitle">Custom Color</span>
          </div>
          <div className="reactEditor_colorCustomBody">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="reactEditor_colorInput"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => {
                const value = e.target.value;
                if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                  setCustomColor(value);
                  if (value.length === 7) {
                    onSelectColor(value);
                    onClose();
                  }
                }
              }}
              placeholder="#000000"
              className="reactEditor_colorHexInput"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Color button with dropdown
export const ColorButton: React.FC<{
  id: string;
  label: string;
  title: string;
  icon: React.ReactNode;
  type: 'text' | 'background';
  isActive: () => boolean;
  onColorSelect: (color: string, type: 'text' | 'background') => void;
}> = ({ title, icon, type, isActive, onColorSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleColorSelect = (color: string) => {
    onColorSelect(color, type);
    setIsOpen(false);
  };

  return (
    <div className="reactEditor_colorButtonWrapper" style={{ position: 'relative' }}>
      <button
        ref={buttonRef}
        className={`reactEditor_toolbarButton ${isActive() ? 'reactEditor_active' : ''}`}
        onClick={handleClick}
        title={title}
        type="button"
      >
        {icon}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '4px' }}>
          <path d="M3 4.5l3 3 3-3" />
        </svg>
      </button>
      <ColorDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectColor={handleColorSelect}
        type={type}
        buttonRef={buttonRef}
      />
    </div>
  );
};

// Color plugin state
const colorPluginState: {
  applyTextColor: ((color: string) => void) | null;
  applyBgColor: ((color: string) => void) | null;
} = {
  applyTextColor: null,
  applyBgColor: null
};

export const colorPlugin: EditorPlugin = {
  name: 'color',
  version: '1.0.0',
  
  onLoad: (context) => {
    colorPluginState.applyTextColor = (color: string) => {
      const editor = context.editor;
      if (!editor) return;
      
      const editorElement = editor.getEditorElement();
      if (!editorElement) return;
      
      editorElement.focus();
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      
      const range = selection.getRangeAt(0);
      if (range.collapsed) {
        // No selection, apply to future text
        // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
        document.execCommand('foreColor', false, color);
      } else {
        // Apply color to selected text using modern API
        const span = document.createElement('span');
        span.style.color = color;
        try {
          range.surroundContents(span);
        } catch (e) {
          // If surroundContents fails, use execCommand as fallback
          // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
          document.execCommand('foreColor', false, color);
        }
      }
    };

    colorPluginState.applyBgColor = (color: string) => {
      const editor = context.editor;
      if (!editor) return;
      
      const editorElement = editor.getEditorElement();
      if (!editorElement) return;
      
      editorElement.focus();
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      
      const range = selection.getRangeAt(0);
      if (range.collapsed) {
        // No selection, apply to future text
        if (color === 'transparent') {
          // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
          document.execCommand('backColor', false, 'transparent');
        } else {
          // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
          document.execCommand('backColor', false, color);
        }
      } else {
        // Apply background color to selected text using modern API
        const span = document.createElement('span');
        span.style.backgroundColor = color === 'transparent' ? 'transparent' : color;
        try {
          range.surroundContents(span);
        } catch (e) {
          // If surroundContents fails, use execCommand as fallback
          if (color === 'transparent') {
            // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
            document.execCommand('backColor', false, 'transparent');
          } else {
            // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
            document.execCommand('backColor', false, color);
          }
        }
      }
    };
  },

  toolbarButtons: [
    {
      id: 'textColor',
      label: 'A',
      title: 'Text Color',
      group: 'formatting',
      order: 10,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 2h8M4 14h8M8 2v12" />
        </svg>
      ),
      isActive: (): boolean => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        if (!element) return false;
        const computedStyle = window.getComputedStyle(element);
        const color = computedStyle.color;
        return !!(color && color !== 'rgb(0, 0, 0)' && color !== '#000000' && color !== 'black');
      },
      onClick: () => {
        // Handled by ColorButton component
      }
    },
    {
      id: 'backgroundColor',
      label: '⬛',
      title: 'Background Color',
      group: 'formatting',
      order: 11,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="12" height="8" rx="1" />
          <path d="M6 8h4" />
        </svg>
      ),
      isActive: (): boolean => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        if (!element) return false;
        const computedStyle = window.getComputedStyle(element);
        const bgColor = computedStyle.backgroundColor;
        return !!(bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && 
               bgColor !== 'rgb(255, 255, 255)' && bgColor !== '#FFFFFF' && bgColor !== 'white');
      },
      onClick: () => {
        // Handled by ColorButton component
      }
    }
  ],

  commands: [
    {
      name: 'foreColor',
      execute: (color?: unknown) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
          // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
          document.execCommand('foreColor', false, color as string);
          return;
        }
        const range = selection.getRangeAt(0);
        if (range.collapsed) {
          // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
          document.execCommand('foreColor', false, color as string);
        } else {
          const span = document.createElement('span');
          span.style.color = color as string;
          try {
            range.surroundContents(span);
          } catch (e) {
            // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
            document.execCommand('foreColor', false, color as string);
          }
        }
      },
      canExecute: () => true
    },
    {
      name: 'backColor',
      execute: (color?: unknown) => {
        const selection = window.getSelection();
        const colorValue = color as string;
        if (!selection || selection.rangeCount === 0) {
          if (colorValue === 'transparent') {
            // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
            document.execCommand('backColor', false, 'transparent');
          } else {
            // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
            document.execCommand('backColor', false, colorValue);
          }
          return;
        }
        const range = selection.getRangeAt(0);
        if (range.collapsed) {
          if (colorValue === 'transparent') {
            // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
            document.execCommand('backColor', false, 'transparent');
          } else {
            // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
            document.execCommand('backColor', false, colorValue);
          }
        } else {
          const span = document.createElement('span');
          span.style.backgroundColor = colorValue === 'transparent' ? 'transparent' : colorValue;
          try {
            range.surroundContents(span);
          } catch (e) {
            if (colorValue === 'transparent') {
              // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
              document.execCommand('backColor', false, 'transparent');
            } else {
              // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
              document.execCommand('backColor', false, colorValue);
            }
          }
        }
      },
      canExecute: () => true
    }
  ]
};

