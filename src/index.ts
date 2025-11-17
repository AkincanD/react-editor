// Main components
export { Editor } from './components/Editor';
export { Toolbar } from './components/Toolbar';
export { EditorContent } from './components/EditorContent';
export { StatusBar } from './components/StatusBar';

// Context and hooks
export { EditorProvider, useEditor } from './context/EditorContext';
export { useEditorTheme } from './hooks/useEditorTheme';

// Utilities
export { setDebugMode, debugLog, debugWarn, debugError, debugGroup, debugGroupEnd } from './utils/logger';

// Types
export type {
  EditorPlugin,
  PluginContext,
  EditorInstance,
  ToolbarButton,
  EditorCommand,
  KeyboardShortcut,
  EditorTheme,
  EditorConfig,
  EditorState,
  ToolbarConfig,
  ToolbarGroup,
  StatusBarInfo
} from './types';

// Built-in plugins
export {
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin,
  alignmentPlugin,
  linksPlugin,
  defaultPlugins
} from './plugins';

// Styles
import './styles.css';

