# React Editor v1.0.4

## 🎥 Video Embedding, Modal System & React 19 Support

This release adds powerful new features including video embedding, a beautiful modal system, and full React 19 compatibility!

## ✨ What's New

### Video Embedding Plugin 🎥

Easily embed videos from YouTube and Vimeo directly into your content:

- **YouTube & Vimeo Support**: Automatic URL detection and parsing
- **Responsive by Default**: Videos maintain 16:9 aspect ratio on all screens
- **Advanced Options**: Optional custom width and height settings
- **Smart Insertion**: Inserts at cursor position or beginning of content
- **Beautiful Modal**: No more browser prompts - clean modal interface
- **Lightweight**: iframe-based embedding for optimal performance

**Supported URL Formats:**
- YouTube: `youtube.com/watch?v=...`, `youtu.be/...`, `youtube.com/embed/...`
- Vimeo: `vimeo.com/...`, `player.vimeo.com/video/...`

### Modal Component System 🪟

A new reusable modal component used throughout the editor:

- **Theme-Aware**: Automatically adapts to light/dark mode
- **Keyboard Navigation**: ESC to close, auto-focus on inputs
- **Click Outside**: Close by clicking the overlay
- **Smooth Animations**: Fade-in and slide-up effects
- **Body Scroll Lock**: Prevents background scrolling
- **Fully Responsive**: Works perfectly on all screen sizes
- **Accessible**: Proper focus management and ARIA labels

### Enhanced Link Insertion 🔗

Completely redesigned link insertion experience:

- **Modal Interface**: Beautiful modal replaces browser `prompt()`
- **Custom Link Text**: Optional field for link display text
- **Smart Behavior**: Works with selected text or creates new links
- **Security Built-in**: Automatically adds `target="_blank"` and security attributes
- **Better UX**: Clear labels, validation, and keyboard support

### React 19 Support ⚛️

Full compatibility with both React 18 and React 19:

- ✅ Updated peer dependencies: `react: ^18.0.0 || ^19.0.0`
- ✅ Fixes `ERESOLVE` npm installation errors
- ✅ No breaking changes - works with both versions seamlessly
- ✅ Future-proof for upcoming React versions

### UI/UX Improvements 🎨

- **Better Toolbar Alignment**: Buttons are now perfectly centered on hover
- **Text Cursor**: Content area shows proper text cursor instead of pointer
- **Consistent Spacing**: Improved visual hierarchy and spacing

## 📦 Installation

```bash
npm install @akincand/react-editor@1.0.4
```

## 🔄 Upgrading from 1.0.3

Simply update the package version:

```bash
npm update @akincand/react-editor
```

**No breaking changes!** All existing code will work as-is.

## 📖 Usage Examples

### Video Embedding

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}  // Video plugin included!
      placeholder="Start typing..."
    />
  );
}
```

Click the video button (📹) in the toolbar and paste a YouTube or Vimeo URL!

### Link Insertion with Modal

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}  // Enhanced link plugin!
      placeholder="Select text and add a link..."
    />
  );
}
```

Select text and click the link button (🔗) - no more browser prompts!

### Using Modal in Custom Plugins

```tsx
import { Modal } from '@akincand/react-editor';

function MyCustomModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Modal">
      <div className="reactEditor_formGroup">
        <label className="reactEditor_label">Field Label</label>
        <input className="reactEditor_input" placeholder="Enter value..." />
      </div>
      
      <div className="reactEditor_modalFooter">
        <button className="reactEditor_button reactEditor_buttonSecondary" onClick={onClose}>
          Cancel
        </button>
        <button className="reactEditor_button reactEditor_buttonPrimary">
          Submit
        </button>
      </div>
    </Modal>
  );
}
```

### React 19 Compatibility

```bash
# Works with React 18
npm install react@18 react-dom@18 @akincand/react-editor

# Also works with React 19
npm install react@19 react-dom@19 @akincand/react-editor
```

No `--legacy-peer-deps` needed! 🎉

## 🌟 Complete Feature List

### New in v1.0.4
- ✅ Video embedding (YouTube & Vimeo)
- ✅ Modal component system
- ✅ Enhanced link insertion with modal
- ✅ React 19 support
- ✅ Improved toolbar button alignment
- ✅ Text cursor in editor content

### Existing Features
- ✅ Basic formatting (Bold, Italic, Underline, Strikethrough)
- ✅ Headings (H1, H2, H3, Paragraph)
- ✅ Lists (Bullet and Numbered)
- ✅ Text alignment (Left, Center, Right, Justify)
- ✅ View Source mode
- ✅ Debug Console
- ✅ Light/Dark themes
- ✅ Extensible plugin system
- ✅ TypeScript support
- ✅ Next.js compatible

## 📚 New Documentation

Complete guides for all new features:

- **[Video Embedding Guide](https://kuardscreative.gitbook.io/react-editor/features/video-embedding)** - Learn how to embed videos
- **[Link Insertion Guide](https://kuardscreative.gitbook.io/react-editor/features/link-insertion)** - Enhanced link features
- **[Modal Component API](https://kuardscreative.gitbook.io/react-editor/components/modal)** - Build custom modals

## 🎯 Built-in Plugins

All plugins are included in `defaultPlugins`:

```tsx
import { 
  basicFormattingPlugin,  // Bold, Italic, Underline, Strikethrough
  headingsPlugin,         // H1, H2, H3, Paragraph
  listsPlugin,           // Bullet and Numbered lists
  alignmentPlugin,       // Text alignment
  linksPlugin,           // ✨ NEW: Modal-based link insertion
  videoPlugin,           // ✨ NEW: Video embedding
  defaultPlugins         // All plugins combined
} from '@akincand/react-editor';
```

## 📊 Bundle Size

- **Gzipped**: ~47 KB
- **Unpacked**: ~223 KB
- **No external CSS framework** required
- **Pure CSS** implementation

## 🐛 Bug Fixes

- Fixed React 19 peer dependency conflicts
- Fixed toolbar button alignment issues
- Fixed cursor style in editable content area
- Improved modal accessibility and keyboard navigation

## 💡 Breaking Changes

**None!** This is a fully backward-compatible release.

## 🚀 What's Next

Coming soon in future releases:

- 📸 Image insertion with drag & drop
- 🎨 Color picker for text and backgrounds
- 📋 Table creation and editing
- 📝 Font family selection
- ↩️ Enhanced undo/redo history
- 🔍 Find and replace

## 📚 Resources

- **Documentation**: [https://kuardscreative.gitbook.io/react-editor](https://kuardscreative.gitbook.io/react-editor)
- **GitHub**: [https://github.com/AkincanD/react-editor](https://github.com/AkincanD/react-editor)
- **npm**: [https://www.npmjs.com/package/@akincand/react-editor](https://www.npmjs.com/package/@akincand/react-editor)
- **Video Guide**: [https://kuardscreative.gitbook.io/react-editor/features/video-embedding](https://kuardscreative.gitbook.io/react-editor/features/video-embedding)
- **Link Guide**: [https://kuardscreative.gitbook.io/react-editor/features/link-insertion](https://kuardscreative.gitbook.io/react-editor/features/link-insertion)

## 🙏 Thank You

Thank you for using React Editor! If you encounter any issues or have feature requests, please report them on [GitHub Issues](https://github.com/AkincanD/react-editor/issues).

Special thanks to all users who reported the React 19 compatibility issue! 🎉

---

**Full Changelog**: https://github.com/AkincanD/react-editor/compare/v1.0.3...v1.0.4

