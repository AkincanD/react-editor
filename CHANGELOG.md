# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2025-11-17

### Fixed
- **React 19 Support**: Updated peer dependencies to support React 18 and React 19
  - `react: ^18.0.0 || ^19.0.0`
  - `react-dom: ^18.0.0 || ^19.0.0`
  - Fixes `ERESOLVE` npm installation errors with React 19

## [1.0.3] - 2025-11-17

### Added
- **Debug Console System**: Advanced debugging with `debugConsole` prop
  - Color-coded console output with categories (INIT, PLUGIN, COMMAND, TOOLBAR, CONTENT, VIEW)
  - Timestamped logs for better tracking
  - Grouped logs for related operations
  - Debug API: `debugLog`, `debugWarn`, `debugError`, `debugGroup`, `debugGroupEnd`
  - Available for use in custom plugins

### Documentation
- Added comprehensive Debugging guide with examples
- Added Debug API reference
- Simplified README.md
- Added GitBook documentation link: https://kuardscreative.gitbook.io/react-editor

## [1.0.2] - 2025-11-17

### Added
- **View Source Button**: New optional button to view and edit raw HTML
  - Toggle between visual editor and HTML source code
  - Enabled with `showSourceButton` prop (default: `false`)
  - Source view with syntax-friendly monospace font
  - Bidirectional editing - changes sync in both modes
  - Responsive design for mobile and desktop
- **Debug Console System**: Advanced debugging with `debugConsole` prop
  - Color-coded console output with categories (INIT, PLUGIN, COMMAND, TOOLBAR, CONTENT, VIEW)
  - Timestamped logs for better tracking
  - Grouped logs for related operations
  - Debug API: `debugLog`, `debugWarn`, `debugError`, `debugGroup`, `debugGroupEnd`
  - Available for use in custom plugins

### Changed
- **BREAKING**: Removed TailwindCSS dependency - now uses pure CSS
- Rewrote all styles with custom CSS (prefixed with `reactEditor_`)
- Improved performance by eliminating unnecessary re-renders
- Fixed plugin duplicate registration warnings

### Fixed
- Plugin duplicate registration issue causing console warnings
- Excessive re-renders in EditorContext
- Component lifecycle optimization

### Improved
- Smaller bundle size (removed TailwindCSS and PostCSS dependencies)
- Better scoped CSS with `reactEditor_` prefix to avoid conflicts
- More responsive design with mobile-first approach
- Enhanced CSS variables for easier theming
- HTML source code viewer/editor
- Seamless switching between visual and source modes
- Developer experience with comprehensive debugging tools

### Documentation
- Updated all documentation to reflect pure CSS implementation
- Removed TailwindCSS configuration references
- Added new CSS customization examples
- Added View Source feature documentation
- Added comprehensive Debugging guide with examples
- Added Debug API reference

## [1.0.0] - 2025-11-17

### Added
- Initial release of React Editor
- Core editor component with rich text editing capabilities
- Plugin system for extensibility
- Built-in plugins:
  - Basic formatting (bold, italic, underline, strikethrough)
  - Headings (H1, H2, H3, paragraph)
  - Lists (bullet and numbered)
  - Text alignment (left, center, right, justify)
  - Links (create and remove)
- Light and dark theme support
- Modern CSS with responsive design
- TypeScript support with full type definitions
- React 18+ compatibility
- Next.js App Router support
- Responsive design for mobile and desktop
- Comprehensive documentation
- Example projects (basic, custom plugin, Next.js)
- Status bar with word and character count
- Customizable toolbar
- Event handlers (onChange, onFocus, onBlur, onReady)
- Editor instance API
- Keyboard shortcuts support
- Read-only mode
- Auto-focus option
- Placeholder text support

### Features
- 🎨 Beautiful, modern UI
- 🔌 Extensible plugin architecture
- 📱 Fully responsive
- 🎯 Complete TypeScript support
- ⚛️ React 18+ compatible
- 🌙 Dark mode ready
- ⚡ Next.js optimized
- 📦 Lightweight bundle
- 🔧 Highly customizable

## [Unreleased]

### Planned Features
- Image upload and management
- Table support
- Code block with syntax highlighting
- Markdown support
- Export to PDF
- Collaborative editing
- Autosave functionality
- Undo/Redo history
- Find and replace
- Spell checker integration
- Custom themes
- Accessibility improvements
- Mobile-specific optimizations
- More built-in plugins

---

For more information, visit [GitHub](https://github.com/AkincanD/react-editor)

