import { useState } from 'react';
import { Editor, defaultPlugins, EditorInstance } from 'react-editor';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [content, setContent] = useState('');

  const handleChange = (newContent: string) => {
    setContent(newContent);
    console.log('Content changed:', newContent);
  };

  const handleReady = (editor: EditorInstance) => {
    console.log('Editor is ready!', editor);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            React Editor - Basic Example
          </h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Toggle Theme ({theme})
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Editor
            plugins={defaultPlugins}
            placeholder="Start typing your content here..."
            theme={{ mode: theme }}
            height="500px"
            onChange={handleChange}
            onReady={handleReady}
          />
        </div>

        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Current Content Length
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {content.length} characters
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

