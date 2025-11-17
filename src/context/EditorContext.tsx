import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { EditorPlugin, PluginContext, EditorCommand, ToolbarButton, EditorInstance, EditorTheme } from '../types';

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
  execCommand: (commandName: string, value?: any) => void;
  toolbarButtons: ToolbarButton[];
  registerToolbarButton: (button: ToolbarButton) => void;
  editorRef: React.RefObject<HTMLDivElement>;
  getEditorInstance: () => EditorInstance | null;
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
  const editorRef = useRef<HTMLDivElement>(null);

  const registerPlugin = useCallback((plugin: EditorPlugin) => {
    setPlugins(prev => {
      if (prev.find(p => p.name === plugin.name)) {
        console.warn(`Plugin ${plugin.name} is already registered`);
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
      return newCommands;
    });
  }, []);

  const execCommand = useCallback((commandName: string, value?: any) => {
    const command = commands.get(commandName);
    if (command) {
      if (!command.canExecute || command.canExecute()) {
        command.execute(value);
      }
    } else {
      console.warn(`Command ${commandName} not found`);
    }
  }, [commands]);

  const registerToolbarButton = useCallback((button: ToolbarButton) => {
    setToolbarButtons(prev => {
      if (prev.find(b => b.id === button.id)) {
        return prev;
      }
      return [...prev, button];
    });
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
      getSelection: () => window.getSelection()
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
    getEditorInstance
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

