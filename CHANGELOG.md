# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.9] - 2025-11-18

### Added
- **Color Selection Plugin**: New lightweight color selection feature for text and background colors
  - Text color button with dropdown color picker (not modal)
  - Background color button with dropdown color picker (not modal)
  - Predefined color palette with 24 colors (4x6 grid)
  - "More Colors" option for custom color selection
  - HTML5 color input for precise color selection
  - Hex color code input field
  - "No Color" option for background (transparent)
  - Fast, lightweight dropdown (popover style)
  - Active state detection for color buttons
  - Integrated with default plugins

### Improved
- **Plugin System**: Added `colorPlugin` to default plugins
- **Color Picker UX**: Changed from modal to lightweight dropdown for better performance
- **Performance**: Color picker is now instant and non-intrusive

## [1.0.8] - 2025-11-18

### Fixed
- **Toolbar Button Active States**: Fixed toolbar buttons not showing active state when format is applied
  - Headings (H1, H2, H3, P) now correctly show active state when selected text is in that format
  - Alignment buttons (Left, Center, Right, Justify) now correctly show active state
  - Link button now shows active state when cursor is inside a link
  - Unlink button now shows active state when cursor is inside a link
  - Toolbar now updates in real-time when selection changes
  - Fixed issue where clicking an already active format button would apply it again (e.g., H1 → H2)

### Added
- **Real-time Toolbar Updates**: Toolbar buttons now update automatically when selection changes
  - Selection change detection via `selectionchange` event
  - Mouse and keyboard event listeners for immediate feedback
  - Smooth, non-blocking updates using React state

### Improved
- **Performance Optimization**: Fixed typing lag by preventing unnecessary DOM updates
  - User input no longer triggers unnecessary `innerHTML` updates
  - `onChange` callback moved to `requestAnimationFrame` for non-blocking execution
  - Removed debug logging from input handler for better performance

## [1.0.7] - 2025-11-18

### Fixed
- **Video/Image Insert Issues**: Fixed multiple critical issues with media insertion
  - Fixed editor becoming unclickable after video/image insertion
  - Fixed cursor not being placed correctly after insertion
  - Fixed focus not being restored to editor after insertion
  - Fixed content being reset to initial HTML when inserting media (critical bug)
  - Now uses editor element's current HTML directly instead of state
  - Added `contenteditable="false"` to video/image wrappers to prevent editing conflicts
  - Added space after video/image for proper cursor placement
  - Multiple videos/images can now be inserted without issues
  - Editor focus is properly restored after each insertion
- **Modal Dark Mode CSS Selector**: Critical fix for modal dark mode not applying
  - Modal has `reactEditor_dark` class on itself, not parent container
  - Updated all CSS selectors to support both patterns:
    - `.reactEditor_modal.reactEditor_dark` (when modal has class)
    - `.reactEditor_dark .reactEditor_modal` (when parent has class)
  - Fixed elements:
    - Modal background and box shadows
    - Modal header border color
    - Modal title text color
    - Modal close button color and hover
    - Modal footer background and border
    - Form labels text color
    - Input fields (background, border, hover, focus, placeholder)
    - Primary buttons (background gradient, hover states)
    - Secondary buttons (background, border, hover states)
    - Checkbox labels text color
  - Modals now properly display dark theme when editor is in dark mode

## [1.0.6] - 2025-11-18

### Fixed
- **YouTube Embed URL**: Updated to use proper embed format with query parameters
  - Changed from `https://www.youtube.com/embed/${videoId}` to `https://www.youtube.com/embed/${videoId}?rel=0`
  - Matches YouTube's standard embed code format
- **Source View Height**: Fixed source view textarea height issue
  - Added `min-height: 300px` to prevent short display
  - Added `resize: vertical` for manual adjustment
  - Added `box-sizing: border-box` for proper padding calculation
  - Source view now matches editor height, no scroll needed
- **Dark Mode Modal Styling**: Fixed modal colors in dark mode
  - Input background color changed from `#1a1a1a` to `#2d2d2d` for better contrast
  - Added dark mode styles for primary buttons with proper gradients
  - Fixed secondary button hover states in dark mode
  - Improved overall color consistency across all modal elements
  - Better visibility and readability in dark theme

### Improved
- Better button gradients in dark mode
- Enhanced hover states for form elements
- Improved overall dark mode user experience

## [1.0.5] - 2025-11-17

### Added
- **Custom Styles Prop**: New `customStyles` prop for inline CSS customization
  - Accepts React CSSProperties
  - Merged with default container styles
  - Full CSS property support
- **Image Plugin**: New image insertion feature
  - Insert images from URL
  - Support for .jpg, .png, .gif, .webp, .svg formats
  - Alt text support for accessibility
  - Optional custom dimensions (width/height)
  - Responsive by default (max-width: 100%)
  - Beautiful modal interface
- **Direct Video File Support**: Enhanced video plugin
  - Support for .mp4, .webm, .ogg video files
  - HTML5 video element with controls
  - Works alongside YouTube and Vimeo
- **Enhanced Modal Design**: Completely redesigned modal system
  - Backdrop blur effect with glassmorphism
  - Smooth scale and slide animations
  - Gradient buttons with ripple effects
  - Fully responsive (desktop, tablet, mobile)
  - Bottom sheet style on mobile devices
  - Improved dark mode styling
- **Custom Styling Documentation**: Comprehensive guide with examples
  - CSS classes reference
  - CSS variables guide
  - Multiple design system examples (Neumorphic, Glassmorphism, Terminal, Magazine)
  - Live StackBlitz demo integration
  - Best practices and troubleshooting

### Fixed
- **Video Embedding**: Fixed video insertion not working
  - Removed whitespace from HTML strings
  - Improved insertion logic
  - Better selection handling
  - Videos now insert at end of content when no selection
- **Modal UI Issues**: Fixed responsiveness and styling problems
  - Better input field styling with hover states
  - Improved button styling with transforms
  - Fixed footer background colors
  - Better spacing and padding across all breakpoints

### Improved
- Modal animations now use cubic-bezier easing
- Better form element styling
- Enhanced checkbox design with accent colors
- Advanced options panel with background styling
- Input fields with placeholder colors and focus states

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

