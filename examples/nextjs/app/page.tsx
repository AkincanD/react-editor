'use client';

import { Editor, defaultPlugins } from '@akincand/react-editor';
import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            React Editor + Next.js
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            A powerful rich text editor seamlessly integrated with Next.js App Router
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <Editor
            plugins={defaultPlugins}
            placeholder="Start creating amazing content with Next.js and React Editor..."
            height="600px"
            onChange={(newContent) => setContent(newContent)}
            defaultContent="<h1>Welcome to React Editor in Next.js! 🚀</h1><p>This is a fully-featured rich text editor running in a Next.js application.</p>"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              📊 Statistics
            </h2>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>Characters: {content.replace(/<[^>]*>/g, '').length}</p>
              <p>HTML Length: {content.length}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              ✨ Features
            </h2>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
              <li>✓ Server-side rendering compatible</li>
              <li>✓ TypeScript support</li>
              <li>✓ Dark mode ready</li>
              <li>✓ Fully responsive</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

