import React from 'react';
import { useEditor } from '../context/EditorContext';
import { ToolbarButton as ToolbarButtonType } from '../types';
import { debugLog } from '../utils/logger';
import { ColorButton } from '../plugins/color';

interface ToolbarProps {
  buttons?: ToolbarButtonType[];
  className?: string;
  showSourceButton?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ buttons: customButtons, className = '', showSourceButton = false }) => {
  const { toolbarButtons, execCommand, viewSource, toggleViewSource, selectionUpdate, updateToolbar } = useEditor();
  
  // Force re-render when selection changes (selectionUpdate changes)
  // This ensures isActive functions are re-evaluated
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = selectionUpdate; // Use selectionUpdate to trigger re-render

  const buttons = customButtons || toolbarButtons;

  const handleButtonClick = (button: ToolbarButtonType) => {
    debugLog('TOOLBAR', `Button clicked: ${button.id}`, {
      title: button.title || button.label,
      command: button.command,
      hasCustomHandler: !!button.onClick
    });
    
    if (button.onClick) {
      button.onClick();
    } else if (button.command) {
      execCommand(button.command, button.value);
    }
  };

  const sortedButtons = [...buttons].sort((a, b) => {
    const orderA = a.order ?? 100;
    const orderB = b.order ?? 100;
    return orderA - orderB;
  });

  const groupedButtons: { [key: string]: ToolbarButtonType[] } = {};
  sortedButtons.forEach(button => {
    const group = button.group || 'default';
    if (!groupedButtons[group]) {
      groupedButtons[group] = [];
    }
    groupedButtons[group].push(button);
  });

  return (
    <div className={`reactEditor_toolbar ${className}`}>
      {Object.entries(groupedButtons).map(([group, groupButtons], index) => (
        <React.Fragment key={group}>
          {index > 0 && <div className="reactEditor_toolbarSeparator" />}
          {groupButtons.map(button => {
            const isActive = button.isActive ? button.isActive() : false;
            
            // Special handling for color buttons
            if (button.id === 'textColor' || button.id === 'backgroundColor') {
              return (
                <ColorButton
                  key={button.id}
                  id={button.id}
                  label={button.label || ''}
                  title={button.title || ''}
                  icon={button.icon}
                  type={button.id === 'textColor' ? 'text' : 'background'}
                  isActive={button.isActive || (() => false)}
                  onColorSelect={(color, type) => {
                    const selection = window.getSelection();
                    if (!selection || selection.rangeCount === 0) return;
                    
                    const range = selection.getRangeAt(0);
                    if (type === 'text') {
                      if (range.collapsed) {
                        // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
                        document.execCommand('foreColor', false, color);
                      } else {
                        const span = document.createElement('span');
                        span.style.color = color;
                        try {
                          range.surroundContents(span);
                        } catch (e) {
                          // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
                          document.execCommand('foreColor', false, color);
                        }
                      }
                    } else {
                      if (range.collapsed) {
                        if (color === 'transparent') {
                          // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
                          document.execCommand('backColor', false, 'transparent');
                        } else {
                          // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
                          document.execCommand('backColor', false, color);
                        }
                      } else {
                        const span = document.createElement('span');
                        span.style.backgroundColor = color === 'transparent' ? 'transparent' : color;
                        try {
                          range.surroundContents(span);
                        } catch (e) {
                          if (color === 'transparent') {
                            // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
                            document.execCommand('backColor', false, 'transparent');
                          } else {
                            // @ts-ignore - document.execCommand is deprecated but still needed for contentEditable
                            document.execCommand('backColor', false, color);
                          }
                        }
                      }
                    }
                    // Trigger toolbar update
                    updateToolbar();
                  }}
                />
              );
            }
            
            return (
              <button
                key={button.id}
                className={`reactEditor_toolbarButton ${isActive ? 'reactEditor_active' : ''}`}
                onClick={() => handleButtonClick(button)}
                title={button.title || button.label}
                disabled={button.disabled}
                type="button"
              >
                {button.icon || button.label}
              </button>
            );
          })}
        </React.Fragment>
      ))}
      {showSourceButton && (
        <>
          <div className="reactEditor_toolbarSeparator" />
          <button
            className={`reactEditor_toolbarButton ${viewSource ? 'reactEditor_active' : ''}`}
            onClick={toggleViewSource}
            title={viewSource ? 'Visual Editor' : 'View Source'}
            type="button"
          >
            {viewSource ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 4h14v8H1V4zm1 1v6h12V5H2z"/>
                <path d="M4 7h8v1H4V7zm0 2h6v1H4V9z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
              </svg>
            )}
          </button>
        </>
      )}
    </div>
  );
};

