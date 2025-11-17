# Custom Plugin Example

Learn how to create your own plugins for React Editor.

## 🎮 Live Demo

<iframe 
  src="https://stackblitz.com/edit/rich-react-editor?embed=1&file=src%2FApp.tsx&hideExplorer=1&hideNavigation=1&theme=dark&view=preview"
  style="width: 100%; height: 600px; border: 0; border-radius: 8px; overflow: hidden;"
  title="React Editor Custom Plugin Demo"
></iframe>

[Open in StackBlitz →](https://stackblitz.com/edit/rich-react-editor)

## Plugin Structure

A plugin is an object that implements the `EditorPlugin` interface:

```tsx
import { EditorPlugin } from '@akincand/react-editor';

export const myPlugin: EditorPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  toolbarButtons: [],
  commands: [],
  shortcuts: [],
  onLoad: (context) => {
    // Initialize plugin
  }
};
```

## Simple Plugin Example

### Emoji Picker Plugin

```tsx
import React from 'react';
import { EditorPlugin, PluginContext } from '@akincand/react-editor';

export const emojiPlugin: EditorPlugin = {
  name: 'emoji',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'emoji',
      label: 'Emoji',
      title: 'Insert Emoji',
      group: 'insert',
      order: 1,
      icon: (
        <span style={{ fontSize: '16px' }}>😀</span>
      ),
      onClick: () => {
        const emoji = prompt('Enter emoji or choose: 😀 😎 👍 ❤️ 🎉');
        if (emoji) {
          document.execCommand('insertText', false, emoji);
        }
      }
    }
  ],
  
  onLoad: (context: PluginContext) => {
    console.log('Emoji plugin loaded!');
  }
};
```

### Usage

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';
import { emojiPlugin } from './emojiPlugin';

function App() {
  return (
    <Editor plugins={[...defaultPlugins, emojiPlugin]} />
  );
}
```

## Advanced Plugin Example

### Highlight Plugin

```tsx
import React from 'react';
import { EditorPlugin } from '@akincand/react-editor';

const COLORS = {
  yellow: '#ffeb3b',
  green: '#4caf50',
  blue: '#2196f3',
  pink: '#e91e63',
  orange: '#ff9800'
};

export const highlightPlugin: EditorPlugin = {
  name: 'highlight',
  version: '1.0.0',
  
  toolbarButtons: Object.entries(COLORS).map(([color, hex], index) => ({
    id: `highlight-${color}`,
    label: color.charAt(0).toUpperCase() + color.slice(1),
    title: `Highlight ${color}`,
    group: 'formatting',
    order: 100 + index,
    icon: (
      <span style={{ 
        background: hex, 
        padding: '2px 6px', 
        borderRadius: '2px',
        color: color === 'yellow' ? '#000' : '#fff'
      }}>
        H
      </span>
    ),
    onClick: () => {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        document.execCommand(
          'hiliteColor',
          false,
          hex
        );
      }
    }
  })),
  
  commands: [
    {
      name: 'removeHighlight',
      execute: () => {
        document.execCommand('hiliteColor', false, 'transparent');
      },
      canExecute: () => true
    }
  ]
};
```

## Plugin with Modal

### Code Block Plugin

```tsx
import React, { useState } from 'react';
import { EditorPlugin } from '@akincand/react-editor';
import { Modal } from '@akincand/react-editor';

const CodeBlockModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInsert: (code: string, language: string) => void;
}> = ({ isOpen, onClose, onInsert }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleInsert = () => {
    onInsert(code, language);
    setCode('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Insert Code Block">
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          Code
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          rows={10}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleInsert} disabled={!code}>
          Insert
        </button>
      </div>
    </Modal>
  );
};

const codeBlockModalState = {
  isOpen: false,
  setIsOpen: (value: boolean) => {},
  insertContent: null as ((code: string, lang: string) => void) | null
};

export const codeBlockPlugin: EditorPlugin = {
  name: 'code-block',
  version: '1.0.0',
  
  onLoad: (context) => {
    codeBlockModalState.insertContent = (code: string, lang: string) => {
      const html = `
        <pre style="background: #2d2d2d; color: #f8f8f2; padding: 16px; border-radius: 8px; overflow-x: auto;">
          <code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
        </pre>
      `;
      context.insertContent(html);
    };
  },
  
  toolbarButtons: [
    {
      id: 'code-block',
      label: 'Code',
      title: 'Insert Code Block',
      group: 'insert',
      order: 10,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="16 18 22 12 16 6" strokeWidth="2" />
          <polyline points="8 6 2 12 8 18" strokeWidth="2" />
        </svg>
      ),
      onClick: () => {
        codeBlockModalState.setIsOpen(true);
      }
    }
  ]
};

export const CodeBlockModalWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  codeBlockModalState.isOpen = isOpen;
  codeBlockModalState.setIsOpen = setIsOpen;
  
  return (
    <CodeBlockModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onInsert={(code, lang) => {
        if (codeBlockModalState.insertContent) {
          codeBlockModalState.insertContent(code, lang);
        }
      }}
    />
  );
};
```

## Plugin with Keyboard Shortcuts

### Quick Insert Plugin

```tsx
import { EditorPlugin } from '@akincand/react-editor';

export const quickInsertPlugin: EditorPlugin = {
  name: 'quick-insert',
  version: '1.0.0',
  
  shortcuts: [
    {
      key: 'd',
      ctrlKey: true,
      handler: () => {
        const date = new Date().toLocaleDateString();
        document.execCommand('insertText', false, date);
      }
    },
    {
      key: 't',
      ctrlKey: true,
      handler: () => {
        const time = new Date().toLocaleTimeString();
        document.execCommand('insertText', false, time);
      }
    },
    {
      key: 's',
      ctrlKey: true,
      shiftKey: true,
      handler: () => {
        const signature = '\n\nBest regards,\nYour Name';
        document.execCommand('insertText', false, signature);
      }
    }
  ],
  
  onLoad: (context) => {
    console.log('Quick Insert shortcuts registered');
  }
};
```

## Full-Featured Plugin

### Table Plugin

```tsx
import React, { useState } from 'react';
import { EditorPlugin } from '@akincand/react-editor';

const TableModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInsert: (rows: number, cols: number) => void;
}> = ({ isOpen, onClose, onInsert }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '300px'
      }}>
        <h3>Insert Table</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label>Rows: {rows}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label>Columns: {cols}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => {
            onInsert(rows, cols);
            onClose();
          }}>
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

const tableModalState = {
  isOpen: false,
  setIsOpen: (value: boolean) => {},
  insertTable: null as ((rows: number, cols: number) => void) | null
};

export const tablePlugin: EditorPlugin = {
  name: 'table',
  version: '1.0.0',
  
  onLoad: (context) => {
    tableModalState.insertTable = (rows: number, cols: number) => {
      let html = '<table style="border-collapse: collapse; width: 100%; margin: 16px 0;">';
      
      // Header row
      html += '<thead><tr>';
      for (let c = 0; c < cols; c++) {
        html += '<th style="border: 1px solid #ccc; padding: 8px; background: #f0f0f0;">Header ' + (c + 1) + '</th>';
      }
      html += '</tr></thead>';
      
      // Body rows
      html += '<tbody>';
      for (let r = 0; r < rows; r++) {
        html += '<tr>';
        for (let c = 0; c < cols; c++) {
          html += '<td style="border: 1px solid #ccc; padding: 8px;">Cell</td>';
        }
        html += '</tr>';
      }
      html += '</tbody></table>';
      
      context.insertContent(html);
    };
  },
  
  toolbarButtons: [
    {
      id: 'insert-table',
      label: 'Table',
      title: 'Insert Table',
      group: 'insert',
      order: 20,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
          <line x1="3" y1="9" x2="21" y2="9" strokeWidth="2"/>
          <line x1="3" y1="15" x2="21" y2="15" strokeWidth="2"/>
          <line x1="9" y1="3" x2="9" y2="21" strokeWidth="2"/>
          <line x1="15" y1="3" x2="15" y2="21" strokeWidth="2"/>
        </svg>
      ),
      onClick: () => {
        tableModalState.setIsOpen(true);
      }
    }
  ]
};

export const TableModalWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  tableModalState.isOpen = isOpen;
  tableModalState.setIsOpen = setIsOpen;
  
  return (
    <TableModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onInsert={(rows, cols) => {
        if (tableModalState.insertTable) {
          tableModalState.insertTable(rows, cols);
        }
      }}
    />
  );
};
```

## Using Custom Plugin

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';
import { emojiPlugin } from './plugins/emojiPlugin';
import { highlightPlugin } from './plugins/highlightPlugin';
import { tablePlugin, TableModalWrapper } from './plugins/tablePlugin';

function App() {
  return (
    <>
      <Editor
        plugins={[
          ...defaultPlugins,
          emojiPlugin,
          highlightPlugin,
          tablePlugin
        ]}
      />
      <TableModalWrapper />
    </>
  );
}
```

## Plugin Best Practices

### 1. Unique Plugin Names

```tsx
export const myPlugin: EditorPlugin = {
  name: 'company-feature-v1', // Prefix with company/project name
  version: '1.0.0'
};
```

### 2. Clean Up Resources

```tsx
export const myPlugin: EditorPlugin = {
  name: 'my-plugin',
  onLoad: (context) => {
    const handler = () => console.log('clicked');
    document.addEventListener('click', handler);
    
    // Return cleanup function
    return () => {
      document.removeEventListener('click', handler);
    };
  }
};
```

### 3. Error Handling

```tsx
export const myPlugin: EditorPlugin = {
  name: 'my-plugin',
  toolbarButtons: [{
    id: 'my-action',
    label: 'Action',
    onClick: () => {
      try {
        // Your code
      } catch (error) {
        console.error('Plugin error:', error);
        alert('Action failed');
      }
    }
  }]
};
```

### 4. TypeScript Support

```tsx
import { EditorPlugin, PluginContext } from '@akincand/react-editor';

interface MyPluginConfig {
  apiKey: string;
  endpoint: string;
}

export const createMyPlugin = (config: MyPluginConfig): EditorPlugin => ({
  name: 'my-plugin',
  version: '1.0.0',
  onLoad: (context: PluginContext) => {
    // Use config
    console.log('API Key:', config.apiKey);
  }
});
```

## Publishing Your Plugin

### NPM Package Structure

```
my-react-editor-plugin/
├── package.json
├── README.md
├── src/
│   └── index.tsx
└── dist/
    ├── index.js
    └── index.d.ts
```

### package.json

```json
{
  "name": "@mycompany/react-editor-emoji-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "@akincand/react-editor": "^1.0.0",
    "react": "^18.0.0"
  }
}
```

## Related

- [Plugin System Documentation](../plugins/README.md)
- [Plugin API Reference](../plugins/plugin-api.md)
- [Publishing Plugins Guide](../plugins/publishing-plugins.md)
- [Basic Examples](basic.md)

