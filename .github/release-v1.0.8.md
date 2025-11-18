# v1.0.8 - Toolbar Active States & Performance Improvements

This release fixes critical toolbar button active state issues and improves editor performance.

## 🎯 Major Fixes

### Toolbar Button Active States
Fixed the most requested issue: toolbar buttons now correctly show their active state when the corresponding format is applied.

**Before:**
- ❌ H1 button didn't show active when text was H1
- ❌ Clicking H1 on H1 text would change it to H2
- ❌ Alignment buttons didn't show active state
- ❌ Link button didn't show active when inside a link
- ❌ Toolbar didn't update when selection changed

**After:**
- ✅ H1/H2/H3/P buttons correctly show active state
- ✅ Clicking active format button does nothing (no double-apply)
- ✅ Alignment buttons show active state correctly
- ✅ Link/Unlink buttons show active when inside a link
- ✅ Toolbar updates in real-time on selection change

### Real-time Toolbar Updates
- ✅ Toolbar buttons update automatically when you select text
- ✅ Works with mouse selection and keyboard navigation
- ✅ Smooth, non-blocking updates
- ✅ No performance impact

## ⚡ Performance Improvements

### Typing Performance
Fixed laggy typing experience:

- ✅ Removed unnecessary DOM updates on every keystroke
- ✅ `onChange` callback now runs in `requestAnimationFrame` (non-blocking)
- ✅ User input no longer triggers `useEffect` innerHTML updates
- ✅ Typing is now instant and responsive

## 📦 Installation

```bash
npm install @akincand/react-editor@1.0.8
```

Or update existing installation:

```bash
npm update @akincand/react-editor
```

## 🎨 What's Fixed

### Headings Plugin
```tsx
// Before: H1 button never showed active
// After: H1 button shows active when text is H1
<Editor defaultContent="<h1>Heading</h1>" />
// ✅ H1 button is now highlighted
```

### Alignment Plugin
```tsx
// Before: Alignment buttons didn't show active
// After: Active alignment is clearly visible
<Editor defaultContent="<p style='text-align: center;'>Centered</p>" />
// ✅ Center button is now highlighted
```

### Links Plugin
```tsx
// Before: Link button didn't show active
// After: Link button shows active when inside a link
<Editor defaultContent="<a href='#'>Link</a>" />
// ✅ Link and Unlink buttons are now highlighted
```

## 🔧 Technical Details

### Active State Detection
- **Headings**: Checks parent element's tagName (H1, H2, H3, P)
- **Alignment**: Uses `document.queryCommandState()` for justifyLeft/Center/Right/Full
- **Links**: Checks if selection is inside an `<a>` tag
- **Formatting**: Uses `document.queryCommandState()` for bold/italic/underline/strikethrough

### Selection Change Detection
- Listens to `selectionchange` event
- Listens to `mouseup` and `keyup` events in editor
- Updates toolbar state without blocking UI
- Uses React state to trigger re-render

## 🎯 Use Cases Now Working

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor 
      plugins={defaultPlugins}
      defaultContent="<h1>My Heading</h1><p>Some text</p>"
    />
  );
}

// Now you can:
// 1. Select H1 text → H1 button shows active ✅
// 2. Click H1 button again → Does nothing (already H1) ✅
// 3. Select paragraph → P button shows active ✅
// 4. Type text → No lag, instant response ✅
// 5. Select link → Link button shows active ✅
```

## 🔗 Links

- **npm**: https://www.npmjs.com/package/@akincand/react-editor
- **GitHub**: https://github.com/AkincanD/react-editor
- **Documentation**: https://kuardscreative.gitbook.io/react-editor
- **Live Demo**: https://stackblitz.com/edit/rich-react-editor

## 📝 Changelog

See [CHANGELOG.md](https://github.com/AkincanD/react-editor/blob/main/CHANGELOG.md) for a complete list of changes.

---

**Full Changelog**: https://github.com/AkincanD/react-editor/compare/v1.0.7...v1.0.8

