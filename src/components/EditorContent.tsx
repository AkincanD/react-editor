import React, { useEffect, useCallback } from 'react';
import { useEditor } from '../context/EditorContext';

interface EditorContentProps {
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (content: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  placeholder = 'Start typing...',
  readOnly = false,
  className = '',
  onChange,
  onBlur,
  onFocus
}) => {
  const { content, setContent, editorRef, viewSource } = useEditor();

  const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  }, [setContent, onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  const handleSourceChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  }, [setContent, onChange]);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML && !viewSource) {
      editorRef.current.innerHTML = content;
    }
  }, [content, editorRef, viewSource]);

  return (
    <div className={`reactEditor_content ${className}`}>
      {viewSource ? (
        <textarea
          className="reactEditor_sourceView"
          value={content}
          onChange={handleSourceChange}
          readOnly={readOnly}
          spellCheck={false}
        />
      ) : (
        <div
          ref={editorRef}
          className="reactEditor_contentEditable"
          contentEditable={!readOnly}
          data-placeholder={placeholder}
          onInput={handleInput}
          onPaste={handlePaste}
          onBlur={onBlur}
          onFocus={onFocus}
          suppressContentEditableWarning
        />
      )}
    </div>
  );
};

