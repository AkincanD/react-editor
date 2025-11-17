import React from 'react';
import { useEditor } from '../context/EditorContext';
import { ToolbarButton as ToolbarButtonType } from '../types';
import { debugLog } from '../utils/logger';

interface ToolbarProps {
  buttons?: ToolbarButtonType[];
  className?: string;
  showSourceButton?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ buttons: customButtons, className = '', showSourceButton = false }) => {
  const { toolbarButtons, execCommand, viewSource, toggleViewSource } = useEditor();

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

