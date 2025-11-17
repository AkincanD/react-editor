import { Editor, EditorPlugin, defaultPlugins } from '@akincand/react-editor';

// Custom plugin that adds emoji support
const emojiPlugin: EditorPlugin = {
  name: 'emojiPlugin',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'emoji-smile',
      label: '😊',
      title: 'Insert Smile Emoji',
      group: 'emoji',
      order: 1,
      onClick: () => {
        document.execCommand('insertText', false, '😊');
      }
    },
    {
      id: 'emoji-heart',
      label: '❤️',
      title: 'Insert Heart Emoji',
      group: 'emoji',
      order: 2,
      onClick: () => {
        document.execCommand('insertText', false, '❤️');
      }
    },
    {
      id: 'emoji-fire',
      label: '🔥',
      title: 'Insert Fire Emoji',
      group: 'emoji',
      order: 3,
      onClick: () => {
        document.execCommand('insertText', false, '🔥');
      }
    },
    {
      id: 'emoji-star',
      label: '⭐',
      title: 'Insert Star Emoji',
      group: 'emoji',
      order: 4,
      onClick: () => {
        document.execCommand('insertText', false, '⭐');
      }
    }
  ],
  
  commands: [
    {
      name: 'insertEmoji',
      execute: (emoji: string) => {
        document.execCommand('insertText', false, emoji);
      },
      canExecute: () => true
    }
  ],
  
  shortcuts: [
    {
      key: 'e',
      ctrlKey: true,
      shiftKey: true,
      handler: () => {
        document.execCommand('insertText', false, '😊');
      }
    }
  ],
  
  onLoad: (context) => {
    console.log('Emoji plugin loaded!', context);
  },
  
  onUnload: () => {
    console.log('Emoji plugin unloaded!');
  }
};

// Custom plugin for inserting timestamps
const timestampPlugin: EditorPlugin = {
  name: 'timestampPlugin',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'insert-timestamp',
      label: '🕐',
      title: 'Insert Current Timestamp',
      group: 'utilities',
      order: 1,
      onClick: () => {
        const timestamp = new Date().toLocaleString();
        document.execCommand('insertText', false, timestamp);
      }
    },
    {
      id: 'insert-date',
      label: '📅',
      title: 'Insert Current Date',
      group: 'utilities',
      order: 2,
      onClick: () => {
        const date = new Date().toLocaleDateString();
        document.execCommand('insertText', false, date);
      }
    }
  ],
  
  commands: [
    {
      name: 'insertTimestamp',
      execute: () => {
        const timestamp = new Date().toLocaleString();
        document.execCommand('insertText', false, timestamp);
      }
    }
  ],
  
  onLoad: () => {
    console.log('Timestamp plugin loaded!');
  }
};

function App() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Custom Plugin Example
          </h1>
          <p className="text-gray-600">
            This example demonstrates custom plugins with emoji and timestamp support.
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Plugin Features:</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Emoji toolbar buttons for quick insertion</li>
              <li>Timestamp and date insertion utilities</li>
              <li>Keyboard shortcut: Ctrl+Shift+E for smile emoji</li>
              <li>Custom commands for programmatic control</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <Editor
            plugins={[...defaultPlugins, emojiPlugin, timestampPlugin]}
            placeholder="Try clicking the emoji buttons or press Ctrl+Shift+E!"
            height="600px"
            defaultContent="<p>Welcome! Try out the custom plugins 🎉</p>"
          />
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">How to Create Custom Plugins</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const myPlugin: EditorPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  toolbarButtons: [...],
  commands: [...],
  shortcuts: [...],
  onLoad: (context) => {},
  onUnload: () => {}
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;

