# 🔄 React Editor v1.0.1 - Documentation Update

**Release Date:** November 17, 2025

Minor update focusing on documentation consistency and package naming clarification.

## 📝 What's Changed

### Documentation Updates
- ✅ **Updated Package Name** - Clarified scoped package name `@akincand/react-editor` across all documentation
- ✅ **Fixed npm Badge** - Updated README badge to correctly display npm package version
- ✅ **Consistent Import Statements** - All examples now use correct import syntax
- ✅ **Updated Examples** - All example projects (basic, custom-plugin, Next.js) reference correct package

### Files Updated
- 📖 README.md - Main documentation
- 📖 All docs/ files - Getting started, installation, basic usage, plugins
- 💻 All examples/ - Basic, custom plugin, and Next.js examples
- 📋 Release notes and templates

## 📦 Installation

```bash
npm install @akincand/react-editor
```

```bash
yarn add @akincand/react-editor
```

```bash
pnpm add @akincand/react-editor
```

## 🚀 Quick Start

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor 
      plugins={defaultPlugins}
      placeholder="Start typing..."
    />
  );
}
```

## 🔗 Links

- **Documentation:** [docs](https://github.com/AkincanD/react-editor/tree/main/docs)
- **Examples:** [examples](https://github.com/AkincanD/react-editor/tree/main/examples)
- **GitHub:** https://github.com/AkincanD/react-editor
- **npm:** https://www.npmjs.com/package/@akincand/react-editor

## 📊 Package Info

- **Package:** `@akincand/react-editor`
- **Version:** 1.0.1
- **Size:** 40.0 kB (gzipped)
- **Files:** 35

## ⚠️ Note for v1.0.0 Users

If you installed version 1.0.0, the package works exactly the same. This update only improves documentation clarity. No breaking changes or functionality changes.

## 📝 Full Changelog

**v1.0.1 (2025-11-17)**
- docs: Update all documentation with correct package name @akincand/react-editor
- docs: Fix npm badge URL for scoped package
- docs: Update all examples with correct import statements
- chore: Bump version to 1.0.1

**v1.0.0 (2025-11-17)**
- Initial release with all core features
- 5 built-in plugins
- TypeScript support
- React 18+ compatibility
- Next.js support
- Comprehensive documentation

---

**Full Changelog**: [v1.0.0...v1.0.1](https://github.com/AkincanD/react-editor/compare/v1.0.0...v1.0.1)

**Contributors:** @AkincanD

Thank you for using React Editor! ❤️

