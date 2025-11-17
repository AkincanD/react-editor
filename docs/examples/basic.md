# Basic Usage Examples

Simple examples to get started with React Editor.

## Minimal Setup

The simplest way to use React Editor:

```tsx
import { Editor } from '@akincand/react-editor';

function App() {
  return <Editor />;
}
```

## With Default Plugins

Add all built-in plugins:

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor plugins={defaultPlugins} />
  );
}
```

## With State Management

Track content changes:

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('');

  return (
    <>
      <Editor
        plugins={defaultPlugins}
        onChange={setContent}
      />
      <div>
        <h3>Content Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
}
```

## With Initial Content

Set default content:

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      defaultContent="<h1>Welcome!</h1><p>Start editing...</p>"
    />
  );
}
```

## With Custom Placeholder

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      placeholder="Write something amazing..."
    />
  );
}
```

## Read-Only Mode

Display content without editing:

```tsx
import { Editor } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      defaultContent="<p>This is read-only content.</p>"
      readOnly={true}
    />
  );
}
```

## With Auto-Focus

Focus editor on mount:

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      autoFocus={true}
    />
  );
}
```

## With Custom Height

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      height="500px"
      minHeight="200px"
      maxHeight="800px"
    />
  );
}
```

## With Event Handlers

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      onChange={(content) => {
        console.log('Content changed:', content);
      }}
      onFocus={() => {
        console.log('Editor focused');
      }}
      onBlur={() => {
        console.log('Editor blurred');
      }}
      onReady={(editor) => {
        console.log('Editor ready:', editor);
      }}
    />
  );
}
```

## With Theme

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <button onClick={() => setIsDark(!isDark)}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
      <Editor
        plugins={defaultPlugins}
        theme={{ mode: isDark ? 'dark' : 'light' }}
      />
    </>
  );
}
```

## Controlled Editor

Full control over editor state:

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('<p>Hello World!</p>');

  const clearContent = () => setContent('');
  const resetContent = () => setContent('<p>Reset!</p>');

  return (
    <>
      <button onClick={clearContent}>Clear</button>
      <button onClick={resetContent}>Reset</button>
      <Editor
        plugins={defaultPlugins}
        defaultContent={content}
        onChange={setContent}
      />
    </>
  );
}
```

## Using Editor Instance

Access editor methods:

```tsx
import { useRef } from 'react';
import { Editor, defaultPlugins, EditorInstance } from '@akincand/react-editor';

function App() {
  const editorRef = useRef<EditorInstance | null>(null);

  const insertText = () => {
    if (editorRef.current) {
      editorRef.current.insertHTML('<p>Inserted text!</p>');
    }
  };

  const clearEditor = () => {
    if (editorRef.current) {
      editorRef.current.clear();
    }
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <>
      <button onClick={insertText}>Insert Text</button>
      <button onClick={clearEditor}>Clear</button>
      <button onClick={focusEditor}>Focus</button>
      <Editor
        plugins={defaultPlugins}
        onReady={(editor) => { editorRef.current = editor; }}
      />
    </>
  );
}
```

## Form Integration

Use editor in a form:

```tsx
import { useState, FormEvent } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', content);
    // Send to API
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Article Content:</label>
      <Editor
        plugins={defaultPlugins}
        onChange={setContent}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Multiple Editors

Use multiple editors on the same page:

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');

  return (
    <>
      <h2>Editor 1</h2>
      <Editor
        plugins={defaultPlugins}
        onChange={setContent1}
      />

      <h2>Editor 2</h2>
      <Editor
        plugins={defaultPlugins}
        onChange={setContent2}
      />

      <div>
        <p>Editor 1 length: {content1.length}</p>
        <p>Editor 2 length: {content2.length}</p>
      </div>
    </>
  );
}
```

## With Custom Styling

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <div className="my-editor-wrapper">
      <Editor
        plugins={defaultPlugins}
        className="border-2 border-blue-500 rounded-lg"
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  );
}
```

## Auto-Save

Implement auto-save functionality:

```tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const saveContent = useCallback(async (content: string) => {
    try {
      // Save to API
      await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ content })
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Save failed:', error);
    }
  }, []);

  const handleChange = useCallback((newContent: string) => {
    setContent(newContent);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new auto-save timeout
    timeoutRef.current = setTimeout(() => {
      saveContent(newContent);
    }, 2000); // Save after 2 seconds of inactivity
  }, [saveContent]);

  return (
    <>
      {lastSaved && (
        <p>Last saved: {lastSaved.toLocaleTimeString()}</p>
      )}
      <Editor
        plugins={defaultPlugins}
        onChange={handleChange}
      />
    </>
  );
}
```

## Character Counter

Display character and word count:

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('');

  const getStats = () => {
    const text = content.replace(/<[^>]*>/g, ''); // Strip HTML
    const chars = text.length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return { chars, words };
  };

  const { chars, words } = getStats();

  return (
    <>
      <Editor
        plugins={defaultPlugins}
        onChange={setContent}
      />
      <div className="stats">
        <span>{words} words</span>
        <span>{chars} characters</span>
      </div>
    </>
  );
}
```

## Next Steps

- [Advanced Examples](advanced.md)
- [Next.js Integration](nextjs.md)
- [Custom Plugin Example](custom-plugin.md)

