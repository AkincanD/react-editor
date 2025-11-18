# v1.0.7 - Critical Bug Fixes & Media Insertion Improvements

This release fixes critical bugs related to media insertion and modal dark mode styling.

## 🐛 Critical Fixes

### Video/Image Insert Issues
Fixed multiple critical issues that were preventing proper media insertion:

**Content Reset Bug (CRITICAL):**
- ✅ Fixed content being reset to initial HTML when inserting video/image
- ✅ Now uses editor element's current HTML directly instead of state
- ✅ Prevents loss of user edits when inserting media
- ✅ Works for both video and image insertion

**Editor Interaction Issues:**
- ✅ Fixed editor becoming unclickable after video/image insertion
- ✅ Fixed cursor not being placed correctly after insertion
- ✅ Fixed focus not being restored to editor after insertion
- ✅ Multiple videos/images can now be inserted without issues

**Technical Improvements:**
- ✅ Added `contenteditable="false"` to video/image wrappers to prevent editing conflicts
- ✅ Added space after video/image for proper cursor placement
- ✅ Added `getEditorElement()` method to EditorInstance interface
- ✅ Improved DOM manipulation to use direct HTML instead of state

### Modal Dark Mode CSS Selector
Fixed critical bug where modals were not displaying dark mode styles:

- ✅ Modal has `reactEditor_dark` class on itself, not parent container
- ✅ Updated all CSS selectors to support both patterns:
  - `.reactEditor_modal.reactEditor_dark` (when modal has class)
  - `.reactEditor_dark .reactEditor_modal` (when parent has class)
- ✅ Fixed all modal elements (background, header, footer, inputs, buttons, labels)

## 📦 Installation

```bash
npm install @akincand/react-editor@1.0.7
```

Or update existing installation:

```bash
npm update @akincand/react-editor
```

## ✅ What's Fixed

**Before this release:**
- ❌ Inserting video/image would reset editor content to initial HTML
- ❌ Editor became unclickable after media insertion
- ❌ Modals appeared white even in dark mode
- ❌ Could only insert one video/image at a time

**After this release:**
- ✅ Media insertion preserves all user edits
- ✅ Editor remains fully functional after insertion
- ✅ Modals properly display dark theme
- ✅ Multiple media items can be inserted seamlessly

## 🎯 Use Cases Now Working

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor 
      plugins={defaultPlugins}
      defaultContent="<p>Start editing...</p>"
    />
  );
}

// Now you can:
// 1. Type some text
// 2. Insert a video ✅ (content preserved)
// 3. Type more text ✅ (still works)
// 4. Insert an image ✅ (content preserved)
// 5. Insert another video ✅ (works perfectly)
```

## 🔗 Links

- **npm**: https://www.npmjs.com/package/@akincand/react-editor
- **GitHub**: https://github.com/AkincanD/react-editor
- **Documentation**: https://kuardscreative.gitbook.io/react-editor
- **Live Demo**: https://stackblitz.com/edit/rich-react-editor

## 📝 Changelog

See [CHANGELOG.md](https://github.com/AkincanD/react-editor/blob/main/CHANGELOG.md) for a complete list of changes.

---

**Full Changelog**: https://github.com/AkincanD/react-editor/compare/v1.0.6...v1.0.7

