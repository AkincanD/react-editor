import React, { useState } from 'react';
import { EditorPlugin } from '../types';
import { Modal } from '../components/Modal';
import { debugLog } from '../utils/logger';

// Video URL parser
const parseVideoUrl = (url: string): { provider: string; videoId: string } | null => {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return { provider: 'youtube', videoId: match[1] };
    }
  }

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      return { provider: 'vimeo', videoId: match[1] };
    }
  }

  return null;
};

// Generate embed URL
const getEmbedUrl = (provider: string, videoId: string): string => {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (provider === 'vimeo') {
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return '';
};

// Video modal component
const VideoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInsert: (html: string) => void;
}> = ({ isOpen, onClose, onInsert }) => {
  const [url, setUrl] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');

  const handleInsert = () => {
    if (!url.trim()) {
      setError('Please enter a video URL');
      return;
    }

    const videoInfo = parseVideoUrl(url);
    if (!videoInfo) {
      setError('Invalid video URL. Please enter a valid YouTube or Vimeo URL.');
      return;
    }

    debugLog('VIDEO', `Inserting ${videoInfo.provider} video`, { videoId: videoInfo.videoId });

    const embedUrl = getEmbedUrl(videoInfo.provider, videoInfo.videoId);

    let html: string;

    if (showAdvanced && width && height) {
      // Custom dimensions
      html = `
        <div class="reactEditor_videoWrapper" style="width: ${width}; padding-bottom: 0; height: ${height};">
          <iframe
            src="${embedUrl}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
    } else {
      // Responsive (default)
      html = `
        <div class="reactEditor_videoWrapper">
          <iframe
            src="${embedUrl}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
    }

    onInsert(html);
    
    // Reset form
    setUrl('');
    setWidth('');
    setHeight('');
    setShowAdvanced(false);
    setError('');
    onClose();
  };

  const handleClose = () => {
    setUrl('');
    setWidth('');
    setHeight('');
    setShowAdvanced(false);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Insert Video">
      <div className="reactEditor_formGroup">
        <label className="reactEditor_label" htmlFor="videoUrl">
          Video URL
        </label>
        <input
          id="videoUrl"
          type="url"
          className="reactEditor_input"
          placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
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
          Supports YouTube and Vimeo URLs
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
                <label className="reactEditor_label" htmlFor="videoWidth">
                  Width
                </label>
                <input
                  id="videoWidth"
                  type="text"
                  className="reactEditor_input"
                  placeholder="e.g., 100%, 640px"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              <div className="reactEditor_formGroup">
                <label className="reactEditor_label" htmlFor="videoHeight">
                  Height
                </label>
                <input
                  id="videoHeight"
                  type="text"
                  className="reactEditor_input"
                  placeholder="e.g., 360px, 480px"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              Leave empty for responsive video (16:9 aspect ratio)
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
          Insert Video
        </button>
      </div>
    </Modal>
  );
};

// Video plugin state
let videoModalState: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  insertContent: ((html: string) => void) | null;
} = {
  isOpen: false,
  setIsOpen: () => {},
  insertContent: null,
};

export const videoPlugin: EditorPlugin = {
  name: 'video',
  version: '1.0.0',
  
  onLoad: (context) => {
    videoModalState.insertContent = (html: string) => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        // Insert at cursor position
        context.insertContent(html);
      } else {
        // Insert at the beginning
        const currentContent = context.getContent();
        context.setContent(html + currentContent);
      }
    };
  },

  toolbarButtons: [
    {
      id: 'insertVideo',
      label: 'Video',
      title: 'Insert Video (YouTube, Vimeo)',
      group: 'media',
      order: 1,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => {
        videoModalState.setIsOpen(true);
      }
    }
  ]
};

// Video modal component wrapper for React integration
export const VideoModalWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Update global state
  videoModalState.isOpen = isOpen;
  videoModalState.setIsOpen = setIsOpen;

  const handleInsert = (html: string) => {
    if (videoModalState.insertContent) {
      videoModalState.insertContent(html);
    }
  };

  return (
    <VideoModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onInsert={handleInsert}
    />
  );
};

