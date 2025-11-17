# React Editor

A powerful, extensible, and beautiful rich text editor for React with TypeScript support.

[![npm version](https://badge.fury.io/js/@akincand%2Freact-editor.svg)](https://badge.fury.io/js/@akincand%2Freact-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Beautiful UI** - Modern, clean interface with light and dark themes
- 🔌 **Extensible Plugin System** - Easy to create and integrate custom plugins
- 📱 **Responsive Design** - Works seamlessly on all screen sizes
- 🎯 **TypeScript Support** - Full type definitions included
- ⚛️ **React 18+ Compatible** - Built for modern React applications
- 🌙 **Dark Mode** - Built-in theme switching support
- 🎨 **Modern CSS** - Beautiful, responsive design with pure CSS
- ⚡ **Next.js Compatible** - Works perfectly with Next.js applications
- 📦 **Lightweight** - Minimal dependencies, optimized bundle size
- 🔧 **Customizable** - Extensive configuration options

## 📦 Installation

```bash
npm install @akincand/react-editor
```

or with yarn:

```bash
yarn add @akincand/react-editor
```

or with pnpm:

```bash
pnpm add @akincand/react-editor
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      placeholder="Start typing..."
      onChange={(content) => console.log(content)}
    />
  );
}
```

### With Custom Configuration

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const handleChange = (content: string) => {
    console.log('Content changed:', content);
  };

  return (
    <Editor
      plugins={defaultPlugins}
      placeholder="Write something amazing..."
      defaultContent="<p>Initial content</p>"
      theme={{ mode: 'dark' }}
      height="500px"
      autoFocus
      onChange={handleChange}
      onReady={(editor) => {
        console.log('Editor is ready!', editor);
      }}
    />
  );
}
```

### With View Source Button

Enable the HTML source code viewer to toggle between visual and code modes:

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      showSourceButton={true}  // Enable source code toggle
      placeholder="Start typing..."
      onChange={(content) => console.log(content)}
    />
  );
}
```

## 🎨 Themes

### Light and Dark Mode

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <Editor
        plugins={defaultPlugins}
        theme={{ mode: theme }}
      />
    </>
  );
}
```

### Using the Theme Hook

```tsx
import { Editor, useEditorTheme } from '@akincand/react-editor';

function EditorWithThemeToggle() {
  return (
    <Editor plugins={defaultPlugins}>
      <ThemeToggleButton />
    </Editor>
  );
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useEditorTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme.mode}
    </button>
  );
}
```

## 🔌 Built-in Plugins

The library comes with several built-in plugins:

- **basicFormattingPlugin** - Bold, italic, underline, strikethrough
- **headingsPlugin** - H1, H2, H3, paragraph formatting
- **listsPlugin** - Bullet and numbered lists
- **alignmentPlugin** - Text alignment (left, center, right, justify)
- **linksPlugin** - Create and remove hyperlinks

### Using Individual Plugins

```tsx
import { Editor, basicFormattingPlugin, headingsPlugin } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={[basicFormattingPlugin, headingsPlugin]}
    />
  );
}
```

## 🛠️ Creating Custom Plugins

Creating custom plugins is straightforward:

```tsx
import { EditorPlugin } from '@akincand/react-editor';

const myCustomPlugin: EditorPlugin = {
  name: 'myCustomPlugin',
  version: '1.0.0',
  
  // Add toolbar buttons
  toolbarButtons: [
    {
      id: 'customButton',
      label: 'Custom',
      title: 'My Custom Button',
      group: 'custom',
      order: 1,
      onClick: () => {
        alert('Custom button clicked!');
      }
    }
  ],
  
  // Add custom commands
  commands: [
    {
      name: 'myCommand',
      execute: (value) => {
        console.log('Executing custom command:', value);
      },
      canExecute: () => true
    }
  ],
  
  // Keyboard shortcuts
  shortcuts: [
    {
      key: 'k',
      ctrlKey: true,
      handler: () => {
        console.log('Ctrl+K pressed!');
      }
    }
  ],
  
  // Called when plugin is loaded
  onLoad: (context) => {
    console.log('Plugin loaded!', context);
  },
  
  // Called when plugin is unloaded
  onUnload: () => {
    console.log('Plugin unloaded!');
  }
};

// Use the plugin
function App() {
  return (
    <Editor plugins={[myCustomPlugin]} />
  );
}
```

## 🎯 Advanced Usage

### Access Editor Instance

```tsx
import { Editor, EditorInstance } from '@akincand/react-editor';
import { useRef } from 'react';

function App() {
  const editorRef = useRef<EditorInstance | null>(null);

  const handleReady = (editor: EditorInstance) => {
    editorRef.current = editor;
  };

  const insertContent = () => {
    if (editorRef.current) {
      editorRef.current.insertHTML('<p>New paragraph</p>');
    }
  };

  return (
    <>
      <button onClick={insertContent}>Insert Content</button>
      <Editor onReady={handleReady} />
    </>
  );
}
```

### Custom Toolbar

```tsx
import { Editor, ToolbarButton } from '@akincand/react-editor';

function App() {
  const customToolbar: ToolbarButton[] = [
    {
      id: 'bold',
      label: 'B',
      command: 'bold',
      group: 'formatting'
    },
    {
      id: 'italic',
      label: 'I',
      command: 'italic',
      group: 'formatting'
    }
  ];

  return (
    <Editor toolbar={customToolbar} />
  );
}
```

## 🔧 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `placeholder` | `string` | `"Start typing..."` | Placeholder text |
| `defaultContent` | `string` | `""` | Initial HTML content |
| `readOnly` | `boolean` | `false` | Make editor read-only |
| `theme` | `EditorTheme` | `{ mode: 'light' }` | Theme configuration |
| `plugins` | `EditorPlugin[]` | `[]` | Array of plugins |
| `toolbar` | `ToolbarButton[]` | `undefined` | Custom toolbar buttons |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `spellCheck` | `boolean` | `true` | Enable spell checking |
| `height` | `string \| number` | `undefined` | Editor height |
| `maxHeight` | `string \| number` | `undefined` | Maximum height |
| `minHeight` | `string \| number` | `"300px"` | Minimum height |
| `className` | `string` | `""` | Additional CSS class |
| `onChange` | `(content: string) => void` | `undefined` | Content change callback |
| `onBlur` | `() => void` | `undefined` | Blur event callback |
| `onFocus` | `() => void` | `undefined` | Focus event callback |
| `onReady` | `(editor: EditorInstance) => void` | `undefined` | Editor ready callback |

## 🌐 Next.js Integration

### App Router (Next.js 13+)

```tsx
'use client';

import { Editor, defaultPlugins } from 'react-editor';

export default function EditorPage() {
  return (
    <div className="container mx-auto p-4">
      <Editor plugins={defaultPlugins} />
    </div>
  );
}
```

### Pages Router

```tsx
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@akincand/react-editor').then((mod) => mod.Editor),
  { ssr: false }
);

export default function EditorPage() {
  return <Editor plugins={defaultPlugins} />;
}
```

## 📱 Responsive Design

The editor is fully responsive and works great on mobile devices. The toolbar automatically adjusts for smaller screens.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © [AkincanD](https://github.com/AkincanD)

## 🔗 Links

- [Documentation](https://github.com/AkincanD/react-editor/docs)
- [Examples](https://github.com/AkincanD/react-editor/examples)
- [GitHub](https://github.com/AkincanD/react-editor)
- [npm](https://www.npmjs.com/package/@akincand/react-editor)

## 💖 Support

If you find this library useful, please consider giving it a ⭐️ on GitHub!

## 👨‍💻 Author

**AkincanD**

- GitHub: [@AkincanD](https://github.com/AkincanD)

---

Made with ❤️ by AkincanD

