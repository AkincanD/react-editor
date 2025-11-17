# Basic Usage

Learn the fundamentals of using React Editor in your application.

## Simple Editor

The most basic editor setup:

```tsx
import { Editor, defaultPlugins } from 'react-editor';

function MyEditor() {
  return <Editor plugins={defaultPlugins} />;
}
```

## With Placeholder

Add a placeholder text:

```tsx
<Editor
  plugins={defaultPlugins}
  placeholder="Write something amazing..."
/>
```

## Handling Content Changes

Listen to content changes:

```tsx
function MyEditor() {
  const [content, setContent] = useState('');

  return (
    <Editor
      plugins={defaultPlugins}
      onChange={(newContent) => {
        setContent(newContent);
        console.log('Content:', newContent);
      }}
    />
  );
}
```

## Initial Content

Set initial content:

```tsx
<Editor
  plugins={defaultPlugins}
  defaultContent="<h1>Welcome!</h1><p>Start editing...</p>"
/>
```

## Read-Only Mode

Make the editor read-only:

```tsx
<Editor
  plugins={defaultPlugins}
  readOnly={true}
  defaultContent="<p>This content cannot be edited.</p>"
/>
```

## Custom Height

Control the editor height:

```tsx
<Editor
  plugins={defaultPlugins}
  height="600px"
  minHeight="300px"
  maxHeight="1000px"
/>
```

## Auto Focus

Automatically focus the editor on mount:

```tsx
<Editor
  plugins={defaultPlugins}
  autoFocus={true}
/>
```

## Event Handlers

Handle various events:

```tsx
<Editor
  plugins={defaultPlugins}
  onChange={(content) => console.log('Changed:', content)}
  onFocus={() => console.log('Editor focused')}
  onBlur={() => console.log('Editor blurred')}
  onReady={(editor) => console.log('Editor ready:', editor)}
/>
```

## Accessing Editor Instance

Get a reference to the editor instance:

```tsx
import { useRef } from 'react';
import { Editor, EditorInstance } from 'react-editor';

function MyEditor() {
  const editorRef = useRef<EditorInstance | null>(null);

  const handleReady = (editor: EditorInstance) => {
    editorRef.current = editor;
  };

  const insertText = () => {
    if (editorRef.current) {
      editorRef.current.insertHTML('<p>New content</p>');
    }
  };

  return (
    <>
      <button onClick={insertText}>Insert Text</button>
      <Editor
        plugins={defaultPlugins}
        onReady={handleReady}
      />
    </>
  );
}
```

## Selecting Plugins

Choose which plugins to use:

```tsx
import { 
  Editor,
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin
} from 'react-editor';

<Editor
  plugins={[
    basicFormattingPlugin,
    headingsPlugin,
    listsPlugin
  ]}
/>
```

## Styling

Add custom styles:

```tsx
<Editor
  plugins={defaultPlugins}
  className="my-custom-editor"
  style={{ border: '2px solid #ccc' }}
/>
```

## Complete Example

Here's a complete example combining multiple features:

```tsx
import { useState, useRef } from 'react';
import { 
  Editor, 
  defaultPlugins,
  EditorInstance 
} from 'react-editor';

function CompleteEditor() {
  const [content, setContent] = useState('');
  const editorRef = useRef<EditorInstance | null>(null);

  const handleSave = () => {
    console.log('Saving content:', content);
    // Save to backend
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.clear();
    }
  };

  return (
    <div>
      <div className="toolbar-actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      <Editor
        plugins={defaultPlugins}
        placeholder="Start writing..."
        defaultContent="<p>Hello World!</p>"
        height="500px"
        autoFocus
        onChange={setContent}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
      />

      <div className="stats">
        Characters: {content.replace(/<[^>]*>/g, '').length}
      </div>
    </div>
  );
}
```

## Next Steps

- Learn about [Configuration Options](configuration.md)
- Explore [Theming](theming.md)
- Create [Custom Plugins](plugins/creating-plugins.md)

