# v1.0.9 - Color Selection Feature (Dropdown Style)

This release adds a powerful, lightweight color selection feature with dropdown-style color pickers (not modals), allowing users to quickly apply text and background colors to selected text.

## 🎨 New Feature: Color Selection

### Text Color & Background Color
- ✅ Text color button with lightweight dropdown color picker (not modal)
- ✅ Background color button with dropdown color picker
- ✅ Predefined color palette (24 colors in 4x6 grid)
- ✅ "More Colors" option for custom color selection
- ✅ HTML5 color input for precise color selection
- ✅ Hex color code input field with validation
- ✅ "No Color" option for background (transparent)
- ✅ Instant color application (click to apply)
- ✅ Active state detection for color buttons
- ✅ Fast, lightweight, non-intrusive dropdown

### Color Picker Dropdown
The color picker dropdown (lightweight, not a modal) includes:
- **Color Palette**: 24 predefined colors in a 4x6 grid
- **More Colors**: Custom color selection with HTML5 color input
- **Hex Code Input**: Type or paste hex codes directly (#RRGGBB)
- **No Color**: Remove background color (transparent) - background only
- **Instant Application**: Click color to apply immediately
- **Theme Support**: Works with light and dark modes
- **Fast & Lightweight**: Dropdown opens instantly, no modal overlay

## 📦 Installation

```bash
npm install @akincand/react-editor@1.0.9
```

Or update existing installation:

```bash
npm update @akincand/react-editor
```

## 🎯 Usage

The color plugin is included in `defaultPlugins`:

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
    />
  );
}
```

### Using Color Buttons

1. **Select text** in the editor
2. **Click Text Color button** (A icon) to change text color
3. **Click Background Color button** (⬛ icon) to change background color
4. **Choose a color** from the palette or use the color picker
5. **Click Apply** to apply the color

## ✨ Features

### Text Color
- Changes the color of selected text
- Supports all CSS color formats (hex, rgb, rgba, named colors)
- Active state shows when text has non-default color

### Background Color
- Changes the background color of selected text
- Perfect for highlighting text
- Active state shows when background is not default

### Color Picker
- HTML5 color input for visual selection
- Hex code input for precise control
- 30 predefined colors in a grid
- Real-time preview
- Current color detection

## 🎨 Color Formats Supported

- **Hex**: `#FF0000`, `#f00`
- **RGB**: `rgb(255, 0, 0)`
- **RGBA**: `rgba(255, 0, 0, 0.5)`
- **Named Colors**: `red`, `blue`, `green`

## 📝 Example

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      defaultContent="<p>Select this text and change its color!</p>"
    />
  );
}

// Now you can:
// 1. Select text ✅
// 2. Click Text Color button ✅
// 3. Choose a color ✅
// 4. Apply color ✅
// 5. Text color changes instantly ✅
```

## 🔧 Programmatic Usage

You can also apply colors programmatically:

```tsx
import { useEditor } from '@akincand/react-editor';

function MyComponent() {
  const { execCommand } = useEditor();
  
  const setRedText = () => {
    execCommand('foreColor', '#FF0000');
  };
  
  const setYellowBackground = () => {
    execCommand('backColor', '#FFFF00');
  };
  
  return (
    <>
      <button onClick={setRedText}>Make Text Red</button>
      <button onClick={setYellowBackground}>Highlight Yellow</button>
    </>
  );
}
```

## 🎯 What's New

**Before this release:**
- ❌ No way to change text color
- ❌ No way to change background color
- ❌ Limited formatting options

**After this release:**
- ✅ Full text color control
- ✅ Full background color control
- ✅ Beautiful color picker interface
- ✅ Quick color palette access
- ✅ Active state detection

## 🔗 Links

- **npm**: https://www.npmjs.com/package/@akincand/react-editor
- **GitHub**: https://github.com/AkincanD/react-editor
- **Documentation**: https://kuardscreative.gitbook.io/react-editor
- **Live Demo**: https://stackblitz.com/edit/rich-react-editor

## 📝 Changelog

See [CHANGELOG.md](https://github.com/AkincanD/react-editor/blob/main/CHANGELOG.md) for a complete list of changes.

---

**Full Changelog**: https://github.com/AkincanD/react-editor/compare/v1.0.8...v1.0.9

