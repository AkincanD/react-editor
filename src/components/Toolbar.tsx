import React from 'react';
import { useEditor } from '../context/EditorContext';
import { ToolbarButton as ToolbarButtonType } from '../types';

interface ToolbarProps {
  buttons?: ToolbarButtonType[];
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({ buttons: customButtons, className = '' }) => {
  const { toolbarButtons, execCommand } = useEditor();

  const buttons = customButtons || toolbarButtons;

  const handleButtonClick = (button: ToolbarButtonType) => {
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
    <div className={`react-editor-toolbar ${className}`}>
      {Object.entries(groupedButtons).map(([group, groupButtons], index) => (
        <React.Fragment key={group}>
          {index > 0 && <div className="react-editor-toolbar-separator" />}
          {groupButtons.map(button => {
            const isActive = button.isActive ? button.isActive() : false;
            return (
              <button
                key={button.id}
                className={`react-editor-toolbar-button ${isActive ? 'active' : ''}`}
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
    </div>
  );
};

