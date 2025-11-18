# Built-in Plugins

React Editor comes with 8 powerful built-in plugins.

## Overview

```tsx
import {
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin,
  alignmentPlugin,
  linksPlugin,
  videoPlugin,
  imagePlugin,
  colorPlugin,
  defaultPlugins  // All plugins combined
} from '@akincand/react-editor';
```

## Basic Formatting Plugin

Text formatting tools: bold, italic, underline, strikethrough.

### Features

| Button | Description | Shortcut | Command |
|--------|-------------|----------|---------|
| **B** | Bold text | Ctrl+B | `bold` |
| *I* | Italic text | Ctrl+I | `italic` |
| <u>U</u> | Underline text | Ctrl+U | `underline` |
| ~~S~~ | Strikethrough text | - | `strikeThrough` |

### Usage

```tsx
import { Editor, basicFormattingPlugin } from '@akincand/react-editor';

<Editor plugins={[basicFormattingPlugin]} />
```

### Commands

```tsx
// Bold
editor.execCommand('bold');

// Italic
editor.execCommand('italic');

// Underline
editor.execCommand('underline');

// Strikethrough
editor.execCommand('strikeThrough');
```

### Example

```tsx
import { useRef } from 'react';
import { Editor, basicFormattingPlugin, EditorInstance } from '@akincand/react-editor';

function App() {
  const editorRef = useRef<EditorInstance | null>(null);

  const makeBold = () => {
    // Programmatic bold
    document.execCommand('bold');
  };

  return (
    <>
      <button onClick={makeBold}>Make Bold</button>
      <Editor
        plugins={[basicFormattingPlugin]}
        onReady={(editor) => { editorRef.current = editor; }}
      />
    </>
  );
}
```

## Headings Plugin

Heading levels and paragraph formatting.

### Features

| Button | Description | Tag | Command |
|--------|-------------|-----|---------|
| **H1** | Heading 1 | `<h1>` | `formatBlock` |
| **H2** | Heading 2 | `<h2>` | `formatBlock` |
| **H3** | Heading 3 | `<h3>` | `formatBlock` |
| **P** | Paragraph | `<p>` | `formatBlock` |

### Usage

```tsx
import { Editor, headingsPlugin } from '@akincand/react-editor';

<Editor plugins={[headingsPlugin]} />
```

### Commands

```tsx
// Heading 1
editor.execCommand('formatBlock', '<h1>');

// Heading 2
editor.execCommand('formatBlock', '<h2>');

// Heading 3
editor.execCommand('formatBlock', '<h3>');

// Paragraph
editor.execCommand('formatBlock', '<p>');
```

### Example

```tsx
function App() {
  const insertHeading = (level: string) => {
    document.execCommand('formatBlock', false, `<h${level}>`);
  };

  return (
    <>
      <button onClick={() => insertHeading('1')}>H1</button>
      <button onClick={() => insertHeading('2')}>H2</button>
      <button onClick={() => insertHeading('3')}>H3</button>
      <Editor plugins={[headingsPlugin]} />
    </>
  );
}
```

## Lists Plugin

Bullet and numbered lists.

### Features

| Button | Description | Tag | Command |
|--------|-------------|-----|---------|
| • List | Bullet list | `<ul>` | `insertUnorderedList` |
| 1. List | Numbered list | `<ol>` | `insertOrderedList` |

### Usage

```tsx
import { Editor, listsPlugin } from '@akincand/react-editor';

<Editor plugins={[listsPlugin]} />
```

### Commands

```tsx
// Bullet list
editor.execCommand('insertUnorderedList');

// Numbered list
editor.execCommand('insertOrderedList');
```

### Example

```tsx
function App() {
  const createList = (ordered: boolean) => {
    const command = ordered ? 'insertOrderedList' : 'insertUnorderedList';
    document.execCommand(command);
  };

  return (
    <>
      <button onClick={() => createList(false)}>Bullet List</button>
      <button onClick={() => createList(true)}>Numbered List</button>
      <Editor plugins={[listsPlugin]} />
    </>
  );
}
```

## Alignment Plugin

Text alignment options.

### Features

| Button | Description | Command |
|--------|-------------|---------|
| ⬅️ | Align left | `justifyLeft` |
| ⬆️ | Align center | `justifyCenter` |
| ➡️ | Align right | `justifyRight` |
| ↔️ | Justify | `justifyFull` |

### Usage

```tsx
import { Editor, alignmentPlugin } from '@akincand/react-editor';

<Editor plugins={[alignmentPlugin]} />
```

### Commands

```tsx
// Left
editor.execCommand('justifyLeft');

// Center
editor.execCommand('justifyCenter');

// Right
editor.execCommand('justifyRight');

// Justify
editor.execCommand('justifyFull');
```

### Example

```tsx
function App() {
  const alignText = (alignment: string) => {
    const commands = {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight',
      justify: 'justifyFull'
    };
    document.execCommand(commands[alignment as keyof typeof commands]);
  };

  return (
    <>
      <button onClick={() => alignText('left')}>Left</button>
      <button onClick={() => alignText('center')}>Center</button>
      <button onClick={() => alignText('right')}>Right</button>
      <Editor plugins={[alignmentPlugin]} />
    </>
  );
}
```

## Links Plugin

Create and remove hyperlinks.

### Features

| Button | Description | Command |
|--------|-------------|---------|
| 🔗 | Insert link | `createLink` |
| ❌ | Remove link | `unlink` |

### Usage

```tsx
import { Editor, linksPlugin } from '@akincand/react-editor';

<Editor plugins={[linksPlugin]} />
```

### Commands

```tsx
// Create link
editor.execCommand('createLink', 'https://example.com');

// Remove link
editor.execCommand('unlink');
```

### Example

```tsx
function App() {
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  };

  const removeLink = () => {
    document.execCommand('unlink');
  };

  return (
    <>
      <button onClick={insertLink}>Insert Link</button>
      <button onClick={removeLink}>Remove Link</button>
      <Editor plugins={[linksPlugin]} />
    </>
  );
}
```

## Default Plugins

All built-in plugins combined.

### Usage

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

<Editor plugins={defaultPlugins} />
```

Equivalent to:

```tsx
import {
  Editor,
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin,
  alignmentPlugin,
  linksPlugin
} from '@akincand/react-editor';

<Editor
  plugins={[
    basicFormattingPlugin,
    headingsPlugin,
    listsPlugin,
    alignmentPlugin,
    linksPlugin
  ]}
/>
```

## Mixing Plugins

### With Custom Plugins

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';
import { myCustomPlugin } from './my-plugin';

<Editor
  plugins={[
    ...defaultPlugins,
    myCustomPlugin
  ]}
/>
```

### Selective Usage

```tsx
import {
  Editor,
  basicFormattingPlugin,
  headingsPlugin
} from '@akincand/react-editor';

// Only basic formatting and headings
<Editor
  plugins={[
    basicFormattingPlugin,
    headingsPlugin
  ]}
/>
```

## Plugin Internals

### Basic Formatting Plugin Source

```tsx
export const basicFormattingPlugin: EditorPlugin = {
  name: 'basicFormatting',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'bold',
      label: 'B',
      title: 'Bold (Ctrl+B)',
      command: 'bold',
      group: 'formatting',
      order: 1,
      icon: <span className="font-bold">B</span>,
      isActive: () => document.queryCommandState('bold')
    },
    // ... more buttons
  ],
  
  commands: [
    {
      name: 'bold',
      execute: () => document.execCommand('bold', false),
      canExecute: () => true
    },
    // ... more commands
  ],
  
  shortcuts: [
    {
      key: 'b',
      ctrlKey: true,
      handler: () => document.execCommand('bold', false)
    },
    // ... more shortcuts
  ]
};
```

## Customizing Built-in Plugins

You can't modify built-in plugins directly, but you can:

### 1. Create Similar Plugin

```tsx
import { EditorPlugin } from '@akincand/react-editor';

const myBoldPlugin: EditorPlugin = {
  name: 'myBold',
  toolbarButtons: [{
    id: 'my-bold',
    label: '🅱️',  // Custom icon
    title: 'My Bold Button',
    onClick: () => document.execCommand('bold')
  }]
};
```

### 2. Wrap Existing Plugin

```tsx
import { basicFormattingPlugin } from '@akincand/react-editor';

const enhancedFormattingPlugin: EditorPlugin = {
  ...basicFormattingPlugin,
  name: 'enhancedFormatting',
  onLoad: (context) => {
    // Call original onLoad
    basicFormattingPlugin.onLoad?.(context);
    
    // Add your enhancements
    console.log('Enhanced plugin loaded!');
  }
};
```

## Next Steps

- [Creating Custom Plugins](creating-plugins.md)
- [Plugin API Reference](plugin-api.md)
- [Publishing Plugins](publishing-plugins.md)

