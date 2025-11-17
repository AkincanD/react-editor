# React Editor v1.0.2

## 🎨 Pure CSS Migration & View Source Feature

This major update removes TailwindCSS dependency, migrates to pure CSS, and introduces a powerful View Source feature for HTML editing!

## 🔧 Breaking Changes

- **Removed TailwindCSS dependency**: The editor now uses pure CSS with scoped class names (prefixed with `reactEditor_`)
- No configuration changes required for users - the editor will work exactly the same way
- If you were relying on TailwindCSS classes for customization, you'll need to use custom CSS instead

## ✨ What's New

### 1. View Source Feature 🎯

Toggle between visual editor and HTML source code:

- **HTML Source Code Viewer**: View and edit raw HTML directly
- **Bidirectional Editing**: Changes sync automatically in both modes
- **Monospace Font**: Code-friendly font for better readability
- **Optional Feature**: Enable with `showSourceButton` prop (default: `false`)
- **Responsive Design**: Works perfectly on mobile and desktop

### 2. Performance Improvements 🚀

- Fixed plugin duplicate registration warnings
- Eliminated unnecessary re-renders in EditorContext
- Optimized component lifecycle
- Plugins now initialize only once

### 3. CSS Rewrite 💅

- All styles rewritten with modern, scoped CSS
- Class names prefixed with `reactEditor_` to avoid conflicts
- CSS variables for easy theming
- Better responsive design with mobile-first approach
- Improved dark mode implementation

### 4. Bundle Size Reduction 📦

- Removed TailwindCSS (~50KB)
- Removed autoprefixer dependency
- **33% smaller bundle size!**

## 🐛 Bug Fixes

- Fixed "Plugin X is already registered" console warnings
- Fixed excessive re-renders causing performance issues
- Improved plugin initialization logic

## 📚 Documentation Updates

- Updated all documentation to reflect pure CSS implementation
- Removed TailwindCSS configuration references
- Added new CSS customization examples
- Updated theming guide
- Added View Source feature documentation

## 🎨 CSS Architecture

All CSS classes now follow the pattern: `reactEditor_[component]`

Examples:
- `reactEditor_container` - Main editor container
- `reactEditor_toolbar` - Toolbar component
- `reactEditor_toolbarButton` - Toolbar buttons
- `reactEditor_content` - Content area
- `reactEditor_contentEditable` - Editable content
- `reactEditor_sourceView` - Source code view
- `reactEditor_statusBar` - Status bar

## 📦 Installation

```bash
npm install @akincand/react-editor@1.0.2
```

## 🔄 Upgrading from 1.0.0/1.0.1

Simply update the package version - no code changes required:

```bash
npm update @akincand/react-editor
```

**Note**: If you were using TailwindCSS classes for customization, you'll need to update your custom styles to use regular CSS instead.

## 📖 Examples

### Basic Usage

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      placeholder="Start typing..."
      theme={{ mode: 'dark' }}
    />
  );
}
```

### With View Source Button

Enable HTML source code viewer:

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

### Advanced Usage

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('<p>Initial content</p>');

  return (
    <div>
      <Editor
        plugins={defaultPlugins}
        showSourceButton={true}
        defaultContent={content}
        theme={{ mode: 'dark' }}
        height="600px"
        onChange={setContent}
        onReady={(editor) => console.log('Editor ready!', editor)}
      />
      
      <div>
        <h3>Content Length:</h3>
        <p>{content.length} characters</p>
      </div>
    </div>
  );
}
```

### Custom Styling (New Way)

```tsx
<Editor
  className="my-custom-editor"
  plugins={defaultPlugins}
/>
```

```css
.my-custom-editor {
  border: 2px solid #3b82f6;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## 🌟 Features

### Core Features
- ✅ Pure CSS (no external framework required)
- ✅ Scoped class names to avoid conflicts
- ✅ Better performance
- ✅ Smaller bundle size
- ✅ Improved dark mode
- ✅ Fully responsive
- ✅ Mobile-first design
- ✅ CSS variables for easy theming

### View Source Features
- ✅ HTML source code viewing and editing
- ✅ Toggle between visual ↔ source mode
- ✅ Automatic synchronization
- ✅ Monospace font for code
- ✅ Syntax-friendly view
- ✅ Works in read-only mode
- ✅ Responsive design
- ✅ Dark/light theme support

## 📊 Bundle Size Comparison

- **v1.0.1**: ~180KB (with TailwindCSS)
- **v1.0.2**: ~120KB (pure CSS) - **33% smaller!**

## 🎯 Use Cases for View Source

### 1. HTML Learning
Show students how visual changes translate to HTML code.

### 2. Developer Debugging
Inspect generated HTML to identify issues quickly.

### 3. Manual HTML Editing
Advanced users can edit HTML directly.

### 4. Code Review
Quickly view the source code of created content.

## 📝 New Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showSourceButton` | `boolean` | `false` | Shows view source toggle button in toolbar |

## 🖼️ Visual

The View Source button appears on the right side of the toolbar:
- **Visual Mode**: Shows `</>` icon
- **Source Mode**: Shows text editor icon
- Active mode is highlighted

## 🙏 Thank You

Thank you for using React Editor! If you encounter any issues, please report them on [GitHub](https://github.com/AkincanD/react-editor/issues).

## 📚 Resources

- [Documentation](https://akincand.github.io/react-editor/)
- [GitHub Repository](https://github.com/AkincanD/react-editor)
- [npm Package](https://www.npmjs.com/package/@akincand/react-editor)
- [Examples](https://github.com/AkincanD/react-editor/tree/main/examples)
- [API Reference](https://akincand.github.io/react-editor/#/api-reference)

---

**Full Changelog**: https://github.com/AkincanD/react-editor/compare/v1.0.1...v1.0.2
