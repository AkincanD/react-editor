# React Editor v1.0.3

## 🔍 Debug Console System & Documentation Improvements

This release adds a powerful debug console system and improves documentation with GitBook integration!

## ✨ What's New

### Debug Console System 🐛

Advanced debugging capabilities for developers:

- **Color-Coded Logs**: Easy-to-read console output with categories
- **Timestamped**: Track when events occur
- **Grouped Output**: Related operations grouped together
- **Optional Feature**: Enable with `debugConsole` prop (default: `false`)
- **Plugin Integration**: Use debug API in custom plugins

**Debug Categories:**
- `INIT` - Editor initialization and lifecycle
- `PLUGIN` - Plugin system operations
- `COMMAND` - Command registration/execution
- `TOOLBAR` - Toolbar button operations
- `CONTENT` - Content changes
- `VIEW` - View mode changes

### Documentation Improvements 📚

- **GitBook Integration**: Complete documentation at [https://kuardscreative.gitbook.io/react-editor](https://kuardscreative.gitbook.io/react-editor)
- **Simplified README**: Focused on quick start with links to detailed docs
- **Debug Guide**: Comprehensive debugging documentation with examples
- **Better Navigation**: Quick links to all major documentation sections

## 📦 Installation

```bash
npm install @akincand/react-editor@1.0.3
```

## 🔄 Upgrading from 1.0.2

Simply update the package version:

```bash
npm update @akincand/react-editor
```

## 📖 Usage Examples

### Enable Debug Console

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      debugConsole={true}  // Enable debug logging
      showSourceButton={true}
      placeholder="Start typing..."
    />
  );
}
```

### Debug Output Example

```
🎨 React Editor Debug Mode Enabled

[14:23:45] INIT Editor initializing...
[14:23:45] PLUGIN Registering plugin: basicFormatting
[14:23:45] PLUGIN   ↳ Registering 4 toolbar button(s)
[14:23:45] PLUGIN   ↳ Registering 4 command(s)
[14:23:45] PLUGIN ✓ Plugin basicFormatting loaded successfully
[14:23:46] TOOLBAR Button clicked: bold
[14:23:46] COMMAND Executing: bold
[14:23:46] CONTENT Content changed (visual mode)
```

### Using Debug API in Custom Plugins

```tsx
import { 
  EditorPlugin, 
  debugLog, 
  debugWarn, 
  debugError,
  debugGroup,
  debugGroupEnd 
} from '@akincand/react-editor';

export const myPlugin: EditorPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  
  onLoad: (context) => {
    debugGroup('My Plugin Loading', true);
    debugLog('PLUGIN', 'Initializing features...');
    
    try {
      // Your plugin logic
      debugLog('PLUGIN', '✓ Plugin loaded successfully');
    } catch (error) {
      debugError('PLUGIN', 'Failed to load plugin', error);
    }
    
    debugGroupEnd();
  }
};
```

## 🌟 Features

### Debug Console
- ✅ Color-coded console output
- ✅ Timestamped logs
- ✅ Categorized messages
- ✅ Grouped related operations
- ✅ Debug API for custom plugins
- ✅ No performance impact when disabled

### Documentation
- ✅ Complete GitBook documentation
- ✅ Interactive examples
- ✅ API reference
- ✅ Plugin development guide
- ✅ Debugging guide
- ✅ Quick start guide

## 📝 New Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `debugConsole` | `boolean` | `false` | Enables debug logging in console |

## 🎯 Use Cases

### Plugin Development
Debug custom plugins with detailed logs showing initialization, registration, and execution.

### Troubleshooting
Identify issues in editor lifecycle, from initialization to content changes.

### Performance Monitoring
Track command execution and events to optimize performance.

### Integration Testing
Verify correct behavior during development with detailed console output.

## 📚 Resources

- **Documentation**: [https://kuardscreative.gitbook.io/react-editor](https://kuardscreative.gitbook.io/react-editor)
- **Debugging Guide**: [https://kuardscreative.gitbook.io/react-editor/debugging](https://kuardscreative.gitbook.io/react-editor/debugging)
- **GitHub**: [https://github.com/AkincanD/react-editor](https://github.com/AkincanD/react-editor)
- **npm**: [https://www.npmjs.com/package/@akincand/react-editor](https://www.npmjs.com/package/@akincand/react-editor)

## 🙏 Thank You

Thank you for using React Editor! If you find any issues, please report them on [GitHub](https://github.com/AkincanD/react-editor/issues).

---

**Full Changelog**: https://github.com/AkincanD/react-editor/compare/v1.0.2...v1.0.3

