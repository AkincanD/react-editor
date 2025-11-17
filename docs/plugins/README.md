# Plugin System

React Editor features a powerful and flexible plugin system that allows you to extend the editor's functionality.

## What are Plugins?

Plugins are modular extensions that add features to the editor. They can:

- Add toolbar buttons
- Register custom commands
- Define keyboard shortcuts
- Hook into editor lifecycle events
- Add custom behaviors

## Plugin Structure

A plugin is a JavaScript object that implements the `EditorPlugin` interface:

```tsx
interface EditorPlugin {
  name: string;
  version?: string;
  toolbarButtons?: ToolbarButton[];
  commands?: EditorCommand[];
  shortcuts?: KeyboardShortcut[];
  onLoad?: (context: PluginContext) => void;
  onUnload?: () => void;
}
```

## Using Plugins

### Using Built-in Plugins

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

<Editor plugins={defaultPlugins} />
```

### Using Individual Plugins

```tsx
import { 
  Editor,
  basicFormattingPlugin,
  headingsPlugin
} from '@akincand/react-editor';

<Editor plugins={[basicFormattingPlugin, headingsPlugin]} />
```

### Mixing Built-in and Custom Plugins

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';
import { myCustomPlugin } from './my-plugin';

<Editor plugins={[...defaultPlugins, myCustomPlugin]} />
```

## Creating a Plugin

Here's a simple plugin example:

```tsx
import { EditorPlugin } from '@akincand/react-editor';

const highlightPlugin: EditorPlugin = {
  name: 'highlight',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'highlight',
      label: '🖍️',
      title: 'Highlight Text',
      group: 'formatting',
      onClick: () => {
        document.execCommand('backColor', false, 'yellow');
      }
    }
  ],
  
  onLoad: (context) => {
    console.log('Highlight plugin loaded!');
  }
};

export default highlightPlugin;
```

## Plugin Context

When a plugin is loaded, it receives a `PluginContext` object:

```tsx
interface PluginContext {
  editor: EditorInstance;
  getContent: () => string;
  setContent: (content: string) => void;
  insertContent: (content: string) => void;
  execCommand: (command: string, value?: any) => void;
  registerCommand: (command: EditorCommand) => void;
  registerToolbarButton: (button: ToolbarButton) => void;
}
```

Use this context to interact with the editor:

```tsx
const myPlugin: EditorPlugin = {
  name: 'myPlugin',
  
  onLoad: (context) => {
    // Get current content
    const content = context.getContent();
    
    // Insert content
    context.insertContent('<p>Hello!</p>');
    
    // Execute a command
    context.execCommand('bold');
    
    // Register a new command
    context.registerCommand({
      name: 'myCommand',
      execute: () => console.log('Command executed!')
    });
  }
};
```

## Plugin Examples

### Text Transform Plugin

```tsx
const textTransformPlugin: EditorPlugin = {
  name: 'textTransform',
  
  toolbarButtons: [
    {
      id: 'uppercase',
      label: 'ABC',
      title: 'Convert to Uppercase',
      group: 'transform',
      onClick: () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
          document.execCommand(
            'insertText',
            false,
            selection.toString().toUpperCase()
          );
        }
      }
    },
    {
      id: 'lowercase',
      label: 'abc',
      title: 'Convert to Lowercase',
      group: 'transform',
      onClick: () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
          document.execCommand(
            'insertText',
            false,
            selection.toString().toLowerCase()
          );
        }
      }
    }
  ]
};
```

### Word Count Plugin

```tsx
const wordCountPlugin: EditorPlugin = {
  name: 'wordCount',
  
  onLoad: (context) => {
    // Update word count on content change
    setInterval(() => {
      const content = context.getContent();
      const text = content.replace(/<[^>]*>/g, '');
      const words = text.trim().split(/\s+/).length;
      console.log('Word count:', words);
    }, 1000);
  }
};
```

## Learn More

- [Built-in Plugins](built-in-plugins.md)
- [Creating Custom Plugins](creating-plugins.md)
- [Plugin API Reference](plugin-api.md)

