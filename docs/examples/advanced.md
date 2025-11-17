# Advanced Examples

Advanced usage patterns and complex integrations for React Editor.

## 🎮 Live Demo

<iframe 
  src="https://stackblitz.com/edit/rich-react-editor?embed=1&file=src%2FApp.tsx&hideExplorer=1&hideNavigation=1&theme=dark&view=preview"
  style="width: 100%; height: 600px; border: 0; border-radius: 8px; overflow: hidden;"
  title="React Editor Advanced Demo"
></iframe>

[Open in StackBlitz →](https://stackblitz.com/edit/rich-react-editor)

## Custom Toolbar Configuration

Create a custom toolbar with specific buttons:

```tsx
import { Editor, EditorPlugin, ToolbarButton } from '@akincand/react-editor';

const customToolbar: ToolbarButton[] = [
  {
    id: 'bold',
    label: 'Bold',
    command: 'bold',
    icon: <strong>B</strong>,
    title: 'Bold',
    order: 1,
    group: 'formatting'
  },
  {
    id: 'italic',
    label: 'Italic',
    command: 'italic',
    icon: <em>I</em>,
    title: 'Italic',
    order: 2,
    group: 'formatting'
  }
];

function App() {
  return (
    <Editor toolbar={customToolbar} />
  );
}
```

## Custom Commands

Register and execute custom commands:

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins, EditorInstance } from '@akincand/react-editor';

function App() {
  const [editor, setEditor] = useState<EditorInstance | null>(null);

  const insertSignature = () => {
    if (editor) {
      const signature = `
        <div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px;">
          <p>Best regards,<br/>John Doe</p>
        </div>
      `;
      editor.insertHTML(signature);
    }
  };

  const insertTemplate = (template: string) => {
    if (editor) {
      const templates = {
        meeting: '<h2>Meeting Notes</h2><p>Date:</p><p>Attendees:</p><p>Notes:</p>',
        report: '<h1>Report</h1><h2>Summary</h2><p></p><h2>Details</h2><p></p>',
        email: '<p>Hi [Name],</p><p></p><p>Best regards,</p>'
      };
      editor.insertHTML(templates[template as keyof typeof templates] || '');
    }
  };

  return (
    <>
      <div style={{ marginBottom: '10px', gap: '8px', display: 'flex' }}>
        <button onClick={insertSignature}>Insert Signature</button>
        <button onClick={() => insertTemplate('meeting')}>Meeting Template</button>
        <button onClick={() => insertTemplate('report')}>Report Template</button>
        <button onClick={() => insertTemplate('email')}>Email Template</button>
      </div>
      <Editor
        plugins={defaultPlugins}
        onReady={setEditor}
      />
    </>
  );
}
```

## Content Validation

Validate content before saving:

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const validateContent = (html: string): string[] => {
    const errors: string[] = [];
    const text = html.replace(/<[^>]*>/g, '').trim();

    if (text.length === 0) {
      errors.push('Content cannot be empty');
    }

    if (text.length < 10) {
      errors.push('Content must be at least 10 characters');
    }

    if (text.length > 10000) {
      errors.push('Content must be less than 10,000 characters');
    }

    // Check for required elements
    if (!html.includes('<h1>') && !html.includes('<h2>')) {
      errors.push('Content must include at least one heading');
    }

    return errors;
  };

  const handleChange = (newContent: string) => {
    setContent(newContent);
    setErrors(validateContent(newContent));
  };

  const handleSave = () => {
    const validationErrors = validateContent(content);
    if (validationErrors.length > 0) {
      alert('Please fix errors:\n' + validationErrors.join('\n'));
      return;
    }
    // Save content
    console.log('Saving:', content);
  };

  return (
    <>
      <Editor
        plugins={defaultPlugins}
        onChange={handleChange}
      />
      {errors.length > 0 && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>Validation Errors:</strong>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleSave} disabled={errors.length > 0}>
        Save
      </button>
    </>
  );
}
```

## Draft Auto-Save with LocalStorage

Implement auto-save to localStorage:

```tsx
import { useState, useEffect, useCallback } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

const STORAGE_KEY = 'editor-draft';
const AUTOSAVE_INTERVAL = 3000; // 3 seconds

function App() {
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setContent(saved);
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (!content) return;

    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, content);
      setLastSaved(new Date());
    }, AUTOSAVE_INTERVAL);

    return () => clearTimeout(timer);
  }, [content]);

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setContent('');
    setLastSaved(null);
  };

  return (
    <>
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {lastSaved && (
            <span style={{ color: 'green', fontSize: '12px' }}>
              ✓ Draft saved at {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
        <button onClick={clearDraft}>Clear Draft</button>
      </div>
      <Editor
        plugins={defaultPlugins}
        defaultContent={content}
        onChange={setContent}
      />
    </>
  );
}
```

## Collaborative Editing Simulation

Simulate real-time collaboration:

```tsx
import { useState, useEffect } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('<p>Start typing...</p>');
  const [collaborators, setCollaborators] = useState<string[]>([]);

  // Simulate collaborators joining/leaving
  useEffect(() => {
    const names = ['Alice', 'Bob', 'Charlie'];
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setCollaborators(prev => {
        if (prev.includes(randomName)) {
          return prev.filter(n => n !== randomName);
        } else {
          return [...prev, randomName];
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate remote changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (collaborators.length > 0 && Math.random() > 0.7) {
        setContent(prev => prev + ' <span style="color: blue;">[Edit by ' + collaborators[0] + ']</span>');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [collaborators]);

  return (
    <>
      <div style={{ 
        marginBottom: '10px', 
        padding: '10px', 
        background: '#f0f0f0', 
        borderRadius: '4px' 
      }}>
        <strong>Active Collaborators:</strong>{' '}
        {collaborators.length > 0 ? collaborators.join(', ') : 'None'}
      </div>
      <Editor
        plugins={defaultPlugins}
        defaultContent={content}
        onChange={setContent}
      />
    </>
  );
}
```

## Markdown Export

Export content as Markdown:

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('');

  const htmlToMarkdown = (html: string): string => {
    let md = html;

    // Headings
    md = md.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n');
    md = md.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n');
    md = md.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n');

    // Bold and Italic
    md = md.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
    md = md.replace(/<b>(.*?)<\/b>/g, '**$1**');
    md = md.replace(/<em>(.*?)<\/em>/g, '*$1*');
    md = md.replace(/<i>(.*?)<\/i>/g, '*$1*');

    // Links
    md = md.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');

    // Images
    md = md.replace(/<img src="(.*?)" alt="(.*?)".*?>/g, '![$2]($1)');

    // Lists
    md = md.replace(/<ul>(.*?)<\/ul>/gs, (match, content) => {
      return content.replace(/<li>(.*?)<\/li>/g, '- $1\n');
    });
    md = md.replace(/<ol>(.*?)<\/ol>/gs, (match, content) => {
      let counter = 1;
      return content.replace(/<li>(.*?)<\/li>/g, () => `${counter++}. $1\n`);
    });

    // Paragraphs
    md = md.replace(/<p>(.*?)<\/p>/g, '$1\n\n');

    // Clean up remaining tags
    md = md.replace(/<[^>]*>/g, '');

    return md.trim();
  };

  const downloadMarkdown = () => {
    const markdown = htmlToMarkdown(content);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Editor
        plugins={defaultPlugins}
        onChange={setContent}
      />
      <button onClick={downloadMarkdown} disabled={!content}>
        Download as Markdown
      </button>
    </>
  );
}
```

## Custom Styling with Themes

Advanced theming system:

```tsx
import { useState } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

const themes = {
  default: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
  },
  neumorphic: {
    background: '#e0e5ec',
    border: 'none',
    borderRadius: '20px',
    boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
  },
  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  gradient: {
    border: '3px solid transparent',
    borderRadius: '16px',
    backgroundImage: `
      linear-gradient(white, white),
      linear-gradient(135deg, #667eea 0%, #764ba2 100%)
    `,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  }
};

function App() {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>('default');

  return (
    <>
      <div style={{ marginBottom: '20px', gap: '8px', display: 'flex' }}>
        {Object.keys(themes).map(theme => (
          <button
            key={theme}
            onClick={() => setCurrentTheme(theme as keyof typeof themes)}
            style={{
              padding: '8px 16px',
              background: currentTheme === theme ? '#667eea' : '#f0f0f0',
              color: currentTheme === theme ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>
      <Editor
        plugins={defaultPlugins}
        customStyles={themes[currentTheme]}
      />
    </>
  );
}
```

## Performance Optimization

Optimize for large documents:

```tsx
import { useState, useMemo, useCallback } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  const [content, setContent] = useState('');
  
  // Memoize plugins to prevent recreation
  const plugins = useMemo(() => defaultPlugins, []);
  
  // Debounce content changes
  const handleChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);
  
  // Calculate stats only when needed
  const stats = useMemo(() => {
    const text = content.replace(/<[^>]*>/g, '');
    return {
      chars: text.length,
      words: text.split(/\s+/).filter(Boolean).length,
      paragraphs: (content.match(/<p>/g) || []).length
    };
  }, [content]);

  return (
    <>
      <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
        📊 {stats.words} words • {stats.chars} chars • {stats.paragraphs} paragraphs
      </div>
      <Editor
        plugins={plugins}
        onChange={handleChange}
        minHeight="400px"
      />
    </>
  );
}
```

## Integration with API

Save and load content from API:

```tsx
import { useState, useEffect } from 'react';
import { Editor, defaultPlugins } from '@akincand/react-editor';

interface Article {
  id: string;
  title: string;
  content: string;
}

function App() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const articleId = 'article-123';

  // Load content
  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/articles/${articleId}`);
        const data: Article = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  // Save content
  const saveArticle = async () => {
    setSaving(true);
    try {
      await fetch(`/api/articles/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      alert('Saved successfully!');
    } catch (error) {
      console.error('Failed to save article:', error);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Editor
        plugins={defaultPlugins}
        defaultContent={content}
        onChange={setContent}
      />
      <button onClick={saveArticle} disabled={saving}>
        {saving ? 'Saving...' : 'Save'}
      </button>
    </>
  );
}
```

## Related

- [Basic Examples](basic.md)
- [Custom Plugin Example](custom-plugin.md)
- [Next.js Integration](nextjs.md)
- [API Reference](../api-reference.md)

