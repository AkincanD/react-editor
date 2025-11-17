# Publishing Your Plugin

Complete guide to publishing React Editor plugins to npm.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Plugin Development](#plugin-development)
- [Testing](#testing)
- [Documentation](#documentation)
- [Publishing to npm](#publishing-to-npm)
- [Best Practices](#best-practices)

## Prerequisites

Before publishing your plugin, ensure you have:

- ✅ Node.js 16+ installed
- ✅ npm account (create at [npmjs.com](https://www.npmjs.com/signup))
- ✅ Git installed
- ✅ GitHub account (optional but recommended)
- ✅ Basic understanding of TypeScript

## Project Setup

### 1. Create Plugin Project

```bash
mkdir react-editor-plugin-myplugin
cd react-editor-plugin-myplugin
npm init -y
```

### 2. Install Dependencies

```bash
npm install --save-dev typescript @types/react @types/react-dom
npm install --peer react react-dom @akincand/react-editor
```

### 3. Create tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Update package.json

```json
{
  "name": "@your-username/react-editor-plugin-myplugin",
  "version": "1.0.0",
  "description": "Amazing plugin for React Editor",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "react-editor",
    "plugin",
    "editor",
    "react"
  ],
  "author": "Your Name",
  "license": "MIT",
  "peerDependencies": {
    "react": "^18.0.0",
    "@akincand/react-editor": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  }
}
```

## Plugin Development

### Directory Structure

```
react-editor-plugin-myplugin/
├── src/
│   ├── index.ts          # Main export
│   ├── plugin.tsx        # Plugin implementation
│   └── types.ts          # Type definitions (optional)
├── dist/                 # Build output (gitignored)
├── package.json
├── tsconfig.json
├── README.md
├── LICENSE
└── .gitignore
```

### Create Plugin File

**src/plugin.tsx:**

```typescript
import { EditorPlugin } from '@akincand/react-editor';

export const myAwesomePlugin: EditorPlugin = {
  name: 'myAwesomePlugin',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'awesome-action',
      label: '✨',
      title: 'Awesome Action',
      group: 'awesome',
      order: 1,
      onClick: () => {
        console.log('Awesome action triggered!');
      }
    }
  ],
  
  commands: [
    {
      name: 'doAwesomeThing',
      execute: () => {
        console.log('Doing awesome thing!');
      },
      canExecute: () => true
    }
  ],
  
  shortcuts: [
    {
      key: 'a',
      ctrlKey: true,
      shiftKey: true,
      handler: () => {
        console.log('Awesome shortcut!');
      }
    }
  ],
  
  onLoad: (context) => {
    console.log('My awesome plugin loaded!');
  },
  
  onUnload: () => {
    console.log('My awesome plugin unloaded!');
  }
};
```

**src/index.ts:**

```typescript
export { myAwesomePlugin } from './plugin';
export type { /* export your types if any */ } from './types';
```

### Advanced Plugin Example

**src/plugin.tsx:**

```typescript
import React from 'react';
import { EditorPlugin, PluginContext } from '@akincand/react-editor';

interface PluginConfig {
  apiKey?: string;
  customOption?: string;
}

export function createMyPlugin(config: PluginConfig = {}): EditorPlugin {
  return {
    name: 'myConfigurablePlugin',
    version: '1.0.0',
    
    toolbarButtons: [
      {
        id: 'custom-action',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6Z" fill="currentColor"/>
          </svg>
        ),
        title: 'Custom Action',
        group: 'custom',
        onClick: () => {
          if (config.apiKey) {
            console.log('Using API key:', config.apiKey);
          }
        }
      }
    ],
    
    onLoad: (context: PluginContext) => {
      console.log('Plugin config:', config);
      
      // Register custom command
      context.registerCommand({
        name: 'customCommand',
        execute: () => {
          context.insertContent('<p>Custom content!</p>');
        }
      });
    }
  };
}

// Default export for convenience
export const myPlugin = createMyPlugin();
```

## Testing

### Manual Testing

Create a test project:

```bash
mkdir test-app
cd test-app
npx create-react-app . --template typescript
```

Install dependencies:

```bash
npm install @akincand/react-editor
npm install ../path/to/your/plugin
```

Test in App.tsx:

```typescript
import { Editor } from '@akincand/react-editor';
import { myAwesomePlugin } from '@your-username/react-editor-plugin-myplugin';

function App() {
  return (
    <div className="App">
      <Editor plugins={[myAwesomePlugin]} />
    </div>
  );
}

export default App;
```

### Unit Testing

Install testing dependencies:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

Create test file:

**src/plugin.test.tsx:**

```typescript
import { myAwesomePlugin } from './plugin';

describe('MyAwesomePlugin', () => {
  it('should have correct name', () => {
    expect(myAwesomePlugin.name).toBe('myAwesomePlugin');
  });

  it('should have toolbar buttons', () => {
    expect(myAwesomePlugin.toolbarButtons).toBeDefined();
    expect(myAwesomePlugin.toolbarButtons?.length).toBeGreaterThan(0);
  });

  it('should have commands', () => {
    expect(myAwesomePlugin.commands).toBeDefined();
  });
});
```

## Documentation

### Create README.md

```markdown
# My Awesome Plugin for React Editor

> An amazing plugin that does awesome things!

## Installation

\`\`\`bash
npm install @your-username/react-editor-plugin-myplugin
\`\`\`

## Usage

\`\`\`tsx
import { Editor } from '@akincand/react-editor';
import { myAwesomePlugin } from '@your-username/react-editor-plugin-myplugin';

function App() {
  return (
    <Editor plugins={[myAwesomePlugin]} />
  );
}
\`\`\`

## Configuration

\`\`\`tsx
import { createMyPlugin } from '@your-username/react-editor-plugin-myplugin';

const plugin = createMyPlugin({
  apiKey: 'your-api-key',
  customOption: 'value'
});

<Editor plugins={[plugin]} />
\`\`\`

## Features

- ✨ Awesome feature 1
- 🚀 Awesome feature 2
- 💡 Awesome feature 3

## API

### Toolbar Buttons

| Button | Description | Shortcut |
|--------|-------------|----------|
| ✨ | Awesome action | Ctrl+Shift+A |

### Commands

#### \`doAwesomeThing\`

Executes the awesome thing.

\`\`\`tsx
editor.execCommand('doAwesomeThing');
\`\`\`

## License

MIT © Your Name
```

### Create CHANGELOG.md

```markdown
# Changelog

## [1.0.0] - 2025-11-17

### Added
- Initial release
- Awesome feature 1
- Awesome feature 2
- Awesome feature 3
```

### Create LICENSE

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Publishing to npm

### 1. Build Your Plugin

```bash
npm run build
```

Verify dist folder:
```bash
ls dist/
# Should show: index.js, index.d.ts, plugin.js, plugin.d.ts
```

### 2. Test Package Locally

```bash
npm pack
```

This creates a `.tgz` file. Test it in another project:

```bash
npm install /path/to/your-plugin-1.0.0.tgz
```

### 3. Create .npmignore

```
src/
tsconfig.json
*.test.ts
*.test.tsx
node_modules/
.git/
.gitignore
```

### 4. Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- OTP (if 2FA enabled)

### 5. Publish

```bash
npm publish --access public
```

For scoped packages:
```bash
npm publish --access public
```

### 6. Verify Publication

Visit: `https://www.npmjs.com/package/@your-username/react-editor-plugin-myplugin`

## Version Management

### Semantic Versioning

- **Major (1.0.0)**: Breaking changes
- **Minor (0.1.0)**: New features, backwards compatible
- **Patch (0.0.1)**: Bug fixes

### Updating Version

```bash
# Patch: 1.0.0 → 1.0.1
npm version patch

# Minor: 1.0.0 → 1.1.0
npm version minor

# Major: 1.0.0 → 2.0.0
npm version major
```

### Publish New Version

```bash
npm version patch
npm publish
```

## Best Practices

### 1. Naming Convention

```bash
# Official naming
@your-username/react-editor-plugin-name

# Examples
@john/react-editor-plugin-emoji
@company/react-editor-plugin-mention
```

### 2. Package.json Keywords

```json
{
  "keywords": [
    "react-editor",
    "react-editor-plugin",
    "plugin",
    "editor",
    "react",
    "wysiwyg"
  ]
}
```

### 3. Peer Dependencies

Always specify React Editor as peer dependency:

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "@akincand/react-editor": "^1.0.0"
  }
}
```

### 4. TypeScript Support

Always include type definitions:

```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

### 5. Bundle Size

Keep your plugin small:
- Avoid large dependencies
- Use tree-shakeable code
- Check bundle size: `npm install -g bundlephobia`

### 6. Documentation

- Clear README with examples
- API documentation
- CHANGELOG
- LICENSE file
- Contributing guidelines

### 7. Testing

- Write unit tests
- Test with React Editor
- Test in different environments
- Test backwards compatibility

### 8. CI/CD

Setup GitHub Actions:

**.github/workflows/publish.yml:**

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Example Plugins

### Simple Plugin

```typescript
export const simplePlugin: EditorPlugin = {
  name: 'simple',
  toolbarButtons: [{
    id: 'greet',
    label: '👋',
    onClick: () => alert('Hello!')
  }]
};
```

### Complex Plugin

```typescript
export function createComplexPlugin(config: Config): EditorPlugin {
  return {
    name: 'complex',
    version: '2.0.0',
    toolbarButtons: [...],
    commands: [...],
    shortcuts: [...],
    onLoad: async (context) => {
      // Async initialization
      const data = await fetchData(config.apiKey);
      // Setup plugin with data
    },
    onUnload: () => {
      // Cleanup
    }
  };
}
```

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
```

### Monitor Issues

- Watch GitHub issues
- Respond to user feedback
- Fix bugs promptly
- Add requested features

### Deprecation

If deprecating:

```bash
npm deprecate @your-username/plugin@1.0.0 "Please use v2.0.0"
```

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Semantic Versioning](https://semver.org/)
- [React Editor Docs](https://github.com/AkincanD/react-editor)

## Next Steps

- [Plugin API Reference](plugin-api.md)
- [Creating Custom Plugins](creating-plugins.md)
- [Built-in Plugins](built-in-plugins.md)

