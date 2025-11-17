# API Reference

Complete API reference for React Editor.

## Table of Contents

- [Editor Component](#editor-component)
- [Hooks](#hooks)
- [Types](#types)
- [Plugin API](#plugin-api)

## Editor Component

### Props

The main `Editor` component accepts the following props:

#### Basic Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"Start typing..."` | Placeholder text shown when editor is empty |
| `defaultContent` | `string` | `""` | Initial HTML content |
| `readOnly` | `boolean` | `false` | Makes editor read-only |
| `autoFocus` | `boolean` | `false` | Auto-focuses editor on mount |
| `spellCheck` | `boolean` | `true` | Enables browser spell checking |
| `showSourceButton` | `boolean` | `false` | Shows view source toggle button in toolbar |
| `debugConsole` | `boolean` | `false` | Enables debug logging in console |
| `className` | `string` | `""` | Additional CSS class for wrapper |

#### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `string \| number` | `undefined` | Fixed height for editor |
| `minHeight` | `string \| number` | `"300px"` | Minimum height |
| `maxHeight` | `string \| number` | `undefined` | Maximum height |
| `style` | `React.CSSProperties` | `undefined` | Inline styles for wrapper |

#### Theme Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `EditorTheme` | `{ mode: 'light' }` | Theme configuration |

**EditorTheme:**
```typescript
interface EditorTheme {
  mode: 'light' | 'dark';
  colors?: {
    background?: string;
    text?: string;
    border?: string;
    toolbar?: string;
    hover?: string;
  };
}
```

#### Plugin Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `plugins` | `EditorPlugin[]` | `[]` | Array of plugins to load |
| `toolbar` | `ToolbarButton[]` | `undefined` | Custom toolbar buttons |

#### Event Props

| Prop | Type | Description |
|------|------|-------------|
| `onChange` | `(content: string) => void` | Called when content changes |
| `onBlur` | `() => void` | Called when editor loses focus |
| `onFocus` | `() => void` | Called when editor gains focus |
| `onReady` | `(editor: EditorInstance) => void` | Called when editor is ready |

### Example Usage

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function MyEditor() {
  const [content, setContent] = useState('');

  return (
    <Editor
      plugins={defaultPlugins}
      placeholder="Start typing..."
      defaultContent="<p>Hello World!</p>"
      theme={{ mode: 'dark' }}
      height="500px"
      autoFocus
      showSourceButton={true}
      debugConsole={true}
      onChange={setContent}
      onReady={(editor) => console.log('Editor ready!', editor)}
    />
  );
}
```

## Hooks

### useEditor

Access editor context and state.

```typescript
function useEditor(): EditorContextValue
```

**Returns:**

```typescript
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
}
```

**Example:**

```tsx
import { useEditor } from '@akincand/react-editor';

function MyComponent() {
  const { content, setContent, execCommand } = useEditor();

  const makeBold = () => {
    execCommand('bold');
  };

  return (
    <div>
      <button onClick={makeBold}>Make Bold</button>
      <p>Content length: {content.length}</p>
    </div>
  );
}
```

### useEditorTheme

Manage editor theme.

```typescript
function useEditorTheme(): {
  theme: EditorTheme;
  toggleTheme: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
  setCustomTheme: (theme: EditorTheme) => void;
}
```

**Example:**

```tsx
import { useEditorTheme } from '@akincand/react-editor';

function ThemeToggle() {
  const { theme, toggleTheme } = useEditorTheme();

  return (
    <button onClick={toggleTheme}>
      {theme.mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

## Types

### EditorInstance

The editor instance provides methods to interact with the editor programmatically.

```typescript
interface EditorInstance {
  // Get HTML content
  getHTML: () => string;
  
  // Set HTML content
  setHTML: (html: string) => void;
  
  // Get plain text content
  getText: () => string;
  
  // Insert HTML at cursor position
  insertHTML: (html: string) => void;
  
  // Focus the editor
  focus: () => void;
  
  // Blur the editor
  blur: () => void;
  
  // Undo last action
  undo: () => void;
  
  // Redo last undone action
  redo: () => void;
  
  // Clear all content
  clear: () => void;
  
  // Get current selection
  getSelection: () => Selection | null;
}
```

**Example:**

```tsx
import { useRef } from 'react';
import { Editor, EditorInstance } from '@akincand/react-editor';

function MyEditor() {
  const editorRef = useRef<EditorInstance | null>(null);

  const insertSignature = () => {
    if (editorRef.current) {
      editorRef.current.insertHTML(
        '<p>Best regards,<br>John Doe</p>'
      );
    }
  };

  const clearAll = () => {
    if (editorRef.current) {
      editorRef.current.clear();
    }
  };

  return (
    <>
      <button onClick={insertSignature}>Insert Signature</button>
      <button onClick={clearAll}>Clear</button>
      <Editor onReady={(editor) => { editorRef.current = editor; }} />
    </>
  );
}
```

### EditorPlugin

Plugin interface for extending editor functionality.

```typescript
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

See [Plugin API](plugins/plugin-api.md) for detailed documentation.

### ToolbarButton

Button configuration for the toolbar.

```typescript
interface ToolbarButton {
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
```

**Example:**

```tsx
const customButton: ToolbarButton = {
  id: 'my-button',
  label: 'Custom',
  title: 'Custom Action',
  icon: <MyIcon />,
  group: 'custom',
  order: 1,
  onClick: () => {
    console.log('Custom button clicked!');
  },
  isActive: () => false,
  disabled: false
};
```

### EditorCommand

Command interface for registering custom commands.

```typescript
interface EditorCommand {
  name: string;
  execute: (value?: unknown) => void;
  canExecute?: () => boolean;
}
```

**Example:**

```tsx
const insertDateCommand: EditorCommand = {
  name: 'insertDate',
  execute: () => {
    const date = new Date().toLocaleDateString();
    document.execCommand('insertText', false, date);
  },
  canExecute: () => true
};
```

### KeyboardShortcut

Keyboard shortcut configuration.

```typescript
interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  handler: () => void;
}
```

**Example:**

```tsx
const saveShortcut: KeyboardShortcut = {
  key: 's',
  ctrlKey: true,
  handler: () => {
    console.log('Save shortcut pressed!');
  }
};
```

### PluginContext

Context provided to plugins during initialization.

```typescript
interface PluginContext {
  editor: EditorInstance;
  getContent: () => string;
  setContent: (content: string) => void;
  insertContent: (content: string) => void;
  execCommand: (command: string, value?: unknown) => void;
  registerCommand: (command: EditorCommand) => void;
  registerToolbarButton: (button: ToolbarButton) => void;
}
```

## Plugin API

### Creating a Plugin

```typescript
import { EditorPlugin } from '@akincand/react-editor';

const myPlugin: EditorPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  
  onLoad: (context) => {
    console.log('Plugin loaded!');
    
    // Access editor instance
    const html = context.getContent();
    
    // Register custom command
    context.registerCommand({
      name: 'myCommand',
      execute: () => console.log('Command executed!')
    });
  },
  
  onUnload: () => {
    console.log('Plugin unloaded!');
  }
};
```

See [Creating Custom Plugins](plugins/creating-plugins.md) for complete guide.

## StatusBar Component

Display status information at the bottom of the editor.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showWordCount` | `boolean` | `true` | Show word count |
| `showCharCount` | `boolean` | `true` | Show character count |
| `customInfo` | `StatusBarInfo` | `undefined` | Custom information |
| `className` | `string` | `""` | Additional CSS class |

### StatusBarInfo

```typescript
interface StatusBarInfo {
  wordCount?: number;
  charCount?: number;
  lineCount?: number;
  custom?: Record<string, unknown>;
}
```

## Toolbar Component

Customizable toolbar for the editor.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `buttons` | `ToolbarButton[]` | Custom toolbar buttons |
| `className` | `string` | Additional CSS class |

## Next Steps

- [Plugin Development Guide](plugins/creating-plugins.md)
- [Examples](examples/basic.md)
- [Configuration](configuration.md)

