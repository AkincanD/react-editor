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
  const { content, setContent, editorRef, viewSource, updateToolbar } = useEditor();

  // Track if update is from user input to prevent unnecessary innerHTML updates
  const isUserInputRef = React.useRef(false);

  const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    // Mark as user input to prevent useEffect from updating innerHTML
    isUserInputRef.current = true;
    // Update state immediately
    setContent(newContent);
    // Call onChange in next tick to avoid blocking UI
    if (onChange) {
      requestAnimationFrame(() => {
        onChange(newContent);
      });
    }
  }, [setContent, onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  // Drag and drop handlers for media elements
  useEffect(() => {
    if (!editorRef.current || viewSource || readOnly) return;

    const editor = editorRef.current;
    let draggedElement: HTMLElement | null = null;
    let dropIndicator: HTMLElement | null = null;

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[contenteditable="false"][draggable="true"]')) {
        draggedElement = target.closest('[contenteditable="false"][draggable="true"]') as HTMLElement;
        if (draggedElement) {
          e.dataTransfer?.setData('text/html', draggedElement.outerHTML);
          e.dataTransfer!.effectAllowed = 'move';
          draggedElement.style.opacity = '0.5';
          
          // Create drop indicator
          dropIndicator = document.createElement('div');
          dropIndicator.style.cssText = 'border: 2px dashed #2563eb; height: 4px; margin: 8px 0; pointer-events: none;';
          dropIndicator.className = 'reactEditor_dropIndicator';
        }
      }
    };

    const handleDragEnd = () => {
      if (draggedElement) {
        draggedElement.style.opacity = '1';
        draggedElement = null;
      }
      if (dropIndicator && dropIndicator.parentNode) {
        dropIndicator.parentNode.removeChild(dropIndicator);
        dropIndicator = null;
      }
    };

    const handleDragOver = (e: DragEvent) => {
      if (!draggedElement) return;
      e.preventDefault();
      e.dataTransfer!.dropEffect = 'move';

      const target = e.target as HTMLElement;
      if (!editor.contains(target) || target === draggedElement) return;

      // Get mouse position
      const x = e.clientX;
      const y = e.clientY;

      // Find element at point
      const elementAtPoint = document.elementFromPoint(x, y);
      if (!elementAtPoint || !editor.contains(elementAtPoint)) {
        return;
      }

      // Find insertion point
      let range: Range | null = null;
      
      // Try to find text node or editable element
      let targetNode: Node | null = elementAtPoint;
      while (targetNode && targetNode !== editor) {
        if (targetNode.nodeType === Node.TEXT_NODE) {
          range = document.createRange();
          range.setStart(targetNode, 0);
          range.collapse(true);
          break;
        }
        const el = targetNode as HTMLElement;
        if (el.closest && !el.closest('[contenteditable="false"]')) {
          range = document.createRange();
          range.setStartBefore(targetNode);
          range.collapse(true);
          break;
        }
        targetNode = targetNode.parentNode;
      }

      if (!range) {
        // Fallback: create range at end
        range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
      }

      // Remove old indicator
      const oldIndicator = editor.querySelector('.reactEditor_dropIndicator');
      if (oldIndicator) {
        oldIndicator.remove();
      }

      // Add new indicator at range position
      if (range && range.startContainer && range.startContainer.parentNode) {
        try {
          const parent = range.startContainer.nodeType === Node.TEXT_NODE 
            ? range.startContainer.parentNode 
            : range.startContainer as HTMLElement;
          
          if (parent && parent !== editor) {
            parent.insertBefore(dropIndicator!, range.startContainer.nodeType === Node.TEXT_NODE 
              ? range.startContainer 
              : parent.firstChild);
          } else {
            editor.appendChild(dropIndicator!);
          }
        } catch (err) {
          // Fallback: append to editor
          editor.appendChild(dropIndicator!);
        }
      } else {
        editor.appendChild(dropIndicator!);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (!draggedElement) return;

      const target = e.target as HTMLElement;
      if (!editor.contains(target) || target === draggedElement) return;

      // Get drop position
      const x = e.clientX;
      const y = e.clientY;

      // Find element at point
      const elementAtPoint = document.elementFromPoint(x, y);
      if (!elementAtPoint || !editor.contains(elementAtPoint)) {
        return;
      }

      // Find insertion point
      let range: Range | null = null;
      
      // Try to find text node or editable element
      let targetNode: Node | null = elementAtPoint;
      while (targetNode && targetNode !== editor) {
        if (targetNode.nodeType === Node.TEXT_NODE) {
          range = document.createRange();
          range.setStart(targetNode, 0);
          range.collapse(true);
          break;
        }
        const el = targetNode as HTMLElement;
        if (el.closest && !el.closest('[contenteditable="false"]')) {
          range = document.createRange();
          range.setStartBefore(targetNode);
          range.collapse(true);
          break;
        }
        targetNode = targetNode.parentNode;
      }

      if (!range) {
        // Fallback: create range at end
        range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
      }

      // Remove dragged element from old position
      if (draggedElement.parentNode) {
        draggedElement.parentNode.removeChild(draggedElement);
      }

      // Insert at new position
      try {
        const insertNode = range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer
          : range.startContainer.firstChild || range.startContainer;

        if (insertNode && insertNode.parentNode) {
          insertNode.parentNode.insertBefore(draggedElement, insertNode);
        } else {
          editor.appendChild(draggedElement);
        }
      } catch (err) {
        // Fallback: append to editor
        editor.appendChild(draggedElement);
      }

      // Remove indicator
      if (dropIndicator && dropIndicator.parentNode) {
        dropIndicator.parentNode.removeChild(dropIndicator);
      }

      // Update content
      const newContent = editor.innerHTML;
      setContent(newContent);
      if (onChange) {
        onChange(newContent);
      }

      draggedElement = null;
      dropIndicator = null;
    };

    editor.addEventListener('dragstart', handleDragStart);
    editor.addEventListener('dragend', handleDragEnd);
    editor.addEventListener('dragover', handleDragOver);
    editor.addEventListener('drop', handleDrop);

    return () => {
      editor.removeEventListener('dragstart', handleDragStart);
      editor.removeEventListener('dragend', handleDragEnd);
      editor.removeEventListener('dragover', handleDragOver);
      editor.removeEventListener('drop', handleDrop);
    };
  }, [editorRef, viewSource, readOnly, setContent, onChange]);

  const handleSourceChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  }, [setContent, onChange]);

  // Only update innerHTML when content changes externally (not from user input)
  useEffect(() => {
    if (!editorRef.current || viewSource) return;
    
    // Skip if this update is from user input (handleInput already updated the DOM)
    if (isUserInputRef.current) {
      isUserInputRef.current = false;
      return;
    }
    
    // Only update if content is different (external change)
    if (content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content, editorRef, viewSource]);

  // Listen to selection changes to update toolbar active states
  useEffect(() => {
    if (!editorRef.current || viewSource || readOnly) return;

    const editor = editorRef.current;
    
    const handleSelectionChange = () => {
      // Update toolbar to re-evaluate isActive functions
      updateToolbar();
    };

    // Listen to selection changes
    document.addEventListener('selectionchange', handleSelectionChange);
    
    // Also listen to mouseup and keyup in editor
    const handleMouseUp = () => {
      setTimeout(handleSelectionChange, 0);
    };
    
    const handleKeyUp = () => {
      setTimeout(handleSelectionChange, 0);
    };

    editor.addEventListener('mouseup', handleMouseUp);
    editor.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      editor.removeEventListener('mouseup', handleMouseUp);
      editor.removeEventListener('keyup', handleKeyUp);
    };
  }, [editorRef, viewSource, readOnly, updateToolbar]);

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

