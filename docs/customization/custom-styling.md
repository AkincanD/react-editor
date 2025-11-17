# Custom Styling

React Editor provides powerful customization options that allow you to fully control the editor's appearance using CSS and inline styles.

## Table of Contents

- [Custom Styles Prop](#custom-styles-prop)
- [CSS Classes](#css-classes)
- [CSS Variables](#css-variables)
- [Theme Customization](#theme-customization)
- [Examples](#examples)
- [Live Demo](#live-demo)

## Custom Styles Prop

The easiest way to customize the editor's appearance is using the `customStyles` prop, which accepts standard React CSS properties.

### Basic Usage

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      customStyles={{
        border: '2px solid #667eea',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    />
  );
}
```

### Available CSS Properties

You can use any valid CSS property:

```tsx
<Editor
  customStyles={{
    // Border & Shape
    border: '2px solid #667eea',
    borderRadius: '16px',
    
    // Shadow
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
    
    // Background
    backgroundColor: '#f8f9fa',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    
    // Size
    width: '100%',
    maxWidth: '800px',
    minHeight: '500px',
    
    // Spacing
    margin: '20px auto',
    padding: '10px',
    
    // Transform & Animation
    transform: 'scale(0.95)',
    transition: 'all 0.3s ease',
    
    // And any other CSS property...
  }}
/>
```

## CSS Classes

All editor elements use prefixed CSS classes that you can override in your own stylesheet.

### Main Container

```css
/* Main editor container */
.reactEditor_container {
  /* Your custom styles */
}

/* Dark mode container */
.reactEditor_container.reactEditor_dark {
  /* Dark mode styles */
}
```

### Toolbar

```css
/* Toolbar container */
.reactEditor_toolbar {
  background: linear-gradient(to right, #667eea, #764ba2);
  border-radius: 12px 12px 0 0;
}

/* Toolbar buttons */
.reactEditor_toolbarButton {
  border-radius: 8px;
  transition: all 0.2s ease;
}

.reactEditor_toolbarButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Active button */
.reactEditor_toolbarButton.reactEditor_active {
  background: rgba(255, 255, 255, 0.2);
}

/* Button separator */
.reactEditor_toolbarSeparator {
  background: rgba(255, 255, 255, 0.3);
}
```

### Content Area

```css
/* Content wrapper */
.reactEditor_content {
  background: #fafafa;
  padding: 30px;
}

/* Editable area */
.reactEditor_contentEditable {
  font-family: 'Georgia', serif;
  font-size: 16px;
  line-height: 1.8;
  color: #2c3e50;
}

/* Placeholder */
.reactEditor_contentEditable:empty:before {
  color: #95a5a6;
  font-style: italic;
}
```

### Modal Styling

```css
/* Modal overlay */
.reactEditor_modalOverlay {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}

/* Modal container */
.reactEditor_modal {
  border-radius: 20px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

/* Modal header */
.reactEditor_modalHeader {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
}

.reactEditor_modalTitle {
  font-size: 24px;
  font-weight: 700;
}

/* Modal buttons */
.reactEditor_buttonPrimary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 12px 32px;
  font-size: 16px;
}
```

### Status Bar

```css
/* Status bar */
.reactEditor_statusBar {
  background: #f8f9fa;
  border-top: 2px solid #e9ecef;
  padding: 12px 20px;
}

/* Status bar sections */
.reactEditor_statusBarSection {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 13px;
}
```

## CSS Variables

React Editor uses CSS variables for theming. You can override these for global customization:

```css
:root {
  /* Light Theme */
  --reactEditor-bg-light: #ffffff;
  --reactEditor-text-light: #1f2937;
  --reactEditor-border-light: #e5e7eb;
  --reactEditor-toolbar-light: #f9fafb;
  --reactEditor-hover-light: #f3f4f6;
  --reactEditor-active-light: #dbeafe;
  --reactEditor-placeholder-light: #9ca3af;
  
  /* Dark Theme */
  --reactEditor-bg-dark: #1e1e1e;
  --reactEditor-text-dark: #e5e7eb;
  --reactEditor-border-dark: #374151;
  --reactEditor-toolbar-dark: #2d2d2d;
  --reactEditor-hover-dark: #3d3d3d;
  --reactEditor-active-dark: #1e3a5f;
  --reactEditor-placeholder-dark: #6b7280;
  
  /* Shadows */
  --reactEditor-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --reactEditor-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --reactEditor-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --reactEditor-transition: all 0.2s ease-in-out;
}
```

### Custom Color Scheme Example

```css
:root {
  /* Purple Theme */
  --reactEditor-bg-light: #faf5ff;
  --reactEditor-text-light: #4c1d95;
  --reactEditor-border-light: #e9d5ff;
  --reactEditor-toolbar-light: #f3e8ff;
  --reactEditor-hover-light: #ede9fe;
  --reactEditor-active-light: #ddd6fe;
  
  /* Green Theme for Dark Mode */
  --reactEditor-bg-dark: #0f1a14;
  --reactEditor-text-dark: #d1fae5;
  --reactEditor-border-dark: #065f46;
  --reactEditor-toolbar-dark: #064e3b;
  --reactEditor-hover-dark: #047857;
  --reactEditor-active-dark: #059669;
}
```

## Theme Customization

### Using Theme Prop

```tsx
<Editor
  theme={{
    mode: 'dark',
    colors: {
      background: '#1a202c',
      text: '#e2e8f0',
      border: '#4a5568',
      toolbar: '#2d3748',
      hover: '#4a5568'
    }
  }}
/>
```

### Dynamic Theme Switching

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      
      <Editor
        plugins={defaultPlugins}
        theme={{ mode: theme }}
        customStyles={{
          transition: 'all 0.3s ease',
          border: theme === 'dark' 
            ? '2px solid #4a5568' 
            : '2px solid #e2e8f0'
        }}
      />
    </>
  );
}
```

## Examples

### Minimal Style

```tsx
<Editor
  plugins={defaultPlugins}
  customStyles={{
    border: 'none',
    boxShadow: 'none',
    borderRadius: 0,
  }}
/>
```

### Neumorphic Design

```tsx
<Editor
  plugins={defaultPlugins}
  customStyles={{
    background: '#e0e5ec',
    border: 'none',
    borderRadius: '20px',
    boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
  }}
/>
```

### Glassmorphism

```tsx
<Editor
  plugins={defaultPlugins}
  customStyles={{
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  }}
/>
```

### Gradient Border

```tsx
<Editor
  plugins={defaultPlugins}
  customStyles={{
    border: '3px solid transparent',
    borderRadius: '16px',
    backgroundImage: `
      linear-gradient(white, white),
      linear-gradient(135deg, #667eea 0%, #764ba2 100%)
    `,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  }}
/>
```

### Retro Terminal

```css
.reactEditor_container {
  background: #0c0c0c;
  border: 3px solid #33ff33;
  border-radius: 0;
  font-family: 'Courier New', monospace;
  box-shadow: 0 0 20px rgba(51, 255, 51, 0.5);
}

.reactEditor_toolbar {
  background: #1a1a1a;
  border-bottom: 1px solid #33ff33;
}

.reactEditor_contentEditable {
  color: #33ff33;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 5px rgba(51, 255, 51, 0.7);
}
```

### Magazine Style

```css
.reactEditor_container {
  background: #fff;
  border: none;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

.reactEditor_toolbar {
  background: #2c3e50;
  padding: 16px;
}

.reactEditor_toolbarButton {
  color: #ecf0f1;
  border-radius: 4px;
  padding: 10px 16px;
}

.reactEditor_contentEditable {
  font-family: 'Merriweather', Georgia, serif;
  font-size: 18px;
  line-height: 1.8;
  color: #2c3e50;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
}

.reactEditor_contentEditable p {
  margin-bottom: 1.5em;
  text-align: justify;
}

.reactEditor_contentEditable h1,
.reactEditor_contentEditable h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}
```

## Advanced Techniques

### Responsive Styling

```tsx
<Editor
  plugins={defaultPlugins}
  customStyles={{
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      borderRadius: '0',
      border: 'none',
    }
  }}
/>
```

Using CSS:

```css
.reactEditor_container {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .reactEditor_container {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
  
  .reactEditor_toolbar {
    position: sticky;
    top: 0;
    z-index: 100;
  }
}

@media (max-width: 480px) {
  .reactEditor_toolbarButton {
    min-width: 36px;
    padding: 8px;
  }
  
  .reactEditor_contentEditable {
    font-size: 16px;
    padding: 16px;
  }
}
```

### Print Styles

```css
@media print {
  .reactEditor_toolbar,
  .reactEditor_statusBar {
    display: none !important;
  }
  
  .reactEditor_container {
    border: none;
    box-shadow: none;
  }
  
  .reactEditor_content {
    padding: 0;
  }
  
  .reactEditor_contentEditable {
    color: #000;
    font-size: 12pt;
    line-height: 1.5;
  }
}
```

### Animation on Focus

```css
.reactEditor_container {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.reactEditor_container:focus-within {
  transform: scale(1.02);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}
```

## Live Demo

Try the editor with custom styling in real-time:

<iframe 
  src="https://stackblitz.com/edit/rich-react-editor?embed=1&file=src%2FApp.tsx&hideExplorer=1&hideNavigation=1&theme=dark&view=preview"
  style="width: 100%; height: 600px; border: 0; border-radius: 8px; overflow: hidden;"
  title="React Editor Custom Styling Demo"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[Open in StackBlitz →](https://stackblitz.com/edit/rich-react-editor)

## Best Practices

1. **Use CSS Variables**: For consistent theming across components
2. **Combine Methods**: Use `customStyles` for quick changes, CSS classes for complex designs
3. **Test Both Themes**: Ensure your customizations work in both light and dark modes
4. **Mobile First**: Design for mobile devices and enhance for desktop
5. **Accessibility**: Maintain sufficient color contrast ratios
6. **Performance**: Avoid expensive CSS properties like `filter` on large elements
7. **Namespace**: Keep custom classes namespaced to avoid conflicts

## Troubleshooting

### Styles Not Applied

```tsx
// ❌ Wrong - styles applied to wrong element
<div style={{ border: '2px solid red' }}>
  <Editor plugins={defaultPlugins} />
</div>

// ✅ Correct - use customStyles prop
<Editor 
  plugins={defaultPlugins}
  customStyles={{ border: '2px solid red' }}
/>
```

### CSS Specificity Issues

```css
/* ❌ Low specificity - might not work */
.reactEditor_container {
  background: red;
}

/* ✅ Higher specificity */
.reactEditor_container.reactEditor_container {
  background: red;
}

/* ✅ Or use !important (use sparingly) */
.reactEditor_container {
  background: red !important;
}
```

### Dark Mode Not Working

```tsx
// ❌ Wrong - CSS variables not updated
<Editor 
  theme={{ mode: 'dark' }}
  customStyles={{ color: '#000' }} // Overrides dark text
/>

// ✅ Correct - use theme variables
<Editor 
  theme={{ mode: 'dark' }}
  customStyles={{ 
    border: '2px solid var(--reactEditor-border-dark)' 
  }}
/>
```

## Related

- [Theming Guide](../theming.md)
- [CSS Variables Reference](./css-variables.md)
- [Component Styling](../components/styling.md)
- [Examples](../examples/README.md)

