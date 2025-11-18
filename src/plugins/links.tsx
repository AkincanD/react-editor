import React, { useState } from 'react';
import { EditorPlugin } from '../types';
import { Modal } from '../components/Modal';
import { debugLog } from '../utils/logger';

// Link modal component
const LinkModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, text: string) => void;
}> = ({ isOpen, onClose, onInsert }) => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleInsert = () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    debugLog('LINK', 'Inserting link', { url, text });

    onInsert(url, text);
    
    // Reset form
    setUrl('');
    setText('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setUrl('');
    setText('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Insert Link">
      <div className="reactEditor_formGroup">
        <label className="reactEditor_label" htmlFor="linkUrl">
          URL
        </label>
        <input
          id="linkUrl"
          type="url"
          className="reactEditor_input"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
          }}
          autoFocus
        />
        {error && (
          <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>
            {error}
          </div>
        )}
      </div>

      <div className="reactEditor_formGroup">
        <label className="reactEditor_label" htmlFor="linkText">
          Link Text (optional)
        </label>
        <input
          id="linkText"
          type="text"
          className="reactEditor_input"
          placeholder="Leave empty to use URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="reactEditor_modalFooter">
        <button
          type="button"
          className="reactEditor_button reactEditor_buttonSecondary"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="reactEditor_button reactEditor_buttonPrimary"
          onClick={handleInsert}
        >
          Insert Link
        </button>
      </div>
    </Modal>
  );
};

// Link plugin state
const linkModalState: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  insertLink: ((url: string, text: string) => void) | null;
} = {
  isOpen: false,
  setIsOpen: () => {},
  insertLink: null,
};

export const linksPlugin: EditorPlugin = {
  name: 'links',
  version: '1.0.0',
  
  onLoad: (context) => {
    linkModalState.insertLink = (url: string, text: string) => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        // Text is selected - wrap it in a link
        document.execCommand('createLink', false, url);
      } else {
        // No selection - insert new link
        const linkText = text || url;
        const html = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
        context.insertContent(html);
      }
    };
  },

  toolbarButtons: [
    {
      id: 'createLink',
      label: 'Link',
      title: 'Insert Link',
      group: 'links',
      order: 1,
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        return element?.tagName === 'A' || element?.closest('a') !== null;
      },
      onClick: () => {
        linkModalState.setIsOpen(true);
      }
    },
    {
      id: 'unlink',
      label: 'Unlink',
      title: 'Remove Link',
      command: 'unlink',
      group: 'links',
      order: 2,
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        return element?.tagName === 'A' || element?.closest('a') !== null;
      }
    }
  ],
  commands: [
    {
      name: 'createLink',
      execute: (url?: unknown) => document.execCommand('createLink', false, url as string),
      canExecute: () => true
    },
    {
      name: 'unlink',
      execute: () => document.execCommand('unlink', false),
      canExecute: () => true
    }
  ]
};

// Link modal component wrapper for React integration
export const LinkModalWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Update global state
  linkModalState.isOpen = isOpen;
  linkModalState.setIsOpen = setIsOpen;

  const handleInsert = (url: string, text: string) => {
    if (linkModalState.insertLink) {
      linkModalState.insertLink(url, text);
    }
  };

  return (
    <LinkModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onInsert={handleInsert}
    />
  );
};

