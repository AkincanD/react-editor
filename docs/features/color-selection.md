# Color Selection

React Editor includes a powerful color selection feature that allows users to apply text and background colors to selected text.

## Overview

The color plugin provides two toolbar buttons with dropdown color pickers:
- **Text Color**: Changes the color of the selected text
- **Background Color**: Changes the background color of the selected text

Both buttons open a lightweight dropdown color picker (not a modal) with:
- Predefined color palette (24 colors in a 4x6 grid)
- "More Colors" button for custom color selection
- HTML5 color input for precise color selection
- Hex color code input field
- "No Color" option for background (transparent)
- Fast, lightweight, and non-intrusive

## Usage

The color plugin is included in `defaultPlugins`:

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
    />
  );
}
```

### Standalone Usage

You can also use the color plugin separately:

```tsx
import { Editor, colorPlugin } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={[colorPlugin]}
    />
  );
}
```

## Features

### Text Color

1. Select text in the editor
2. Click the **Text Color** button (A icon) in the toolbar
3. Choose a color from the palette or use the color picker
4. Click **Apply** to apply the color

### Background Color

1. Select text in the editor
2. Click the **Background Color** button (⬛ icon) in the toolbar
3. Choose a color from the palette or use the color picker
4. Click **Apply** to apply the background color

## Color Picker Dropdown

The color picker dropdown (not a modal) includes:

### HTML5 Color Input
- Click the color square to open the native color picker
- Supports all standard color formats

### Hex Code Input
- Type or paste hex color codes directly
- Validates input format (#RRGGBB)
- Updates color picker automatically

### Color Palette
- 30 predefined colors
- Quick access to common colors
- Visual feedback when selected

## Active State Detection

The color buttons show an active state when:
- **Text Color**: Selected text has a non-default color (not black)
- **Background Color**: Selected text has a non-default background (not white/transparent)

## Examples

### Basic Usage

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      defaultContent="<p>Select this text and change its color!</p>"
    />
  );
}
```

### Custom Color Plugin

```tsx
import { Editor, EditorPlugin } from '@akincand/react-editor';

const customColorPlugin: EditorPlugin = {
  name: 'customColor',
  version: '1.0.0',
  toolbarButtons: [
    {
      id: 'customTextColor',
      label: '🎨',
      title: 'Custom Text Color',
      onClick: () => {
        const color = prompt('Enter color (hex):', '#FF0000');
        if (color) {
          document.execCommand('foreColor', false, color);
        }
      }
    }
  ]
};

function App() {
  return (
    <Editor
      plugins={[customColorPlugin]}
    />
  );
}
```

## Commands

The color plugin registers two commands:

### foreColor
Sets the text color of the selected text.

```tsx
import { useEditor } from '@akincand/react-editor';

function MyComponent() {
  const { execCommand } = useEditor();
  
  const setRedText = () => {
    execCommand('foreColor', '#FF0000');
  };
  
  return <button onClick={setRedText}>Make Text Red</button>;
}
```

### backColor
Sets the background color of the selected text.

```tsx
import { useEditor } from '@akincand/react-editor';

function MyComponent() {
  const { execCommand } = useEditor();
  
  const setYellowBackground = () => {
    execCommand('backColor', '#FFFF00');
  };
  
  return <button onClick={setYellowBackground}>Highlight Yellow</button>;
}
```

## Color Formats

The color plugin accepts colors in various formats:

- **Hex**: `#FF0000`, `#f00`
- **RGB**: `rgb(255, 0, 0)`
- **RGBA**: `rgba(255, 0, 0, 0.5)`
- **Named Colors**: `red`, `blue`, `green`

> **Note**: The color picker uses hex format internally, but the commands accept any valid CSS color value.

## Styling

The color picker dropdown uses the editor's theme (light/dark mode) and is designed to be lightweight and fast. It appears as a popover below the button, not as a modal overlay.

### Custom Styling

You can customize the color picker appearance using CSS:

```css
/* Customize color palette grid */
.reactEditor_modal .reactEditor_formGroup div[style*="grid-template-columns"] {
  gap: 12px !important;
}

/* Customize color input */
.reactEditor_modal input[type="color"] {
  width: 80px !important;
  height: 50px !important;
}
```

## Best Practices

1. **Select Text First**: Always select text before applying colors
2. **Use Contrast**: Ensure sufficient contrast between text and background colors for readability
3. **Accessibility**: Consider colorblind users when choosing color combinations
4. **Consistency**: Use a consistent color scheme throughout your content

## Troubleshooting

### Colors Not Applying

- Ensure text is selected before clicking the color button
- Check browser console for errors
- Verify the color format is valid

### Active State Not Showing

- The active state only shows when text has a non-default color
- Try selecting text with a different color
- Check that the selection is within the editor

### Color Picker Not Opening

- Ensure the color plugin is included in your plugins array
- Check that the button is rendered in the toolbar
- Verify there are no z-index conflicts

## Related Documentation

- [Built-in Plugins](../plugins/built-in-plugins.md)
- [Creating Custom Plugins](../plugins/creating-plugins.md)
- [Toolbar Active States](./toolbar-active-states.md)

