# Link Insertion

React Editor provides an elegant link insertion feature with a beautiful modal interface, replacing the traditional browser prompt with a user-friendly dialog.

## Features

- 🔗 **Modal Interface**: Beautiful modal instead of browser alerts
- ✏️ **Custom Text**: Optionally specify link text
- 🎯 **Smart Insertion**: Works with selected text or creates new links
- 🌐 **External Links**: Automatically adds `target="_blank"` and security attributes
- 🎨 **Theme Support**: Modal respects editor's light/dark theme
- ⌨️ **Keyboard Navigation**: ESC to close, auto-focus on URL field

## Basic Usage

The links plugin is included in `defaultPlugins`:

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

## Creating Links

### Method 1: Link Selected Text

1. Select the text you want to turn into a link
2. Click the **Link** button in the toolbar (🔗 icon)
3. Enter the URL in the modal
4. Click "Insert Link"

The selected text will be wrapped in a link.

### Method 2: Insert New Link

1. Place your cursor where you want to insert a link
2. Click the **Link** button
3. Enter the URL
4. Optionally enter link text (if empty, URL will be used as text)
5. Click "Insert Link"

A new link will be inserted at the cursor position.

## Link Modal

The link insertion modal provides two fields:

### URL Field (Required)
- Enter the full URL (e.g., `https://example.com`)
- Validation ensures URL is not empty
- Auto-focuses when modal opens

### Link Text Field (Optional)
- Custom display text for the link
- If empty and no text is selected, URL will be used as text
- If text is already selected, this field is ignored

## Removing Links

To remove a link:

1. Place cursor inside the link
2. Click the **Unlink** button (🔗❌ icon)

The link will be removed, leaving just the text.

## Examples

### Basic Link Editor

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function LinkEditor() {
  return (
    <Editor
      plugins={defaultPlugins}
      defaultContent="<p>Select this text and add a link</p>"
      placeholder="Start typing..."
    />
  );
}
```

### Custom Link Plugin

```tsx
import { EditorPlugin } from '@akincand/react-editor';

const customLinkPlugin: EditorPlugin = {
  name: 'custom-links',
  version: '1.0.0',
  
  onLoad: (context) => {
    // Register custom link command
    context.registerCommand({
      name: 'insertLink',
      execute: (url?: string) => {
        if (url) {
          const html = `<a href="${url}" class="custom-link">${url}</a>`;
          context.insertContent(html);
        }
      }
    });
  },
  
  toolbarButtons: [
    {
      id: 'custom-link',
      label: 'Custom Link',
      title: 'Insert Custom Link',
      onClick: () => {
        const url = prompt('Enter URL:');
        if (url) {
          context.execCommand('insertLink', url);
        }
      }
    }
  ]
};
```

### Programmatic Link Insertion

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';
import { useRef } from 'react';

function ProgrammaticLinks() {
  const editorRef = useRef(null);
  
  const insertExampleLink = () => {
    if (editorRef.current) {
      const html = '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Example Website</a>';
      editorRef.current.insertHTML(html);
    }
  };
  
  return (
    <>
      <button onClick={insertExampleLink}>
        Insert Example Link
      </button>
      <Editor
        plugins={defaultPlugins}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
      />
    </>
  );
}
```

## Link Styling

Customize link appearance with CSS:

```css
/* Default link styling in editor */
.reactEditor_contentEditable a {
  color: #2563eb;
  text-decoration: underline;
  transition: color 0.2s;
}

.reactEditor_contentEditable a:hover {
  color: #1d4ed8;
}

/* Dark mode links */
.reactEditor_dark .reactEditor_contentEditable a {
  color: #60a5fa;
}

.reactEditor_dark .reactEditor_contentEditable a:hover {
  color: #93c5fd;
}

/* Custom link styles */
.reactEditor_contentEditable a.custom-link {
  color: #059669;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid #059669;
}
```

## Security Features

All links created through the modal include security attributes:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Link Text
</a>
```

- `target="_blank"`: Opens in new tab
- `rel="noopener"`: Prevents access to `window.opener`
- `rel="noreferrer"`: Doesn't send referrer information

## Modal Customization

The link modal uses the editor's built-in Modal component:

```tsx
import { Modal } from '@akincand/react-editor';

function CustomModal() {
  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      title="Custom Title"
    >
      <div>Your content here</div>
    </Modal>
  );
}
```

## Keyboard Shortcuts

- **ESC**: Close the modal without inserting
- **Enter**: Submit form (when URL field is focused)
- **Click Outside**: Close modal

## Accessibility

- Modal is keyboard navigable
- Auto-focus on URL field when opened
- ESC key closes modal
- Click outside modal closes it
- Proper ARIA labels on form elements
- Focus is returned to editor after closing

## API Reference

### Links Plugin

```typescript
import { linksPlugin } from '@akincand/react-editor';

// Plugin is included in defaultPlugins
// Or use it separately:
<Editor plugins={[linksPlugin]} />
```

### LinkModalWrapper

```typescript
import { LinkModalWrapper } from '@akincand/react-editor';

// Automatically included in Editor component
// For custom implementations:
<LinkModalWrapper />
```

### Commands

**createLink**
```typescript
editor.execCommand('createLink', 'https://example.com');
```

**unlink**
```typescript
editor.execCommand('unlink');
```

## Best Practices

1. **Full URLs**: Always use complete URLs with protocol (https://)
2. **Descriptive Text**: Use meaningful link text instead of "click here"
3. **Security**: The modal automatically adds security attributes
4. **Testing**: Test links after insertion to ensure they work
5. **Accessibility**: Provide context for screen readers

## Troubleshooting

### Modal Not Opening

- Check that links plugin is loaded
- Verify no JavaScript errors in console
- Ensure editor is not in read-only mode

### Links Not Clickable in Editor

- Links in `contentEditable` areas are not clickable by design
- Use "View Source" button to see generated HTML
- Test in final rendered output

### Styling Not Applied

- Ensure editor CSS is loaded
- Check for conflicting CSS rules
- Use browser DevTools to inspect elements

## Related

- [Video Embedding](./video-embedding.md)
- [Modal Component](../components/modal.md)
- [Plugin Development](../plugins/creating-plugins.md)
- [Toolbar Customization](../customization/toolbar.md)

