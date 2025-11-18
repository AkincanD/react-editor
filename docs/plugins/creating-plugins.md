# Creating Custom Plugins

Learn how to create powerful custom plugins for React Editor.

## Plugin Template

Start with this template:

```tsx
import { EditorPlugin } from '@akincand/react-editor';

export const myPlugin: EditorPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  
  toolbarButtons: [],
  commands: [],
  shortcuts: [],
  
  onLoad: (context) => {
    // Initialization code
  },
  
  onUnload: () => {
    // Cleanup code
  }
};
```

## Adding Toolbar Buttons

Create custom toolbar buttons:

```tsx
toolbarButtons: [
  {
    id: 'myButton',
    label: 'Click Me',
    title: 'My Custom Button',
    icon: <span>🎨</span>,
    group: 'custom',
    order: 1,
    onClick: () => {
      console.log('Button clicked!');
    }
  }
]
```

### Button with Active State

The `isActive` function is called automatically when the selection changes to update the button's visual state. Use modern DOM APIs instead of deprecated `document.queryCommandState`.

**Bold Example:**
```tsx
{
  id: 'bold',
  label: 'B',
  title: 'Bold',
  command: 'bold',
  isActive: () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return false;
    const node = selection.anchorNode;
    if (!node) return false;
    const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
    if (!element) return false;
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.fontWeight === '700' || computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight) >= 700;
  },
  group: 'formatting'
}
```

**Heading Example:**
```tsx
{
  id: 'h1',
  label: 'H1',
  title: 'Heading 1',
  command: 'formatBlock',
  value: '<h1>',
  isActive: () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return false;
    const node = selection.anchorNode;
    if (!node) return false;
    const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
    return element?.tagName === 'H1';
  }
}
```

**Alignment Example:**
```tsx
{
  id: 'alignCenter',
  label: 'Center',
  title: 'Align Center',
  command: 'justifyCenter',
  isActive: () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return false;
    const node = selection.anchorNode;
    if (!node) return false;
    const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
    if (!element) return false;
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.textAlign === 'center';
  }
}
```

**List Example:**
```tsx
{
  id: 'bulletList',
  label: '• List',
  title: 'Bullet List',
  command: 'insertUnorderedList',
  isActive: () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return false;
    const node = selection.anchorNode;
    if (!node) return false;
    const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
    if (!element) return false;
    return element.closest('ul') !== null;
  }
}
```

> **Note:** The toolbar automatically updates when the selection changes, so your `isActive` function will be called in real-time to reflect the current formatting state.

### Button with Custom Icon

```tsx
import { ReactComponent as MyIcon } from './my-icon.svg';

{
  id: 'custom',
  icon: <MyIcon className="w-5 h-5" />,
  title: 'Custom Action',
  onClick: handleCustomAction
}
```

## Registering Commands

Add custom commands:

```tsx
commands: [
  {
    name: 'insertSignature',
    execute: (signature: string) => {
      document.execCommand('insertHTML', false, signature);
    },
    canExecute: () => {
      // Return true if command can be executed
      return true;
    }
  }
]
```

### Executing Commands Programmatically

```tsx
onLoad: (context) => {
  // Execute the command
  context.execCommand('insertSignature', '<p>Best regards,<br>John</p>');
}
```

## Keyboard Shortcuts

Add keyboard shortcuts:

```tsx
shortcuts: [
  {
    key: 's',
    ctrlKey: true,
    handler: () => {
      console.log('Ctrl+S pressed - Save!');
    }
  },
  {
    key: 'k',
    ctrlKey: true,
    shiftKey: true,
    handler: () => {
      console.log('Ctrl+Shift+K pressed');
    }
  }
]
```

## Working with Content

### Reading Content

```tsx
onLoad: (context) => {
  const html = context.getContent();
  const editor = context.editor;
  const text = editor.getText();
  
  console.log('HTML:', html);
  console.log('Text:', text);
}
```

### Modifying Content

```tsx
onLoad: (context) => {
  // Set entire content
  context.setContent('<p>New content</p>');
  
  // Insert at cursor
  context.insertContent('<strong>Bold text</strong>');
  
  // Using editor instance
  context.editor.insertHTML('<em>Italic</em>');
}
```

## Lifecycle Hooks

### onLoad

Called when the plugin is loaded:

```tsx
onLoad: (context) => {
  console.log('Plugin loaded');
  
  // Register additional buttons dynamically
  context.registerToolbarButton({
    id: 'dynamic',
    label: 'Dynamic',
    onClick: () => console.log('Dynamic button')
  });
  
  // Register commands
  context.registerCommand({
    name: 'myCommand',
    execute: () => console.log('Executing')
  });
}
```

### onUnload

Called when the plugin is unloaded:

```tsx
onUnload: () => {
  console.log('Plugin unloaded');
  // Cleanup: remove event listeners, clear timers, etc.
}
```

## Real-World Examples

### Image Upload Plugin

```tsx
const imageUploadPlugin: EditorPlugin = {
  name: 'imageUpload',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'uploadImage',
      label: '🖼️',
      title: 'Upload Image',
      group: 'media',
      onClick: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            // Upload file and get URL
            const url = await uploadImage(file);
            
            // Insert image
            document.execCommand(
              'insertImage',
              false,
              url
            );
          }
        };
        
        input.click();
      }
    }
  ]
};

async function uploadImage(file: File): Promise<string> {
  // Implement your upload logic
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return data.url;
}
```

### Table Plugin

```tsx
const tablePlugin: EditorPlugin = {
  name: 'table',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'insertTable',
      label: '📊',
      title: 'Insert Table',
      group: 'insert',
      onClick: () => {
        const rows = prompt('Number of rows:', '3');
        const cols = prompt('Number of columns:', '3');
        
        if (rows && cols) {
          const table = createTable(
            parseInt(rows),
            parseInt(cols)
          );
          document.execCommand('insertHTML', false, table);
        }
      }
    }
  ]
};

function createTable(rows: number, cols: number): string {
  let html = '<table border="1" style="border-collapse: collapse;">';
  
  for (let i = 0; i < rows; i++) {
    html += '<tr>';
    for (let j = 0; j < cols; j++) {
      html += '<td style="padding: 8px; border: 1px solid #ccc;">Cell</td>';
    }
    html += '</tr>';
  }
  
  html += '</table>';
  return html;
}
```

### Code Block Plugin

```tsx
const codeBlockPlugin: EditorPlugin = {
  name: 'codeBlock',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'insertCode',
      label: '</>', 
      title: 'Insert Code Block',
      group: 'insert',
      onClick: () => {
        const code = prompt('Enter code:');
        if (code) {
          const codeBlock = `
            <pre style="background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto;">
              <code>${escapeHtml(code)}</code>
            </pre>
          `;
          document.execCommand('insertHTML', false, codeBlock);
        }
      }
    }
  ],
  
  shortcuts: [
    {
      key: 'e',
      ctrlKey: true,
      shiftKey: true,
      handler: () => {
        // Insert code block shortcut
      }
    }
  ]
};

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### Auto-Save Plugin

```tsx
const autoSavePlugin: EditorPlugin = {
  name: 'autoSave',
  version: '1.0.0',
  
  onLoad: (context) => {
    let saveTimeout: NodeJS.Timeout;
    
    // Auto-save every 30 seconds
    const interval = setInterval(() => {
      const content = context.getContent();
      saveContent(content);
    }, 30000);
    
    // Also save on content change (debounced)
    const originalSetContent = context.setContent;
    context.setContent = (content: string) => {
      originalSetContent(content);
      
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveContent(content);
      }, 2000);
    };
    
    // Cleanup
    return () => {
      clearInterval(interval);
      clearTimeout(saveTimeout);
    };
  }
};

async function saveContent(content: string) {
  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    console.log('Content saved!');
  } catch (error) {
    console.error('Save failed:', error);
  }
}
```

## Best Practices

1. **Name your plugins uniquely** - Use descriptive, unique names
2. **Version your plugins** - Include version numbers for tracking
3. **Clean up resources** - Use `onUnload` to clean up
4. **Group related buttons** - Use the `group` property
5. **Provide tooltips** - Always include `title` for buttons
6. **Handle errors** - Wrap risky operations in try-catch
7. **Document your plugins** - Add JSDoc comments

## TypeScript Tips

Use TypeScript for better development experience:

```tsx
import { EditorPlugin, PluginContext } from '@akincand/react-editor';

interface MyPluginConfig {
  apiKey: string;
  endpoint: string;
}

export function createMyPlugin(config: MyPluginConfig): EditorPlugin {
  return {
    name: 'myPlugin',
    version: '1.0.0',
    
    onLoad: (context: PluginContext) => {
      // Your plugin logic with full type safety
    }
  };
}

// Usage
const plugin = createMyPlugin({
  apiKey: 'xxx',
  endpoint: '/api/data'
});
```

## Next Steps

- Explore [Built-in Plugins](built-in-plugins.md) for inspiration
- Check the [Plugin API Reference](plugin-api.md)
- See [Advanced Examples](../examples/advanced.md)

