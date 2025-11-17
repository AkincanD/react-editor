# React Editor

A powerful, extensible, and beautiful rich text editor for React with TypeScript support.

[![npm version](https://badge.fury.io/js/@akincand%2Freact-editor.svg)](https://badge.fury.io/js/@akincand%2Freact-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Beautiful UI** - Modern, clean interface with light and dark themes
- 🔌 **Extensible Plugin System** - Easy to create and integrate custom plugins
- 📱 **Fully Responsive** - Works seamlessly on all screen sizes
- 🎯 **TypeScript Support** - Full type definitions included
- ⚛️ **React 18+ Compatible** - Built for modern React applications
- 🌙 **Dark Mode** - Built-in theme switching support
- 💅 **Pure CSS** - No external CSS framework required (33% smaller bundle)
- 🔗 **Link Insertion** - Beautiful modal interface for adding links
- 🎥 **Video Embedding** - Easy YouTube & Vimeo video embedding
- 👁️ **View Source** - Toggle between visual and HTML source code modes
- 🐛 **Debug Console** - Advanced debugging tools for development
- ⚡ **Next.js Ready** - Perfect integration with Next.js
- 📦 **Lightweight** - Minimal dependencies, optimized bundle size

## 📦 Installation

```bash
npm install @akincand/react-editor
```

## 🚀 Quick Start

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

## 📚 Documentation

**For complete documentation, examples, and guides, visit:**

👉 **[https://kuardscreative.gitbook.io/react-editor](https://kuardscreative.gitbook.io/react-editor)**

### Quick Links

- [Getting Started](https://kuardscreative.gitbook.io/react-editor/getting-started)
- [Installation Guide](https://kuardscreative.gitbook.io/react-editor/installation)
- [Basic Usage](https://kuardscreative.gitbook.io/react-editor/basic-usage)
- [Configuration](https://kuardscreative.gitbook.io/react-editor/configuration)
- [Plugin System](https://kuardscreative.gitbook.io/react-editor/plugins)
- [API Reference](https://kuardscreative.gitbook.io/react-editor/api-reference)
- [Examples](https://kuardscreative.gitbook.io/react-editor/examples)

## 🎯 Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `plugins` | `EditorPlugin[]` | `[]` | Array of plugins to enable |
| `placeholder` | `string` | `"Start typing..."` | Placeholder text |
| `theme` | `{ mode: 'light' \| 'dark' }` | `{ mode: 'light' }` | Editor theme |
| `showSourceButton` | `boolean` | `false` | Show HTML source toggle |
| `debugConsole` | `boolean` | `false` | Enable debug logging |
| `onChange` | `(content: string) => void` | - | Content change handler |
| `onReady` | `(editor: EditorInstance) => void` | - | Editor ready callback |

[See full API documentation →](https://kuardscreative.gitbook.io/react-editor/api-reference)

## 🔌 Built-in Plugins

```tsx
import { 
  basicFormattingPlugin,  // Bold, Italic, Underline, Strikethrough
  headingsPlugin,         // H1, H2, H3, Paragraph
  listsPlugin,           // Bullet and numbered lists
  alignmentPlugin,       // Text alignment
  linksPlugin,           // Links with modal interface
  videoPlugin,           // YouTube & Vimeo video embedding
  defaultPlugins         // All plugins combined
} from '@akincand/react-editor';
```

### Features by Plugin

- **Basic Formatting**: Bold, Italic, Underline, Strikethrough
- **Headings**: H1, H2, H3, Paragraph
- **Lists**: Bullet List, Numbered List
- **Alignment**: Left, Center, Right, Justify
- **Links**: Modal-based link insertion with custom text
- **Videos**: Responsive video embedding (YouTube & Vimeo)

[Learn more about plugins →](https://kuardscreative.gitbook.io/react-editor/plugins)

## 🎨 Theming

```tsx
<Editor
  theme={{ mode: 'dark' }}
  plugins={defaultPlugins}
/>
```

[Theming guide →](https://kuardscreative.gitbook.io/react-editor/theming)

## 🔍 View Source

```tsx
<Editor
  plugins={defaultPlugins}
  showSourceButton={true}  // Enable HTML source viewer
/>
```

## 🐛 Debug Mode

```tsx
<Editor
  plugins={defaultPlugins}
  debugConsole={true}  // Enable debug logging
/>
```

[Debugging guide →](https://kuardscreative.gitbook.io/react-editor/debugging)

## 💡 Examples

### Next.js Integration

```tsx
'use client';

import { Editor, defaultPlugins } from '@akincand/react-editor';

export default function EditorPage() {
  return (
    <Editor
      plugins={defaultPlugins}
      theme={{ mode: 'dark' }}
    />
  );
}
```

### Custom Plugin

```tsx
import { EditorPlugin } from '@akincand/react-editor';

const myPlugin: EditorPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  onLoad: (context) => {
    console.log('Plugin loaded!');
  }
};

<Editor plugins={[...defaultPlugins, myPlugin]} />
```

[More examples →](https://kuardscreative.gitbook.io/react-editor/examples)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [AkincanD](https://github.com/AkincanD)

## 🔗 Links

- **Documentation**: [https://kuardscreative.gitbook.io/react-editor](https://kuardscreative.gitbook.io/react-editor)
- **npm Package**: [https://www.npmjs.com/package/@akincand/react-editor](https://www.npmjs.com/package/@akincand/react-editor)
- **GitHub**: [https://github.com/AkincanD/react-editor](https://github.com/AkincanD/react-editor)
- **Issues**: [https://github.com/AkincanD/react-editor/issues](https://github.com/AkincanD/react-editor/issues)

## 🌟 Support

If you find this project helpful, please give it a ⭐️ on [GitHub](https://github.com/AkincanD/react-editor)!

---

**Made with ❤️ by [AkincanD](https://github.com/AkincanD)**
