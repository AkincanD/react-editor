import React, { useEffect, useRef } from 'react';
import { useEditor } from '../context/EditorContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { theme } = useEditor();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="reactEditor_modalOverlay">
      <div 
        ref={modalRef} 
        className={`reactEditor_modal ${theme.mode === 'dark' ? 'reactEditor_dark' : ''}`}
      >
        <div className="reactEditor_modalHeader">
          <h3 className="reactEditor_modalTitle">{title}</h3>
          <button
            className="reactEditor_modalCloseButton"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="reactEditor_modalBody">
          {children}
        </div>
      </div>
    </div>
  );
};

