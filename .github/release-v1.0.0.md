# 🎉 React Editor v1.0.0 - Initial Release

**Release Date:** November 17, 2025

We're excited to announce the first stable release of **React Editor** - a powerful, extensible, and beautiful rich text editor for React applications!

## ✨ Features

### Core Components
- **Editor Component** - Main editor with full rich text editing capabilities
- **Toolbar Component** - Customizable toolbar with button groups
- **Status Bar** - Live word count, character count, and custom statistics
- **Editor Content** - Editable content area with placeholder support

### Plugin System
- **Extensible Architecture** - Easy-to-use plugin API for custom functionality
- **Plugin Context** - Access to editor instance and commands
- **Lifecycle Hooks** - `onLoad` and `onUnload` callbacks
- **Custom Commands** - Register and execute custom commands
- **Keyboard Shortcuts** - Define custom keyboard shortcuts

### Built-in Plugins
- 📝 **Basic Formatting** - Bold, Italic, Underline, Strikethrough
- 📑 **Headings** - H1, H2, H3, Paragraph formatting
- 📋 **Lists** - Bullet and Numbered lists
- ↔️ **Alignment** - Left, Center, Right, Justify
- 🔗 **Links** - Create and remove hyperlinks

### Theming
- 🌞 **Light Mode** - Clean, professional light theme
- 🌙 **Dark Mode** - Eye-friendly dark theme
- 🎨 **Custom Themes** - Define your own color schemes
- 🔄 **Theme Switching** - Runtime theme switching with hook

### Developer Experience
- 📘 **TypeScript Support** - Full type definitions included
- 🔧 **React 18+** - Built for modern React
- ⚡ **Next.js Compatible** - Works with App Router and Pages Router
- 📱 **Responsive Design** - Mobile-first, works on all screen sizes
- 🎨 **TailwindCSS** - Built with utility-first CSS framework

### Documentation
- 📖 **Comprehensive Guides** - Getting started, configuration, and API docs
- 🎓 **Plugin Development** - Complete guide to creating custom plugins
- 💡 **Examples** - Basic usage, custom plugins, and Next.js integration
- 📚 **GitBook Ready** - Structured documentation ready for GitBook

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
      theme={{ mode: 'light' }}
    />
  );
}
```

## 📖 Examples

### Basic Example
```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

<Editor plugins={defaultPlugins} />
```

### With Theme Switching
```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <Editor plugins={defaultPlugins} theme={{ mode: theme }} />
    </>
  );
}
```

### Custom Plugin
```tsx
import { Editor, EditorPlugin, defaultPlugins } from '@akincand/react-editor';

const myPlugin: EditorPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  toolbarButtons: [{
    id: 'custom',
    label: 'Custom',
    onClick: () => console.log('Custom button clicked!')
  }]
};

<Editor plugins={[...defaultPlugins, myPlugin]} />
```

## 🔗 Links

- **Documentation:** [docs](https://github.com/AkincanD/react-editor/tree/main/docs)
- **Examples:** [examples](https://github.com/AkincanD/react-editor/tree/main/examples)
- **GitHub:** https://github.com/AkincanD/react-editor
- **npm:** https://www.npmjs.com/package/@akincand/react-editor

## 📝 What's Included

```
@akincand/react-editor@1.0.0
├── Core Components
│   ├── Editor
│   ├── Toolbar
│   ├── EditorContent
│   └── StatusBar
├── Built-in Plugins
│   ├── basicFormattingPlugin
│   ├── headingsPlugin
│   ├── listsPlugin
│   ├── alignmentPlugin
│   └── linksPlugin
├── Context & Hooks
│   ├── EditorProvider
│   ├── useEditor
│   └── useEditorTheme
└── TypeScript Types
    ├── EditorPlugin
    ├── ToolbarButton
    ├── EditorCommand
    └── ... more
```

## 🎯 Use Cases

- **Blog Editors** - Rich text editing for blog posts
- **CMS Systems** - Content management interfaces
- **Note Taking Apps** - Feature-rich note editors
- **Email Composers** - HTML email editing
- **Documentation** - In-app documentation editors
- **Comments** - Rich text comments in apps

## 🌟 Highlights

- ✅ Zero external dependencies for runtime
- ✅ Tree-shakeable for optimal bundle size
- ✅ Fully customizable toolbar
- ✅ Extensive plugin API
- ✅ Mobile-friendly touch interactions
- ✅ Keyboard shortcuts support
- ✅ Accessibility friendly
- ✅ Production ready

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/AkincanD/react-editor/blob/main/CONTRIBUTING.md) for details.

## 📄 License

MIT © [AkincanD](https://github.com/AkincanD)

---

## 🙏 Thank You

Thank you for trying React Editor! If you find it useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📖 Improving documentation
- 🔌 Creating plugins

**Built with ❤️ by AkincanD**

