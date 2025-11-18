import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { EditorPlugin, EditorCommand, ToolbarButton, EditorInstance, EditorTheme } from '../types';
import { debugLog, debugWarn } from '../utils/logger';

interface EditorContextValue {
  content: string;
  setContent: (content: string) => void;
  theme: EditorTheme;
  setTheme: (theme: EditorTheme) => void;
  plugins: EditorPlugin[];
  registerPlugin: (plugin: EditorPlugin) => void;
  unregisterPlugin: (pluginName: string) => void;
  commands: Map<string, EditorCommand>;
  registerCommand: (command: EditorCommand) => void;
  execCommand: (commandName: string, value?: unknown) => void;
  toolbarButtons: ToolbarButton[];
  registerToolbarButton: (button: ToolbarButton) => void;
  editorRef: React.RefObject<HTMLDivElement>;
  getEditorInstance: () => EditorInstance | null;
  viewSource: boolean;
  toggleViewSource: () => void;
  updateToolbar: () => void;
  selectionUpdate: number;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
};

interface EditorProviderProps {
  children: ReactNode;
  initialContent?: string;
  initialTheme?: EditorTheme;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({
  children,
  initialContent = '',
  initialTheme = { mode: 'light' }
}) => {
  const [content, setContent] = useState(initialContent);
  const [theme, setTheme] = useState<EditorTheme>(initialTheme);
  const [plugins, setPlugins] = useState<EditorPlugin[]>([]);
  const [commands, setCommands] = useState<Map<string, EditorCommand>>(new Map());
  const [toolbarButtons, setToolbarButtons] = useState<ToolbarButton[]>([]);
  const [viewSource, setViewSource] = useState(false);
  const [selectionUpdate, setSelectionUpdate] = useState(0); // Force toolbar re-render on selection change
  const editorRef = useRef<HTMLDivElement>(null);

  const registerPlugin = useCallback((plugin: EditorPlugin) => {
    setPlugins(prev => {
      // Silently skip if already registered
      if (prev.find(p => p.name === plugin.name)) {
        return prev;
      }
      return [...prev, plugin];
    });
  }, []);

  const unregisterPlugin = useCallback((pluginName: string) => {
    setPlugins(prev => {
      const plugin = prev.find(p => p.name === pluginName);
      if (plugin && plugin.onUnload) {
        plugin.onUnload();
      }
      return prev.filter(p => p.name !== pluginName);
    });
  }, []);

  const registerCommand = useCallback((command: EditorCommand) => {
    setCommands(prev => {
      const newCommands = new Map(prev);
      newCommands.set(command.name, command);
      debugLog('COMMAND', `Registered command: ${command.name}`);
      return newCommands;
    });
  }, []);

  const execCommand = useCallback((commandName: string, value?: unknown) => {
    const command = commands.get(commandName);
    if (command) {
      if (!command.canExecute || command.canExecute()) {
        debugLog('COMMAND', `Executing: ${commandName}`, value !== undefined ? { value } : undefined);
        command.execute(value);
      } else {
        debugWarn('COMMAND', `Cannot execute ${commandName} (canExecute returned false)`);
      }
    } else {
      debugWarn('COMMAND', `Command not found: ${commandName}`);
    }
  }, [commands]);

  const registerToolbarButton = useCallback((button: ToolbarButton) => {
    setToolbarButtons(prev => {
      if (prev.find(b => b.id === button.id)) {
        debugLog('TOOLBAR', `Button already registered: ${button.id}`);
        return prev;
      }
      debugLog('TOOLBAR', `Registered button: ${button.id}`, {
        group: button.group,
        order: button.order
      });
      return [...prev, button];
    });
  }, []);

  const toggleViewSource = useCallback(() => {
    setViewSource(prev => {
      const newValue = !prev;
      debugLog('VIEW', `View mode changed: ${newValue ? 'Source Code' : 'Visual Editor'}`);
      return newValue;
    });
  }, []);

  // Function to trigger toolbar update (called on selection change)
  const updateToolbar = useCallback(() => {
    setSelectionUpdate(prev => prev + 1);
  }, []);

  const getEditorInstance = useCallback((): EditorInstance | null => {
    if (!editorRef.current) return null;

    return {
      getHTML: () => editorRef.current?.innerHTML || '',
      setHTML: (html: string) => {
        if (editorRef.current) {
          editorRef.current.innerHTML = html;
          setContent(html);
        }
      },
      getText: () => editorRef.current?.textContent || '',
      insertHTML: (html: string) => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const fragment = range.createContextualFragment(html);
          range.insertNode(fragment);
        }
      },
      focus: () => editorRef.current?.focus(),
      blur: () => editorRef.current?.blur(),
      undo: () => document.execCommand('undo'),
      redo: () => document.execCommand('redo'),
      clear: () => {
        if (editorRef.current) {
          editorRef.current.innerHTML = '';
          setContent('');
        }
      },
      getSelection: () => window.getSelection(),
      getEditorElement: () => editorRef.current
    };
  }, []);

  const value: EditorContextValue = {
    content,
    setContent,
    theme,
    setTheme,
    plugins,
    registerPlugin,
    unregisterPlugin,
    commands,
    registerCommand,
    execCommand,
    toolbarButtons,
    registerToolbarButton,
    editorRef,
    getEditorInstance,
    viewSource,
    toggleViewSource,
    updateToolbar,
    selectionUpdate
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

