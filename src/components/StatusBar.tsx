import React, { useMemo } from 'react';
import { useEditor } from '../context/EditorContext';
import { StatusBarInfo } from '../types';

interface StatusBarProps {
  showWordCount?: boolean;
  showCharCount?: boolean;
  customInfo?: StatusBarInfo;
  className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  showWordCount = true,
  showCharCount = true,
  customInfo,
  className = ''
}) => {
  const { content } = useEditor();

  const stats = useMemo(() => {
    const text = content.replace(/<[^>]*>/g, '').trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    const charCount = text.length;
    const lineCount = text ? text.split('\n').length : 0;

    return { wordCount, charCount, lineCount };
  }, [content]);

  return (
    <div className={`reactEditor_statusBar ${className}`}>
      <div className="reactEditor_statusBarSection">
        {showWordCount && (
          <span>Words: {stats.wordCount}</span>
        )}
        {showCharCount && (
          <span>Characters: {stats.charCount}</span>
        )}
        {customInfo?.lineCount !== undefined && (
          <span>Lines: {customInfo.lineCount}</span>
        )}
      </div>
      <div className="reactEditor_statusBarSection">
        {customInfo?.custom && Object.entries(customInfo.custom).map(([key, value]) => (
          <span key={key}>{key}: {String(value)}</span>
        ))}
      </div>
    </div>
  );
};

