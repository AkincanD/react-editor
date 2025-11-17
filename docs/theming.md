# Theming

Complete guide to theming React Editor.

## Overview

React Editor supports light and dark modes out of the box, with full customization options.

## Basic Theming

### Light Mode (Default)

```tsx
import { Editor } from '@akincand/react-editor';

<Editor theme={{ mode: 'light' }} />
```

### Dark Mode

```tsx
<Editor theme={{ mode: 'dark' }} />
```

## Dynamic Theme Switching

### With State

```tsx
import { useState } from 'react';
import { Editor } from '@akincand/react-editor';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <button onClick={() => setIsDark(!isDark)}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
      <Editor theme={{ mode: isDark ? 'dark' : 'light' }} />
    </>
  );
}
```

### Using Theme Hook

```tsx
import { Editor, EditorProvider, useEditorTheme } from '@akincand/react-editor';

function ThemeToggle() {
  const { theme, toggleTheme } = useEditorTheme();

  return (
    <button onClick={toggleTheme}>
      Toggle Theme (Current: {theme.mode})
    </button>
  );
}

function App() {
  return (
    <EditorProvider>
      <ThemeToggle />
      <Editor />
    </EditorProvider>
  );
}
```

## Custom Colors

### Basic Customization

```tsx
<Editor
  theme={{
    mode: 'dark',
    colors: {
      background: '#1a1a1a',
      text: '#ffffff',
      border: '#333333',
      toolbar: '#2a2a2a',
      hover: '#3a3a3a'
    }
  }}
/>
```

### Color Definitions

```typescript
interface EditorTheme {
  mode: 'light' | 'dark';
  colors?: {
    background?: string;    // Editor background
    text?: string;          // Text color
    border?: string;        // Border color
    toolbar?: string;       // Toolbar background
    hover?: string;         // Hover state color
  };
}
```

## Theme Examples

### Dracula Theme

```tsx
<Editor
  theme={{
    mode: 'dark',
    colors: {
      background: '#282a36',
      text: '#f8f8f2',
      border: '#44475a',
      toolbar: '#21222c',
      hover: '#44475a'
    }
  }}
/>
```

### Solarized Light

```tsx
<Editor
  theme={{
    mode: 'light',
    colors: {
      background: '#fdf6e3',
      text: '#657b83',
      border: '#eee8d5',
      toolbar: '#eee8d5',
      hover: '#93a1a1'
    }
  }}
/>
```

### Nord Theme

```tsx
<Editor
  theme={{
    mode: 'dark',
    colors: {
      background: '#2e3440',
      text: '#eceff4',
      border: '#3b4252',
      toolbar: '#3b4252',
      hover: '#434c5e'
    }
  }}
/>
```

### GitHub Theme

```tsx
<Editor
  theme={{
    mode: 'light',
    colors: {
      background: '#ffffff',
      text: '#24292f',
      border: '#d0d7de',
      toolbar: '#f6f8fa',
      hover: '#f3f4f6'
    }
  }}
/>
```

## System Theme Detection

### Auto-detect System Preference

```tsx
import { useEffect, useState } from 'react';
import { Editor } from '@akincand/react-editor';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return <Editor theme={{ mode: theme }} />;
}
```

### With Local Storage

```tsx
import { useEffect, useState } from 'react';
import { Editor } from '@akincand/react-editor';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Get from localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved as 'light' | 'dark';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <Editor theme={{ mode: theme }} />
    </>
  );
}
```

## Advanced Theming

### CSS Variables

You can use CSS variables for more control:

```css
/* styles.css */
.my-editor {
  --editor-bg: #ffffff;
  --editor-text: #000000;
  --editor-border: #e5e7eb;
}

.my-editor.dark {
  --editor-bg: #1e1e1e;
  --editor-text: #ffffff;
  --editor-border: #374151;
}
```

```tsx
<Editor
  className="my-editor"
  theme={{ mode: 'light' }}
/>
```

### CSS Classes

You can add custom CSS classes for additional styling:

```tsx
<Editor
  className="my-custom-editor"
  theme={{ mode: 'dark' }}
/>
```

```css
.my-custom-editor {
  border: 2px solid #3b82f6;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Custom Wrapper

```tsx
function ThemedEditor({ mode }: { mode: 'light' | 'dark' }) {
  return (
    <div className={`editor-wrapper ${mode}`}>
      <Editor theme={{ mode }} />
      <style jsx>{`
        .editor-wrapper.light {
          background: #ffffff;
          border: 1px solid #e5e7eb;
        }
        .editor-wrapper.dark {
          background: #1e1e1e;
          border: 1px solid #374151;
        }
      `}</style>
    </div>
  );
}
```

## Theme Presets

Create reusable theme presets:

```tsx
// themes.ts
export const themes = {
  light: {
    mode: 'light' as const,
    colors: {
      background: '#ffffff',
      text: '#000000',
      border: '#e5e7eb',
      toolbar: '#f9fafb',
      hover: '#f3f4f6'
    }
  },
  dark: {
    mode: 'dark' as const,
    colors: {
      background: '#1e1e1e',
      text: '#ffffff',
      border: '#374151',
      toolbar: '#2d2d2d',
      hover: '#3d3d3d'
    }
  },
  dracula: {
    mode: 'dark' as const,
    colors: {
      background: '#282a36',
      text: '#f8f8f2',
      border: '#44475a',
      toolbar: '#21222c',
      hover: '#44475a'
    }
  }
};

// Usage
<Editor theme={themes.dracula} />
```

## Responsive Theming

### Based on Screen Size

```tsx
import { useState, useEffect } from 'react';
import { Editor } from '@akincand/react-editor';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      // Dark mode on mobile, light on desktop
      const isMobile = window.innerWidth < 768;
      setTheme(isMobile ? 'dark' : 'light');
    };

    updateTheme();
    window.addEventListener('resize', updateTheme);
    return () => window.removeEventListener('resize', updateTheme);
  }, []);

  return <Editor theme={{ mode: theme }} />;
}
```

## Theme Context

### Global Theme Provider

```tsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light' as 'light' | 'dark',
  toggleTheme: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// Usage
function App() {
  const { theme } = useTheme();
  return <Editor theme={{ mode: theme }} />;
}

function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
```

## Best Practices

### 1. Consistent Theming

Use the same theme across your app:

```tsx
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={theme}>
      <YourAppHeader theme={theme} />
      <Editor theme={{ mode: theme }} />
      <YourAppFooter theme={theme} />
    </div>
  );
}
```

### 2. Persist User Preference

Always save theme preference:

```tsx
localStorage.setItem('theme', theme);
```

### 3. Smooth Transitions

Add CSS transitions:

```css
.react-editor * {
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}
```

### 4. Accessibility

Ensure sufficient contrast:

```tsx
// Good contrast ratios
const goodTheme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    text: '#000000'  // High contrast
  }
};
```

### 5. Test Both Themes

Always test your content in both light and dark modes.

## Troubleshooting

### Theme Not Applying

Make sure you're passing the theme prop correctly:

```tsx
// ❌ Wrong
<Editor />

// ✅ Correct
<Editor theme={{ mode: 'dark' }} />
```

### Colors Not Changing

Verify that the CSS is being loaded correctly:

```tsx
// Check if styles are imported
import { Editor } from '@akincand/react-editor';
// Styles should be automatically included
```

### Flashing on Load

Prevent theme flash:

```tsx
// Set theme before React renders
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}
```

## Next Steps

- [Configuration Guide](configuration.md)
- [API Reference](api-reference.md)
- [Examples](examples/basic.md)

