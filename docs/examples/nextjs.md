# Next.js Integration

Complete guide for using React Editor in Next.js applications.

## 🎮 Live Demo

<iframe 
  src="https://stackblitz.com/edit/rich-react-editor?embed=1&file=src%2FApp.tsx&hideExplorer=1&hideNavigation=1&theme=dark&view=preview"
  style="width: 100%; height: 600px; border: 0; border-radius: 8px; overflow: hidden;"
  title="React Editor Next.js Demo"
></iframe>

[Open in StackBlitz →](https://stackblitz.com/edit/rich-react-editor)

## Installation

```bash
npm install @akincand/react-editor
```

## App Router (Next.js 13+)

### Basic Setup

Create a client component:

**`app/components/RichTextEditor.tsx`**
```tsx
'use client';

import { Editor, defaultPlugins } from '@akincand/react-editor';
import { useState } from 'react';

export function RichTextEditor() {
  const [content, setContent] = useState('');

  return (
    <Editor
      plugins={defaultPlugins}
      onChange={setContent}
      placeholder="Start writing..."
    />
  );
}
```

Use in your page:

**`app/page.tsx`**
```tsx
import { RichTextEditor } from './components/RichTextEditor';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1>My Editor</h1>
      <RichTextEditor />
    </main>
  );
}
```

### With Dynamic Import

For better performance, use dynamic import:

**`app/page.tsx`**
```tsx
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('./components/RichTextEditor').then(mod => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
);

export default function Home() {
  return (
    <main>
      <RichTextEditor />
    </main>
  );
}
```

### With Server Actions

Save content using Server Actions:

**`app/actions.ts`**
```tsx
'use server';

import { revalidatePath } from 'next/cache';

export async function saveContent(content: string) {
  try {
    // Save to database
    await db.articles.create({
      content,
      createdAt: new Date()
    });
    
    revalidatePath('/articles');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to save' };
  }
}
```

**`app/components/RichTextEditor.tsx`**
```tsx
'use client';

import { Editor, defaultPlugins } from '@akincand/react-editor';
import { useState, useTransition } from 'react';
import { saveContent } from '../actions';

export function RichTextEditor() {
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveContent(content);
      if (result.success) {
        alert('Saved!');
      }
    });
  };

  return (
    <>
      <Editor
        plugins={defaultPlugins}
        onChange={setContent}
      />
      <button onClick={handleSave} disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </>
  );
}
```

## Pages Router (Next.js 12 and below)

### Basic Setup

**`pages/index.tsx`**
```tsx
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Import dynamically to avoid SSR issues
const Editor = dynamic(
  () => import('@akincand/react-editor').then(mod => mod.Editor),
  { ssr: false }
);

const defaultPlugins = dynamic(
  () => import('@akincand/react-editor').then(mod => mod.defaultPlugins),
  { ssr: false }
);

export default function Home() {
  const [content, setContent] = useState('');

  return (
    <div>
      <h1>Rich Text Editor</h1>
      {typeof window !== 'undefined' && (
        <Editor
          plugins={defaultPlugins}
          onChange={setContent}
        />
      )}
    </div>
  );
}
```

### As a Separate Component

**`components/Editor.tsx`**
```tsx
import { Editor as ReactEditor, defaultPlugins } from '@akincand/react-editor';
import { useState } from 'react';

interface EditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

export function Editor({ initialContent = '', onChange }: EditorProps) {
  const [content, setContent] = useState(initialContent);

  const handleChange = (newContent: string) => {
    setContent(newContent);
    onChange?.(newContent);
  };

  return (
    <ReactEditor
      plugins={defaultPlugins}
      defaultContent={content}
      onChange={handleChange}
    />
  );
}
```

**`pages/index.tsx`**
```tsx
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../components/Editor').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

export default function Home() {
  return (
    <div>
      <Editor onChange={(content) => console.log(content)} />
    </div>
  );
}
```

### With API Routes

**`pages/api/articles/[id].ts`**
```tsx
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Fetch article
    const article = await db.articles.findById(id);
    res.status(200).json(article);
  } else if (req.method === 'PUT') {
    // Update article
    const { content } = req.body;
    await db.articles.update(id, { content });
    res.status(200).json({ success: true });
  }
}
```

**`pages/edit/[id].tsx`**
```tsx
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Editor = dynamic(
  () => import('@akincand/react-editor').then(mod => mod.Editor),
  { ssr: false }
);

export default function EditArticle() {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/articles/${id}`)
        .then(res => res.json())
        .then(data => {
          setContent(data.content);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSave = async () => {
    await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    router.push('/articles');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Editor
        defaultContent={content}
        onChange={setContent}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
```

## TypeScript Configuration

**`tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Styling with Tailwind CSS

**`tailwind.config.js`**
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Component with Tailwind**
```tsx
'use client';

import { Editor, defaultPlugins } from '@akincand/react-editor';

export function StyledEditor() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Editor
        plugins={defaultPlugins}
        customStyles={{
          border: '2px solid rgb(59 130 246)',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
        className="shadow-lg"
      />
    </div>
  );
}
```

## With Theme Provider

**`app/providers.tsx`**
```tsx
'use client';

import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

**`app/components/ThemedEditor.tsx`**
```tsx
'use client';

import { Editor, defaultPlugins } from '@akincand/react-editor';
import { useTheme } from '../providers';

export function ThemedEditor() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Editor
        plugins={defaultPlugins}
        theme={{ mode: theme }}
      />
    </>
  );
}
```

## Deployment

### Vercel

No special configuration needed. Just deploy:

```bash
vercel
```

### Environment Variables

**`.env.local`**
```bash
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```

**Usage**
```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Performance Optimization

### Code Splitting

```tsx
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@akincand/react-editor').then(mod => mod.Editor),
  {
    ssr: false,
    loading: () => <EditorSkeleton />
  }
);
```

### Lazy Load Plugins

```tsx
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

export function Editor() {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    import('@akincand/react-editor').then(mod => {
      setPlugins(mod.defaultPlugins);
    });
  }, []);

  if (plugins.length === 0) {
    return <div>Loading...</div>;
  }

  return <ReactEditor plugins={plugins} />;
}
```

### Memoization

```tsx
'use client';

import { Editor, defaultPlugins } from '@akincand/react-editor';
import { useMemo, useCallback, useState } from 'react';

export function OptimizedEditor() {
  const [content, setContent] = useState('');
  
  const plugins = useMemo(() => defaultPlugins, []);
  
  const handleChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  return (
    <Editor
      plugins={plugins}
      onChange={handleChange}
    />
  );
}
```

## Common Issues

### "document is not defined"

**Problem**: Using editor in server components

**Solution**: Use `'use client'` directive or dynamic import

```tsx
'use client';

import { Editor } from '@akincand/react-editor';
```

### CSS Not Loading

**Problem**: Styles not applied

**Solution**: Import CSS in client component

```tsx
'use client';

import '@akincand/react-editor/dist/styles.css';
import { Editor } from '@akincand/react-editor';
```

### Hydration Mismatch

**Problem**: Content differs between server and client

**Solution**: Use dynamic import with `ssr: false`

```tsx
const Editor = dynamic(
  () => import('@akincand/react-editor').then(mod => mod.Editor),
  { ssr: false }
);
```

## Examples Repository

Check out the [Next.js example](https://github.com/AkincanD/react-editor/tree/main/examples/nextjs) in the repository.

## Related

- [Basic Examples](basic.md)
- [Advanced Examples](advanced.md)
- [Configuration Guide](../configuration.md)
- [API Reference](../api-reference.md)

