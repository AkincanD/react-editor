import React, { useEffect, useMemo } from 'react';
import { EditorProvider, useEditor } from '../context/EditorContext';
import { Toolbar } from './Toolbar';
import { EditorContent } from './EditorContent';
import { StatusBar } from './StatusBar';
import { EditorConfig, PluginContext } from '../types';
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
  autoFocus
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

  // Initialize plugins
  useEffect(() => {
    plugins.forEach(plugin => {
      registerPlugin(plugin);

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
        plugin.toolbarButtons.forEach(button => registerToolbarButton(button));
      }

      // Register plugin's commands
      if (plugin.commands) {
        plugin.commands.forEach(command => registerCommand(command));
      }

      // Call plugin's onLoad
      if (plugin.onLoad) {
        plugin.onLoad(pluginContext);
      }
    });
  }, [plugins, registerPlugin, registerCommand, registerToolbarButton, execCommand, content, setContent, getEditorInstance]);

  // Call onReady when editor is ready
  useEffect(() => {
    if (onReady && editorRef.current) {
      const instance = getEditorInstance();
      if (instance) {
        onReady(instance);
      }
    }
  }, [onReady, getEditorInstance, editorRef]);

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
      className={`react-editor ${theme.mode === 'dark' ? 'dark' : ''} ${className}`}
      style={containerStyle}
    >
      <Toolbar buttons={toolbar} />
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

