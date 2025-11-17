# Examples Overview

Welcome to the React Editor examples section! Here you'll find comprehensive examples to help you get started and master the editor.

## 📚 Available Examples

### [Basic Examples](basic.md)
Simple, straightforward examples to get you started quickly:
- Minimal setup
- With default plugins
- State management
- Event handlers
- Theming

### [Advanced Examples](advanced.md)
More complex use cases and patterns:
- Custom plugins
- Advanced integrations
- Performance optimization
- Custom commands

### [Next.js Integration](nextjs.md)
Learn how to use React Editor in Next.js applications:
- App Router setup
- Pages Router setup
- Server-side rendering
- TypeScript configuration

### [Custom Plugin Example](custom-plugin.md)
Build your own plugins:
- Plugin structure
- Toolbar buttons
- Custom commands
- Keyboard shortcuts

## 🎮 Live Demo

Try React Editor live in your browser with StackBlitz:

<iframe 
  src="https://stackblitz.com/edit/rich-react-editor?embed=1&file=src%2FApp.tsx&hideExplorer=1&hideNavigation=1&theme=dark&view=preview"
  style="width: 100%; height: 600px; border: 0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
  title="React Editor Live Demo"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[Open in StackBlitz →](https://stackblitz.com/edit/rich-react-editor)

## 🚀 Quick Start

The simplest way to get started:

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return <Editor plugins={defaultPlugins} />;
}
```

## 📦 Installation

If you haven't installed React Editor yet:

```bash
npm install @akincand/react-editor
```

Or with yarn:

```bash
yarn add @akincand/react-editor
```

## 🎯 Example Categories

### **Beginner** 🟢
Start here if you're new to React Editor:
- [Minimal Setup](basic.md#minimal-setup)
- [With Default Plugins](basic.md#with-default-plugins)
- [With Initial Content](basic.md#with-initial-content)

### **Intermediate** 🟡
Once you're comfortable with basics:
- [State Management](basic.md#with-state-management)
- [Event Handlers](basic.md#with-event-handlers)
- [Theme Switching](basic.md#with-theme)
- [Form Integration](basic.md#form-integration)

### **Advanced** 🔴
For complex use cases:
- [Custom Plugins](custom-plugin.md)
- [Editor Instance Control](basic.md#using-editor-instance)
- [Auto-Save Implementation](basic.md#auto-save)
- [Multiple Editors](basic.md#multiple-editors)

## 🎨 Feature Examples

### Text Formatting
```tsx
<Editor 
  plugins={[basicFormattingPlugin, headingsPlugin]}
/>
```

### Media Support
```tsx
<Editor 
  plugins={[videoPlugin, imagePlugin]}
/>
```

### Links & Lists
```tsx
<Editor 
  plugins={[linksPlugin, listsPlugin]}
/>
```

### Custom Styling
```tsx
<Editor 
  plugins={defaultPlugins}
  customStyles={{
    border: '2px solid #667eea',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  }}
/>
```

## 🔗 Interactive Examples

### Example 1: Simple Editor

<iframe 
  src="https://stackblitz.com/edit/rich-react-editor?embed=1&file=src%2FApp.tsx&view=preview"
  style="width: 100%; height: 500px; border: 0; border-radius: 8px; overflow: hidden;"
  title="Simple Editor Example"
></iframe>

### Example 2: With Custom Theme

<iframe 
  src="https://stackblitz.com/edit/rich-react-editor?embed=1&file=src%2FApp.tsx&view=preview"
  style="width: 100%; height: 500px; border: 0; border-radius: 8px; overflow: hidden;"
  title="Custom Theme Example"
></iframe>

## 💡 Tips

1. **Start Simple**: Begin with basic examples and gradually add features
2. **Use TypeScript**: Get better IntelliSense and type safety
3. **Check the Console**: Enable `debugConsole` prop to see what's happening
4. **Explore Plugins**: Each plugin adds specific functionality
5. **Custom Styling**: Use `customStyles` prop for quick styling changes

## 📖 Documentation Links

- [Configuration](../configuration.md) - All available props
- [API Reference](../api-reference.md) - Complete API documentation
- [Plugin System](../plugins/README.md) - Understanding plugins
- [Theming](../theming.md) - Styling and themes
- [Custom Styling](../customization/custom-styling.md) - Advanced styling

## 🎓 Learning Path

**Step 1**: [Basic Setup](basic.md#minimal-setup)
↓
**Step 2**: [Add Plugins](basic.md#with-default-plugins)
↓
**Step 3**: [Handle Events](basic.md#with-event-handlers)
↓
**Step 4**: [Custom Styling](../customization/custom-styling.md)
↓
**Step 5**: [Create Plugin](custom-plugin.md)

## 🤝 Need Help?

- [GitHub Issues](https://github.com/AkincanD/react-editor/issues)
- [GitBook Documentation](https://kuardscreative.gitbook.io/react-editor)
- [npm Package](https://www.npmjs.com/package/@akincand/react-editor)

## 🎉 What's Next?

After exploring these examples, you'll be ready to:
- Build custom plugins
- Integrate with your backend
- Create beautiful content editors
- Deploy production-ready applications

Happy coding! 🚀

