# Plugin API Reference

Complete API reference for creating React Editor plugins.

## EditorPlugin Interface

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

## Plugin Properties

### name (required)

Unique identifier for your plugin.

```typescript
name: string
```

**Example:**
```typescript
{
  name: 'myAwesomePlugin'
}
```

**Best Practices:**
- Use camelCase
- Make it descriptive
- Ensure uniqueness
- Avoid special characters

### version (optional)

Semantic version of your plugin.

```typescript
version?: string
```

**Example:**
```typescript
{
  name: 'myPlugin',
  version: '1.2.3'
}
```

### toolbarButtons (optional)

Array of toolbar buttons to add.

```typescript
toolbarButtons?: ToolbarButton[]
```

**ToolbarButton Interface:**
```typescript
interface ToolbarButton {
  id: string;                    // Unique button ID
  icon?: ReactNode;              // Custom icon component
  label?: string;                // Text label
  title?: string;                // Tooltip text
  command?: string;              // Command to execute
  value?: unknown;               // Value to pass to command
  isActive?: () => boolean;      // Check if button is active (called on selection change)
  onClick?: () => void;          // Click handler
  group?: string;                // Button group name
  order?: number;                // Display order
  disabled?: boolean;            // Disable button
}
```

**isActive Function:**
The `isActive` function is automatically called when the selection changes to update the button's visual state. Use modern DOM APIs to check formatting:

```typescript
isActive: () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const node = selection.anchorNode;
  if (!node) return false;
  const element = node.nodeType === Node.TEXT_NODE 
    ? node.parentElement 
    : node as HTMLElement;
  if (!element) return false;
  
  // Check formatting using getComputedStyle or DOM structure
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.fontWeight === '700'; // Example for bold
}
```

**Example:**
```typescript
toolbarButtons: [
  {
    id: 'highlight',
    icon: <HighlightIcon />,
    title: 'Highlight Text',
    onClick: () => {
      document.execCommand('backColor', false, 'yellow');
    },
    group: 'formatting',
    order: 10
  }
]
```

### commands (optional)

Custom commands for your plugin.

```typescript
commands?: EditorCommand[]
```

**EditorCommand Interface:**
```typescript
interface EditorCommand {
  name: string;
  execute: (value?: unknown) => void;
  canExecute?: () => boolean;
}
```

**Example:**
```typescript
commands: [
  {
    name: 'insertEmoji',
    execute: (emoji: unknown) => {
      document.execCommand('insertText', false, emoji as string);
    },
    canExecute: () => {
      // Check if editor has focus
      return document.activeElement?.contentEditable === 'true';
    }
  }
]
```

### shortcuts (optional)

Keyboard shortcuts for your plugin.

```typescript
shortcuts?: KeyboardShortcut[]
```

**KeyboardShortcut Interface:**
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
```typescript
shortcuts: [
  {
    key: 'k',
    ctrlKey: true,
    handler: () => {
      console.log('Ctrl+K pressed!');
    }
  },
  {
    key: 's',
    ctrlKey: true,
    shiftKey: true,
    handler: () => {
      console.log('Ctrl+Shift+S pressed!');
    }
  }
]
```

### onLoad (optional)

Called when plugin is loaded.

```typescript
onLoad?: (context: PluginContext) => void
```

**PluginContext Interface:**
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

**Example:**
```typescript
onLoad: (context) => {
  console.log('Plugin loaded!');
  
  // Access current content
  const content = context.getContent();
  
  // Register additional commands dynamically
  context.registerCommand({
    name: 'myDynamicCommand',
    execute: () => console.log('Dynamic command!')
  });
  
  // Register toolbar button dynamically
  context.registerToolbarButton({
    id: 'dynamicButton',
    label: 'Dynamic',
    onClick: () => console.log('Dynamic button clicked!')
  });
}
```

### onUnload (optional)

Called when plugin is unloaded.

```typescript
onUnload?: () => void
```

**Example:**
```typescript
onUnload: () => {
  console.log('Plugin unloaded!');
  
  // Cleanup: Remove event listeners
  // Clear timers
  // Release resources
}
```

## PluginContext API

### editor

Reference to the editor instance.

```typescript
editor: EditorInstance
```

**Methods:**
- `getHTML()` - Get editor HTML
- `setHTML(html)` - Set editor HTML
- `getText()` - Get plain text
- `insertHTML(html)` - Insert HTML at cursor
- `focus()` - Focus editor
- `blur()` - Blur editor
- `undo()` - Undo last action
- `redo()` - Redo last undone action
- `clear()` - Clear all content
- `getSelection()` - Get current selection

**Example:**
```typescript
onLoad: (context) => {
  const html = context.editor.getHTML();
  context.editor.insertHTML('<p>Hello!</p>');
  context.editor.focus();
}
```

### getContent()

Get current editor content as HTML string.

```typescript
getContent: () => string
```

**Example:**
```typescript
const content = context.getContent();
console.log('Current content:', content);
```

### setContent()

Set editor content.

```typescript
setContent: (content: string) => void
```

**Example:**
```typescript
context.setContent('<p>New content</p>');
```

### insertContent()

Insert content at current cursor position.

```typescript
insertContent: (content: string) => void
```

**Example:**
```typescript
context.insertContent('<strong>Bold text</strong>');
```

### execCommand()

Execute a registered command.

```typescript
execCommand: (command: string, value?: unknown) => void
```

**Example:**
```typescript
context.execCommand('bold');
context.execCommand('insertEmoji', '😊');
```

### registerCommand()

Register a new command dynamically.

```typescript
registerCommand: (command: EditorCommand) => void
```

**Example:**
```typescript
context.registerCommand({
  name: 'insertDate',
  execute: () => {
    const date = new Date().toLocaleDateString();
    context.insertContent(date);
  }
});
```

### registerToolbarButton()

Register a new toolbar button dynamically.

```typescript
registerToolbarButton: (button: ToolbarButton) => void
```

**Example:**
```typescript
context.registerToolbarButton({
  id: 'myButton',
  label: 'Click Me',
  onClick: () => alert('Clicked!')
});
```

## Complete Plugin Example

```typescript
import { EditorPlugin } from '@akincand/react-editor';

export const advancedPlugin: EditorPlugin = {
  name: 'advancedPlugin',
  version: '2.0.0',
  
  toolbarButtons: [
    {
      id: 'uppercase',
      label: 'ABC',
      title: 'Convert to Uppercase',
      group: 'transform',
      order: 1,
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
    }
  ],
  
  commands: [
    {
      name: 'insertCodeBlock',
      execute: (code: unknown) => {
        const codeHtml = `
          <pre><code>${code as string}</code></pre>
        `;
        document.execCommand('insertHTML', false, codeHtml);
      },
      canExecute: () => true
    }
  ],
  
  shortcuts: [
    {
      key: 'u',
      ctrlKey: true,
      shiftKey: true,
      handler: () => {
        // Uppercase shortcut
        const selection = window.getSelection();
        if (selection && selection.toString()) {
          document.execCommand(
            'insertText',
            false,
            selection.toString().toUpperCase()
          );
        }
      }
    }
  ],
  
  onLoad: (context) => {
    console.log('Advanced plugin loaded!');
    
    // Setup event listeners
    const handleCustomEvent = () => {
      console.log('Custom event triggered!');
    };
    
    window.addEventListener('customEvent', handleCustomEvent);
    
    // Store cleanup function
    (window as any).__pluginCleanup = () => {
      window.removeEventListener('customEvent', handleCustomEvent);
    };
  },
  
  onUnload: () => {
    console.log('Advanced plugin unloaded!');
    
    // Cleanup
    if ((window as any).__pluginCleanup) {
      (window as any).__pluginCleanup();
      delete (window as any).__pluginCleanup;
    }
  }
};
```

## Plugin Best Practices

### 1. Naming Conventions

```typescript
// ✅ Good
name: 'emojiPicker'
name: 'imageUpload'
name: 'codeHighlight'

// ❌ Bad
name: 'emoji-picker'
name: 'Image Upload'
name: 'code_highlight'
```

### 2. Version Management

```typescript
// Use semantic versioning
version: '1.0.0'  // MAJOR.MINOR.PATCH
version: '2.1.3'
```

### 3. Resource Cleanup

```typescript
onLoad: (context) => {
  const interval = setInterval(() => {
    // Do something
  }, 1000);
  
  // Store cleanup
  return () => clearInterval(interval);
},

onUnload: () => {
  // Cleanup resources
}
```

### 4. Error Handling

```typescript
onLoad: (context) => {
  try {
    // Plugin initialization
  } catch (error) {
    console.error('Plugin initialization failed:', error);
  }
}
```

### 5. Type Safety

```typescript
import { EditorPlugin, PluginContext } from '@akincand/react-editor';

interface MyPluginConfig {
  apiKey: string;
  endpoint: string;
}

export function createMyPlugin(config: MyPluginConfig): EditorPlugin {
  return {
    name: 'myPlugin',
    onLoad: (context: PluginContext) => {
      // Type-safe implementation
    }
  };
}
```

## Common Patterns

### State Management

```typescript
let pluginState = {
  isActive: false,
  count: 0
};

export const statefulPlugin: EditorPlugin = {
  name: 'statefulPlugin',
  onLoad: (context) => {
    pluginState.isActive = true;
  },
  onUnload: () => {
    pluginState.isActive = false;
  }
};
```

### Async Operations

```typescript
export const asyncPlugin: EditorPlugin = {
  name: 'asyncPlugin',
  toolbarButtons: [
    {
      id: 'fetchData',
      label: 'Fetch',
      onClick: async () => {
        try {
          const response = await fetch('/api/data');
          const data = await response.json();
          // Use data
        } catch (error) {
          console.error('Fetch failed:', error);
        }
      }
    }
  ]
};
```

### Configuration Options

```typescript
interface PluginOptions {
  enabled: boolean;
  timeout: number;
  callback?: () => void;
}

export function createConfigurablePlugin(
  options: PluginOptions
): EditorPlugin {
  return {
    name: 'configurablePlugin',
    onLoad: (context) => {
      if (options.enabled) {
        setTimeout(() => {
          options.callback?.();
        }, options.timeout);
      }
    }
  };
}

// Usage
const plugin = createConfigurablePlugin({
  enabled: true,
  timeout: 1000,
  callback: () => console.log('Callback!')
});
```

## Next Steps

- [Creating Custom Plugins](creating-plugins.md)
- [Built-in Plugins](built-in-plugins.md)
- [Publishing Your Plugin](publishing-plugins.md)

