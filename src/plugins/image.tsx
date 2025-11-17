import React, { useState } from 'react';
import { EditorPlugin } from '../types';
import { Modal } from '../components/Modal';
import { debugLog } from '../utils/logger';

// Image modal component
const ImageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInsert: (html: string) => void;
}> = ({ isOpen, onClose, onInsert }) => {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');

  const handleInsert = () => {
    if (!url.trim()) {
      setError('Please enter an image URL');
      return;
    }

    // Basic URL validation
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
    if (!urlPattern.test(url)) {
      setError('Invalid image URL. Please enter a valid URL ending with .jpg, .png, .gif, .webp, or .svg');
      return;
    }

    debugLog('IMAGE', 'Inserting image', { url, alt, width, height });

    let html: string;
    const altText = alt || 'Image';
    
    if (showAdvanced && (width || height)) {
      // Custom dimensions
      const styleAttr = [];
      if (width) styleAttr.push(`width: ${width}`);
      if (height) styleAttr.push(`height: ${height}`);
      const style = styleAttr.length > 0 ? ` style="${styleAttr.join('; ')}"` : '';
      html = `<img src="${url}" alt="${altText}"${style} />`;
    } else {
      // Responsive (default)
      html = `<img src="${url}" alt="${altText}" style="max-width: 100%; height: auto;" />`;
    }

    onInsert(html);
    
    // Reset form
    setUrl('');
    setAlt('');
    setWidth('');
    setHeight('');
    setShowAdvanced(false);
    setError('');
    onClose();
  };

  const handleClose = () => {
    setUrl('');
    setAlt('');
    setWidth('');
    setHeight('');
    setShowAdvanced(false);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Insert Image">
      <div className="reactEditor_formGroup">
        <label className="reactEditor_label" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          id="imageUrl"
          type="url"
          className="reactEditor_input"
          placeholder="https://example.com/image.jpg"
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
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
          Supports .jpg, .png, .gif, .webp, and .svg formats
        </div>
      </div>

      <div className="reactEditor_formGroup">
        <label className="reactEditor_label" htmlFor="imageAlt">
          Alt Text (optional)
        </label>
        <input
          id="imageAlt"
          type="text"
          className="reactEditor_input"
          placeholder="Description of the image"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
          Helps with accessibility and SEO
        </div>
      </div>

      <div className="reactEditor_advancedToggle">
        <label className="reactEditor_checkbox">
          <input
            type="checkbox"
            className="reactEditor_checkboxInput"
            checked={showAdvanced}
            onChange={(e) => setShowAdvanced(e.target.checked)}
          />
          <span className="reactEditor_checkboxLabel">Advanced Options</span>
        </label>

        {showAdvanced && (
          <div className="reactEditor_advancedContent">
            <div className="reactEditor_inputRow">
              <div className="reactEditor_formGroup">
                <label className="reactEditor_label" htmlFor="imageWidth">
                  Width
                </label>
                <input
                  id="imageWidth"
                  type="text"
                  className="reactEditor_input"
                  placeholder="e.g., 100%, 640px"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              <div className="reactEditor_formGroup">
                <label className="reactEditor_label" htmlFor="imageHeight">
                  Height
                </label>
                <input
                  id="imageHeight"
                  type="text"
                  className="reactEditor_input"
                  placeholder="e.g., auto, 480px"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              Leave empty for responsive image (max-width: 100%)
            </div>
          </div>
        )}
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
          Insert Image
        </button>
      </div>
    </Modal>
  );
};

// Image plugin state
const imageModalState: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  insertContent: ((html: string) => void) | null;
} = {
  isOpen: false,
  setIsOpen: () => {},
  insertContent: null,
};

export const imagePlugin: EditorPlugin = {
  name: 'image',
  version: '1.0.0',
  
  onLoad: (context) => {
    imageModalState.insertContent = (html: string) => {
      const editor = context.editor;
      if (!editor) return;
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        // Replace selection with image
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const fragment = range.createContextualFragment(html);
        range.insertNode(fragment);
        
        // Move cursor after inserted content
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // Insert at end of content
        const currentContent = context.getContent();
        context.setContent(currentContent + html);
      }
      
      debugLog('IMAGE', 'Image inserted successfully');
    };
  },

  toolbarButtons: [
    {
      id: 'insertImage',
      label: 'Image',
      title: 'Insert Image',
      group: 'media',
      order: 2,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      onClick: () => {
        imageModalState.setIsOpen(true);
      }
    }
  ]
};

// Image modal component wrapper for React integration
export const ImageModalWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Update global state
  imageModalState.isOpen = isOpen;
  imageModalState.setIsOpen = setIsOpen;

  const handleInsert = (html: string) => {
    if (imageModalState.insertContent) {
      imageModalState.insertContent(html);
    }
  };

  return (
    <ImageModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onInsert={handleInsert}
    />
  );
};

