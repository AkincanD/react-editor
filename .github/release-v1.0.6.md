# v1.0.6 - Bug Fixes & UI Improvements

This patch release fixes several important issues and improves the overall user experience.

## 🐛 Bug Fixes

### YouTube Embed URL
Fixed YouTube embed URL format to match YouTube's standard embed code:
- Updated from `https://www.youtube.com/embed/${videoId}` 
- To `https://www.youtube.com/embed/${videoId}?rel=0`
- Now matches the official YouTube embed format

### Source View Height
Fixed source view textarea height issue:
- ✅ Added `min-height: 300px` to prevent short display
- ✅ Added `resize: vertical` for manual adjustment
- ✅ Added `box-sizing: border-box` for proper padding calculation
- ✅ Source view now matches editor height, no scroll needed

### Dark Mode Modal Styling
Fixed modal colors and styling in dark mode:
- ✅ Input background color improved (`#2d2d2d` for better contrast)
- ✅ Added dark mode styles for primary buttons with proper gradients
- ✅ Fixed secondary button hover states in dark mode
- ✅ Improved overall color consistency across all modal elements
- ✅ Better visibility and readability in dark theme

## ✨ Improvements

- Better button gradients in dark mode
- Enhanced hover states for form elements
- Improved overall dark mode user experience

## 📦 Installation

```bash
npm install @akincand/react-editor@1.0.6
```

Or update existing installation:

```bash
npm update @akincand/react-editor
```

## 🔗 Links

- **npm**: https://www.npmjs.com/package/@akincand/react-editor
- **GitHub**: https://github.com/AkincanD/react-editor
- **Documentation**: https://kuardscreative.gitbook.io/react-editor
- **Live Demo**: https://stackblitz.com/edit/rich-react-editor

## 📝 Changelog

See [CHANGELOG.md](https://github.com/AkincanD/react-editor/blob/main/CHANGELOG.md) for a complete list of changes.

---

**Full Changelog**: https://github.com/AkincanD/react-editor/compare/v1.0.5...v1.0.6

