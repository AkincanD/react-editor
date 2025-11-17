# Configuration

Complete configuration guide for React Editor.

## Overview

React Editor can be configured through props, plugins, and custom styling.

## Editor Configuration

### Basic Configuration

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      // Content
      placeholder="Start typing..."
      defaultContent="<p>Hello World!</p>"
      
      // Behavior
      readOnly={false}
      autoFocus={true}
      spellCheck={true}
      
      // Plugins
      plugins={defaultPlugins}
      
      // Theme
      theme={{ mode: 'light' }}
      
      // Sizing
      height="600px"
      minHeight="300px"
      maxHeight="1000px"
      
      // Events
      onChange={(content) => console.log(content)}
      onFocus={() => console.log('Focused')}
      onBlur={() => console.log('Blurred')}
      onReady={(editor) => console.log('Ready', editor)}
    />
  );
}
```

## Theme Configuration

### Light Mode

```tsx
<Editor
  theme={{
    mode: 'light'
  }}
/>
```

### Dark Mode

```tsx
<Editor
  theme={{
    mode: 'dark'
  }}
/>
```

### Custom Colors

```tsx
<Editor
  theme={{
    mode: 'dark',
    colors: {
      background: '#1a1a1a',
      text: '#ffffff',
      border: '#333333',
      toolbar: '#2a2a2a',
      hover: '#3a3a3a'
    }
  }}
/>
```

### Dynamic Theme Switching

```tsx
import { useState } from 'react';
import { Editor } from '@akincand/react-editor';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Theme
      </button>
      <Editor
        theme={{ mode: isDark ? 'dark' : 'light' }}
      />
    </>
  );
}
```

### System Theme Detection

```tsx
import { useEffect, useState } from 'react';
import { Editor } from '@akincand/react-editor';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return <Editor theme={{ mode: theme }} />;
}
```

## Plugin Configuration

### Using Default Plugins

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

<Editor plugins={defaultPlugins} />
```

### Selecting Specific Plugins

```tsx
import { 
  Editor,
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin
} from '@akincand/react-editor';

<Editor
  plugins={[
    basicFormattingPlugin,
    headingsPlugin,
    listsPlugin
  ]}
/>
```

### Adding Custom Plugins

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';
import { myCustomPlugin } from './my-plugin';

<Editor
  plugins={[
    ...defaultPlugins,
    myCustomPlugin
  ]}
/>
```

### Plugin Options

Some plugins may accept configuration:

```tsx
import { EditorPlugin } from '@akincand/react-editor';

function createCustomPlugin(options: { apiKey: string }): EditorPlugin {
  return {
    name: 'customPlugin',
    onLoad: (context) => {
      console.log('API Key:', options.apiKey);
    }
  };
}

// Usage
<Editor
  plugins={[
    createCustomPlugin({ apiKey: 'your-key' })
  ]}
/>
```

## Toolbar Configuration

### Custom Toolbar Buttons

```tsx
import { Editor, ToolbarButton } from '@akincand/react-editor';

const customToolbar: ToolbarButton[] = [
  {
    id: 'bold',
    label: 'B',
    title: 'Bold',
    command: 'bold',
    group: 'formatting',
    order: 1
  },
  {
    id: 'italic',
    label: 'I',
    title: 'Italic',
    command: 'italic',
    group: 'formatting',
    order: 2
  }
];

<Editor toolbar={customToolbar} />
```

### Toolbar Groups

Organize buttons into groups:

```tsx
const toolbar: ToolbarButton[] = [
  // Formatting group
  { id: 'bold', label: 'B', group: 'formatting', order: 1 },
  { id: 'italic', label: 'I', group: 'formatting', order: 2 },
  
  // Structure group
  { id: 'h1', label: 'H1', group: 'structure', order: 10 },
  { id: 'h2', label: 'H2', group: 'structure', order: 11 },
  
  // Insert group
  { id: 'link', label: 'Link', group: 'insert', order: 20 },
  { id: 'image', label: 'Image', group: 'insert', order: 21 }
];
```

### Hide Toolbar

```tsx
<Editor toolbar={[]} />
```

## Sizing Configuration

### Fixed Height

```tsx
<Editor height="500px" />
```

### Min/Max Height

```tsx
<Editor
  minHeight="200px"
  maxHeight="800px"
/>
```

### Responsive Height

```tsx
<Editor
  height="50vh"
  minHeight="300px"
  maxHeight="90vh"
/>
```

### Full Width

```tsx
<Editor style={{ width: '100%' }} />
```

## Event Handlers

### Content Changes

```tsx
<Editor
  onChange={(content) => {
    console.log('Content:', content);
    console.log('Length:', content.length);
  }}
/>
```

### Focus Events

```tsx
<Editor
  onFocus={() => {
    console.log('Editor focused');
    // Show formatting toolbar
  }}
  onBlur={() => {
    console.log('Editor blurred');
    // Auto-save content
  }}
/>
```

### Editor Ready

```tsx
import { useRef } from 'react';
import { EditorInstance } from '@akincand/react-editor';

function App() {
  const editorRef = useRef<EditorInstance | null>(null);

  return (
    <Editor
      onReady={(editor) => {
        editorRef.current = editor;
        console.log('Editor is ready!');
        
        // Perform initial setup
        editor.focus();
      }}
    />
  );
}
```

## Advanced Configuration

### Read-Only Mode

```tsx
<Editor
  readOnly={true}
  defaultContent="<p>This content is read-only</p>"
/>
```

### Spell Checking

```tsx
// Enable
<Editor spellCheck={true} />

// Disable
<Editor spellCheck={false} />
```

### Auto Focus

```tsx
<Editor autoFocus={true} />
```

### Custom Placeholder

```tsx
<Editor
  placeholder="Write your story here..."
/>
```

### Custom CSS Classes

```tsx
<Editor
  className="my-custom-editor"
/>
```

Then in your CSS:

```css
.my-custom-editor {
  border: 2px solid #4F46E5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Performance Configuration

### Debounced onChange

For better performance with large documents:

```tsx
import { useCallback, useRef } from 'react';
import { Editor } from '@akincand/react-editor';

function App() {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleChange = useCallback((content: string) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      console.log('Saving:', content);
      // Save to backend
    }, 1000);
  }, []);

  return <Editor onChange={handleChange} />;
}
```

### Lazy Loading Plugins

```tsx
import { useState, useEffect } from 'react';
import { Editor, EditorPlugin } from '@akincand/react-editor';

function App() {
  const [plugins, setPlugins] = useState<EditorPlugin[]>([]);

  useEffect(() => {
    // Load plugins dynamically
    import('./my-plugins').then((module) => {
      setPlugins(module.plugins);
    });
  }, []);

  return <Editor plugins={plugins} />;
}
```

## Next.js Configuration

### App Router

```tsx
'use client';

import { Editor, defaultPlugins } from '@akincand/react-editor';

export default function EditorPage() {
  return (
    <Editor plugins={defaultPlugins} />
  );
}
```

### Pages Router

```tsx
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@akincand/react-editor').then(mod => mod.Editor),
  { ssr: false }
);

export default function EditorPage() {
  return <Editor />;
}
```

## TypeScript Configuration

### Strict Type Checking

```tsx
import { Editor, EditorConfig, EditorInstance } from '@akincand/react-editor';

const config: EditorConfig = {
  placeholder: 'Type here...',
  defaultContent: '<p>Hello</p>',
  height: '500px',
  onChange: (content: string) => {
    console.log(content);
  }
};

function App() {
  return <Editor {...config} />;
}
```

### Custom Plugin Types

```tsx
import { EditorPlugin, PluginContext } from '@akincand/react-editor';

interface MyPluginConfig {
  apiKey: string;
  endpoint: string;
}

function createMyPlugin(config: MyPluginConfig): EditorPlugin {
  return {
    name: 'myPlugin',
    onLoad: (context: PluginContext) => {
      // Type-safe plugin implementation
    }
  };
}
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_EDITOR_THEME=dark
NEXT_PUBLIC_EDITOR_AUTOSAVE=true
```

```tsx
<Editor
  theme={{ 
    mode: process.env.NEXT_PUBLIC_EDITOR_THEME as 'light' | 'dark' 
  }}
/>
```

## Best Practices

1. **Always provide a placeholder** for better UX
2. **Use debounced onChange** for auto-save
3. **Implement error boundaries** around the editor
4. **Load plugins conditionally** based on user needs
5. **Use TypeScript** for type safety
6. **Test with different content sizes** for performance
7. **Implement undo/redo** using editor instance methods

## Next Steps

- [Theming Guide](theming.md)
- [Plugin Development](plugins/creating-plugins.md)
- [API Reference](api-reference.md)

