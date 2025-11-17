# v1.0.5 - Image Plugin & Enhanced Media Support

We're excited to announce React Editor v1.0.5 with powerful new media features and comprehensive documentation!

## 🎉 What's New

### 🖼️ Image Plugin
Insert images from URLs with a beautiful modal interface:
- Support for .jpg, .png, .gif, .webp, .svg formats
- Alt text for accessibility and SEO
- Optional custom dimensions (width/height)
- Responsive by default (max-width: 100%)
- Intuitive modal UI matching editor theme

```tsx
<Editor plugins={[...defaultPlugins, imagePlugin]} />
```

### 🎬 Enhanced Video Support
Direct video file embedding:
- Support for .mp4, .webm, .ogg video files
- HTML5 video element with native controls
- Works alongside YouTube and Vimeo
- Automatic format detection
- Responsive video player

```tsx
// Now supports direct video URLs
<Editor plugins={defaultPlugins} />
// Add: https://example.com/video.mp4
```

### 🎨 Custom Styling
New `customStyles` prop for complete CSS control:
```tsx
<Editor
  plugins={defaultPlugins}
  customStyles={{
    border: '2px solid #667eea',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  }}
/>
```

### 💅 Modal System Redesign
Beautiful, modern modal interface:
- **Glassmorphism** - Backdrop blur effect
- **Smooth Animations** - Cubic-bezier easing
- **Gradient Buttons** - With ripple effects
- **Fully Responsive** - Desktop, tablet, mobile
- **Bottom Sheet** - Mobile-friendly design
- **Dark Mode** - Complete theme support

### 📚 Complete Documentation
Comprehensive guides with live examples:
- **Examples Overview** - Interactive StackBlitz demos
- **Advanced Examples** - 15+ advanced patterns
- **Custom Plugin Guide** - Build your own plugins
- **Next.js Integration** - App Router & Pages Router
- **Custom Styling Guide** - Design system examples

## 🎮 Try It Live

Experience React Editor in action:

**StackBlitz Demo**: https://stackblitz.com/edit/rich-react-editor

**GitBook Documentation**: https://kuardscreative.gitbook.io/react-editor

## 📦 Installation

```bash
npm install @akincand/react-editor
```

Or with yarn:

```bash
yarn add @akincand/react-editor
```

## 🚀 Quick Start

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor 
      plugins={defaultPlugins}
      showSourceButton={true}
      debugConsole={false}
    />
  );
}
```

## ✨ Features Showcase

### Image Insertion
```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return <Editor plugins={defaultPlugins} />;
}
// Click the Image button in toolbar
// Enter: https://example.com/image.jpg
// Add alt text for accessibility
// Optionally set custom dimensions
```

### Video Embedding
```tsx
// Supports multiple video sources:

// 1. YouTube
https://www.youtube.com/watch?v=dQw4w9WgXcQ

// 2. Vimeo
https://vimeo.com/123456789

// 3. Direct video files
https://example.com/video.mp4
https://example.com/video.webm
https://example.com/video.ogg
```

### Custom Styling
```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

// Glassmorphism
<Editor
  plugins={defaultPlugins}
  customStyles={{
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
  }}
/>

// Neumorphic
<Editor
  plugins={defaultPlugins}
  customStyles={{
    background: '#e0e5ec',
    border: 'none',
    borderRadius: '20px',
    boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
  }}
/>

// Gradient Border
<Editor
  plugins={defaultPlugins}
  customStyles={{
    border: '3px solid transparent',
    borderRadius: '16px',
    backgroundImage: `
      linear-gradient(white, white),
      linear-gradient(135deg, #667eea 0%, #764ba2 100%)
    `,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  }}
/>
```

## 🔧 All Props

```tsx
interface EditorConfig {
  // Content
  placeholder?: string;
  defaultContent?: string;
  readOnly?: boolean;
  
  // Appearance
  theme?: { mode: 'light' | 'dark' };
  customStyles?: React.CSSProperties;
  className?: string;
  
  // Dimensions
  height?: string | number;
  maxHeight?: string | number;
  minHeight?: string | number;
  
  // Features
  plugins?: EditorPlugin[];
  toolbar?: ToolbarButton[];
  showSourceButton?: boolean;
  debugConsole?: boolean;
  autoFocus?: boolean;
  spellCheck?: boolean;
  
  // Events
  onChange?: (content: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onReady?: (editor: EditorInstance) => void;
}
```

## 📊 Bundle Size

Optimized for performance:
- **Minified**: ~48 KB
- **Gzipped**: ~15 KB
- **Zero dependencies** (React as peer)
- Tree-shakeable plugins

## 🎯 Built-in Plugins

All available by default:

1. **basicFormattingPlugin** - Bold, Italic, Underline, Strikethrough
2. **headingsPlugin** - H1, H2, H3, H4, H5, H6
3. **listsPlugin** - Ordered & Unordered Lists
4. **alignmentPlugin** - Left, Center, Right, Justify
5. **linksPlugin** - Insert & Remove Links
6. **videoPlugin** - YouTube, Vimeo, Direct Videos
7. **imagePlugin** - ✨ NEW - Image Insertion

```tsx
import { 
  Editor, 
  defaultPlugins,
  // Or import individually:
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin,
  alignmentPlugin,
  linksPlugin,
  videoPlugin,
  imagePlugin
} from '@akincand/react-editor';
```

## 🐛 Bug Fixes

### Video Embedding
- ✅ Fixed videos not inserting into editor
- ✅ Removed whitespace from HTML strings
- ✅ Improved selection handling
- ✅ Videos insert at end when no selection

### Modal UI
- ✅ Fixed responsiveness issues
- ✅ Better input field styling
- ✅ Improved button hover states
- ✅ Fixed footer background colors
- ✅ Better spacing across breakpoints

## 💡 Examples

### Basic Usage
```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return <Editor plugins={defaultPlugins} />;
}
```

### With State Management
```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('');

  return (
    <>
      <Editor 
        plugins={defaultPlugins}
        onChange={setContent}
      />
      <div>Characters: {content.length}</div>
    </>
  );
}
```

### With Dark Mode
```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <>
      <button onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
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

### Next.js Integration
```tsx
'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@akincand/react-editor').then(mod => mod.Editor),
  { ssr: false }
);

export default function Page() {
  return <Editor plugins={defaultPlugins} />;
}
```

## 📖 Documentation

### New Pages
- [Custom Styling Guide](https://kuardscreative.gitbook.io/react-editor/customization/custom-styling)
- [Examples Overview](https://kuardscreative.gitbook.io/react-editor/examples)
- [Advanced Examples](https://kuardscreative.gitbook.io/react-editor/examples/advanced)
- [Custom Plugin Guide](https://kuardscreative.gitbook.io/react-editor/examples/custom-plugin)
- [Next.js Integration](https://kuardscreative.gitbook.io/react-editor/examples/nextjs)

### Updated Pages
- Image Plugin Documentation
- Video Plugin Documentation
- Configuration Reference
- Modal Component Guide

## 🔗 Links

- **npm**: https://www.npmjs.com/package/@akincand/react-editor
- **GitHub**: https://github.com/AkincanD/react-editor
- **Documentation**: https://kuardscreative.gitbook.io/react-editor
- **Live Demo**: https://stackblitz.com/edit/rich-react-editor

## 🙏 Credits

Built with ❤️ by [AkincanD](https://github.com/AkincanD)

## 📝 Changelog

See [CHANGELOG.md](https://github.com/AkincanD/react-editor/blob/main/CHANGELOG.md) for a complete list of changes.

## 🚀 What's Next?

Upcoming features:
- Table plugin
- Image upload support
- Drag & drop
- Collaborative editing
- Mobile toolbar optimization

## 💬 Feedback

Have feedback or suggestions? 
- Open an [issue](https://github.com/AkincanD/react-editor/issues)
- Start a [discussion](https://github.com/AkincanD/react-editor/discussions)
- Star the repo if you like it! ⭐

---

**Full Changelog**: https://github.com/AkincanD/react-editor/compare/v1.0.4...v1.0.5

