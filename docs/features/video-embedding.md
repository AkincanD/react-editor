# Video Embedding

React Editor includes a powerful video embedding feature that allows you to easily insert videos from popular platforms like YouTube and Vimeo directly into your content.

## Features

- 🎥 **YouTube & Vimeo Support**: Automatically detects and embeds videos from YouTube and Vimeo
- 📱 **Responsive by Default**: Videos are responsive (16:9 aspect ratio) by default
- 🎨 **Custom Dimensions**: Advanced options allow custom width and height
- 🎯 **Smart Insertion**: Inserts video at cursor position or beginning of content
- 🖼️ **Beautiful Modal**: User-friendly modal interface (no browser alerts)
- 🔧 **iframe-based**: Lightweight iframe embedding for optimal performance

## Basic Usage

The video plugin is included in `defaultPlugins`:

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

## Using Video Plugin

Click the **Video** button in the toolbar (📹 icon) to open the video insertion modal.

### Supported URL Formats

**YouTube:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

**Vimeo:**
- `https://vimeo.com/VIDEO_ID`
- `https://player.vimeo.com/video/VIDEO_ID`

## Responsive Videos (Default)

By default, videos are embedded with a responsive 16:9 aspect ratio:

```tsx
// Automatically generated HTML:
<div class="reactEditor_videoWrapper">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
```

The video automatically scales to fit its container while maintaining aspect ratio.

## Custom Dimensions

Enable **Advanced Options** in the modal to specify custom dimensions:

1. Check "Advanced Options"
2. Enter custom width (e.g., `640px`, `100%`, `80vw`)
3. Enter custom height (e.g., `360px`, `480px`)

Example with custom dimensions:

```tsx
// Generated HTML with custom dimensions:
<div class="reactEditor_videoWrapper" style="width: 640px; padding-bottom: 0; height: 360px;">
  <iframe src="..." allowfullscreen></iframe>
</div>
```

## Programmatic Video Insertion

You can create custom plugins that insert videos programmatically:

```tsx
import { EditorPlugin, PluginContext } from '@akincand/react-editor';

const customVideoPlugin: EditorPlugin = {
  name: 'custom-video',
  version: '1.0.0',
  
  onLoad: (context: PluginContext) => {
    // Insert a YouTube video
    const insertVideo = () => {
      const videoHtml = `
        <div class="reactEditor_videoWrapper">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      `;
      
      context.insertContent(videoHtml);
    };
    
    // Register custom command
    context.registerCommand({
      name: 'insertCustomVideo',
      execute: insertVideo
    });
  },
  
  toolbarButtons: [
    {
      id: 'custom-video',
      label: '📺',
      title: 'Insert Demo Video',
      onClick: () => {
        // Execute custom command
      }
    }
  ]
};
```

## Styling

Videos use the `reactEditor_videoWrapper` class for responsive styling. You can customize the appearance:

```css
/* Override video styling */
.reactEditor_contentEditable .reactEditor_videoWrapper {
  margin: 2em 0; /* Add more spacing */
  border-radius: 12px; /* Rounder corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow */
}

.reactEditor_contentEditable .reactEditor_videoWrapper iframe {
  border-radius: 12px;
}
```

## Video Modal Customization

The video insertion modal uses the editor's built-in modal component with theme support:

```tsx
import { Modal } from '@akincand/react-editor';

// Use the Modal component in custom plugins
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Insert Video"
>
  {/* Your custom content */}
</Modal>
```

## Accessibility

Videos embedded through this plugin include:

- `allowfullscreen` attribute for fullscreen viewing
- Proper iframe attributes for media playback
- Theme-aware modal with keyboard navigation (ESC to close)
- Focus management in the modal

## Security

- All video URLs are parsed and validated
- Only YouTube and Vimeo URLs are accepted
- Videos are embedded via official embed URLs
- `rel="noopener noreferrer"` is not needed for iframes (unlike links)

## Browser Compatibility

Video embedding works in all modern browsers that support:
- HTML5 `<iframe>` element
- CSS flexbox and positioning
- Modern JavaScript (ES6+)

## Examples

### Basic Video Insertion

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function VideoEditor() {
  return (
    <Editor
      plugins={defaultPlugins}
      defaultContent="<p>Check out this video:</p>"
      placeholder="Click the video button to insert a video..."
    />
  );
}
```

### Custom Video Button

```tsx
import { Editor, defaultPlugins, videoPlugin } from '@akincand/react-editor';

function CustomVideoEditor() {
  // Remove default video plugin and add your custom one
  const customPlugins = defaultPlugins.filter(p => p.name !== 'video');
  
  return (
    <Editor
      plugins={[...customPlugins, myCustomVideoPlugin]}
      placeholder="Start typing..."
    />
  );
}
```

### Video with Debug Console

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function DebugVideoEditor() {
  return (
    <Editor
      plugins={defaultPlugins}
      debugConsole={true} // See video insertion logs
      placeholder="Insert videos and see debug logs..."
    />
  );
}
```

## Best Practices

1. **Use Responsive Mode**: Leave dimensions empty for responsive videos that work on all screen sizes
2. **Valid URLs**: Always use official video URLs from YouTube or Vimeo
3. **Cursor Position**: Click where you want the video before opening the modal
4. **Accessibility**: Provide context around videos with text descriptions
5. **Performance**: Videos use lazy loading via iframe for optimal performance

## Troubleshooting

### Video Not Inserting

- Ensure the URL is a valid YouTube or Vimeo URL
- Check that you have the video plugin enabled
- Verify the editor is not in read-only mode

### Video Not Displaying

- Check if the video ID is valid
- Ensure the video is not private or restricted
- Verify iframe permissions in your application

### Styling Issues

- Make sure the editor's CSS is properly loaded
- Check for CSS conflicts with your application's styles
- Use browser DevTools to inspect the video wrapper element

## API Reference

### Video Plugin

```typescript
import { videoPlugin } from '@akincand/react-editor';

// Plugin is included in defaultPlugins
// Or use it separately:
<Editor plugins={[videoPlugin]} />
```

### VideoModalWrapper

```typescript
import { VideoModalWrapper } from '@akincand/react-editor';

// Automatically included in Editor component
// For custom implementations:
<VideoModalWrapper />
```

## Related

- [Link Insertion](./link-insertion.md)
- [Modal Component](../components/modal.md)
- [Plugin Development](../plugins/creating-plugins.md)
- [Custom Toolbar](../customization/toolbar.md)

