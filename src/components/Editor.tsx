import React, { useEffect, useRef } from 'react';
import { EditorProvider, useEditor } from '../context/EditorContext';
import { Toolbar } from './Toolbar';
import { EditorContent } from './EditorContent';
import { StatusBar } from './StatusBar';
import { EditorConfig, PluginContext } from '../types';
import { setDebugMode, debugLog, debugGroup, debugGroupEnd } from '../utils/logger';
import '../styles.css';

interface EditorProps extends EditorConfig {
  style?: React.CSSProperties;
}

const EditorInner: React.FC<EditorConfig> = ({
  placeholder,
  readOnly,
  toolbar,
  plugins = [],
  onChange,
  onBlur,
  onFocus,
  onReady,
  className = '',
  height,
  maxHeight,
  minHeight,
  autoFocus,
  showSourceButton = false,
  debugConsole = false
}) => {
  const {
    content,
    setContent,
    theme,
    registerPlugin,
    registerCommand,
    registerToolbarButton,
    execCommand,
    getEditorInstance,
    editorRef
  } = useEditor();

  // Set debug mode
  useEffect(() => {
    setDebugMode(debugConsole);
    if (debugConsole) {
      debugLog('INIT', 'Editor initializing...');
    }
  }, [debugConsole]);

  // Track initialized plugins to prevent duplicate registration
  const initializedPluginsRef = useRef<Set<string>>(new Set());

  // Initialize plugins only once
  useEffect(() => {
    if (plugins.length > 0) {
      debugGroup(`🔌 Loading ${plugins.length} plugin(s)`, true);
    }

    plugins.forEach(plugin => {
      // Skip if already initialized
      if (initializedPluginsRef.current.has(plugin.name)) {
        debugLog('PLUGIN', `Skipping already initialized plugin: ${plugin.name}`);
        return;
      }

      debugLog('PLUGIN', `Registering plugin: ${plugin.name}`, {
        version: plugin.version,
        hasToolbarButtons: !!plugin.toolbarButtons?.length,
        hasCommands: !!plugin.commands?.length,
        hasShortcuts: !!plugin.shortcuts?.length
      });

      registerPlugin(plugin);
      initializedPluginsRef.current.add(plugin.name);

      const pluginContext: PluginContext = {
        editor: getEditorInstance()!,
        getContent: () => content,
        setContent,
        insertContent: (html: string) => {
          const instance = getEditorInstance();
          if (instance) {
            instance.insertHTML(html);
          }
        },
        execCommand,
        registerCommand,
        registerToolbarButton
      };

      // Register plugin's toolbar buttons
      if (plugin.toolbarButtons) {
        debugLog('PLUGIN', `  ↳ Registering ${plugin.toolbarButtons.length} toolbar button(s)`, 
          plugin.toolbarButtons.map(b => b.id)
        );
        plugin.toolbarButtons.forEach(button => registerToolbarButton(button));
      }

      // Register plugin's commands
      if (plugin.commands) {
        debugLog('PLUGIN', `  ↳ Registering ${plugin.commands.length} command(s)`, 
          plugin.commands.map(c => c.name)
        );
        plugin.commands.forEach(command => registerCommand(command));
      }

      // Register keyboard shortcuts
      if (plugin.shortcuts) {
        debugLog('PLUGIN', `  ↳ Registering ${plugin.shortcuts.length} keyboard shortcut(s)`);
      }

      // Call plugin's onLoad
      if (plugin.onLoad) {
        debugLog('PLUGIN', `  ↳ Calling onLoad for ${plugin.name}`);
        plugin.onLoad(pluginContext);
      }

      debugLog('PLUGIN', `✓ Plugin ${plugin.name} loaded successfully`);
    });

    if (plugins.length > 0) {
      debugGroupEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Call onReady when editor is ready
  useEffect(() => {
    if (onReady && editorRef.current) {
      const instance = getEditorInstance();
      if (instance) {
        debugLog('INIT', '✓ Editor ready and mounted', {
          plugins: plugins.length,
          theme: theme.mode,
          readOnly,
          showSourceButton
        });
        onReady(instance);
      }
    }
  }, [onReady, getEditorInstance, editorRef, plugins.length, theme.mode, readOnly, showSourceButton]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && editorRef.current) {
      editorRef.current.focus();
    }
  }, [autoFocus, editorRef]);

  const containerStyle: React.CSSProperties = {
    height,
    maxHeight,
    minHeight: minHeight || '300px'
  };

  return (
    <div
      className={`reactEditor_container ${theme.mode === 'dark' ? 'reactEditor_dark' : ''} ${className}`}
      style={containerStyle}
    >
      <Toolbar buttons={toolbar} showSourceButton={showSourceButton} />
      <EditorContent
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <StatusBar />
    </div>
  );
};

export const Editor: React.FC<EditorProps> = (props) => {
  const { defaultContent = '', theme = { mode: 'light' }, ...rest } = props;

  return (
    <EditorProvider initialContent={defaultContent} initialTheme={theme}>
      <EditorInner {...rest} theme={theme} />
    </EditorProvider>
  );
};

