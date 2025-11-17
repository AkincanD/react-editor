# Getting Started

This guide will help you get started with React Editor in just a few minutes.

## Prerequisites

Before you begin, ensure you have:

- Node.js 16.x or higher
- React 18.x or higher
- npm, yarn, or pnpm package manager

## Installation

Install the package using your preferred package manager:

```bash
npm install @akincand/react-editor
```

```bash
yarn add @akincand/react-editor
```

```bash
pnpm add @akincand/react-editor
```

## Your First Editor

Create a simple editor component:

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Editor
        plugins={defaultPlugins}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default App;
```

That's it! You now have a fully functional rich text editor with formatting tools, lists, links, and more.

## Next Steps

- Learn about [Configuration Options](configuration.md)
- Explore [Built-in Plugins](plugins/built-in-plugins.md)
- Create [Custom Plugins](plugins/creating-plugins.md)
- Check out [Examples](examples/README.md)

## Common Issues

### TypeScript Errors

If you encounter TypeScript errors, make sure you have the necessary type definitions:

```bash
npm install --save-dev @types/react @types/react-dom
```

### Styling Issues

The editor uses TailwindCSS. If styles are not appearing:

1. Ensure TailwindCSS is properly configured in your project
2. The editor includes its own styles, but you may need to add Tailwind to your project for full compatibility

### Next.js Issues

When using with Next.js, make sure to mark the component as a client component:

```tsx
'use client';

import { Editor } from 'react-editor';
```

Or use dynamic imports for the Pages Router:

```tsx
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@akincand/react-editor').then(mod => mod.Editor),
  { ssr: false }
);
```

