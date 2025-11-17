import { ReactNode } from 'react';

export interface EditorPlugin {
  name: string;
  version?: string;
  onLoad?: (context: PluginContext) => void;
  onUnload?: () => void;
  toolbarButtons?: ToolbarButton[];
  commands?: EditorCommand[];
  shortcuts?: KeyboardShortcut[];
}

export interface PluginContext {
  editor: EditorInstance;
  getContent: () => string;
  setContent: (content: string) => void;
  insertContent: (content: string) => void;
  execCommand: (command: string, value?: unknown) => void;
  registerCommand: (command: EditorCommand) => void;
  registerToolbarButton: (button: ToolbarButton) => void;
}

export interface EditorInstance {
  getHTML: () => string;
  setHTML: (html: string) => void;
  getText: () => string;
  insertHTML: (html: string) => void;
  focus: () => void;
  blur: () => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  getSelection: () => Selection | null;
}

export interface ToolbarButton {
  id: string;
  icon?: ReactNode;
  label?: string;
  title?: string;
  command?: string;
  value?: unknown;
  isActive?: () => boolean;
  onClick?: () => void;
  group?: string;
  order?: number;
  disabled?: boolean;
}

export interface EditorCommand {
  name: string;
  execute: (value?: unknown) => void;
  canExecute?: () => boolean;
}

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  handler: () => void;
}

export interface EditorTheme {
  mode: 'light' | 'dark';
  colors?: {
    background?: string;
    text?: string;
    border?: string;
    toolbar?: string;
    hover?: string;
  };
}

export interface EditorConfig {
  placeholder?: string;
  defaultContent?: string;
  readOnly?: boolean;
  theme?: EditorTheme;
  plugins?: EditorPlugin[];
  toolbar?: ToolbarButton[];
  autoFocus?: boolean;
  spellCheck?: boolean;
  height?: string | number;
  maxHeight?: string | number;
  minHeight?: string | number;
  className?: string;
  customStyles?: React.CSSProperties;
  showSourceButton?: boolean;
  debugConsole?: boolean;
  onChange?: (content: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onReady?: (editor: EditorInstance) => void;
}

export interface EditorState {
  content: string;
  selection: Selection | null;
  history: string[];
  historyIndex: number;
  isDirty: boolean;
}

export interface ToolbarConfig {
  sticky?: boolean;
  hidden?: boolean;
  groups?: ToolbarGroup[];
}

export interface ToolbarGroup {
  id: string;
  buttons: ToolbarButton[];
  order?: number;
}

export interface StatusBarInfo {
  wordCount?: number;
  charCount?: number;
  lineCount?: number;
  custom?: Record<string, unknown>;
}

