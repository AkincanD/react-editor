# Installation

## Package Manager

React Editor can be installed using npm, yarn, or pnpm:

### npm

```bash
npm install @akincand/react-editor
```

### yarn

```bash
yarn add @akincand/react-editor
```

### pnpm

```bash
pnpm add @akincand/react-editor
```

## Peer Dependencies

React Editor requires the following peer dependencies:

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

These should already be installed in your React project. If not, install them:

```bash
npm install react react-dom
```

## TypeScript

React Editor is written in TypeScript and includes type definitions out of the box. No additional @types packages are needed.

## Verifying Installation

After installation, verify that the package is correctly installed:

```tsx
import { Editor } from '@akincand/react-editor';

console.log(Editor); // Should output the Editor component
```

## Bundler Configuration

### Vite

No special configuration needed. Vite works out of the box with React Editor.

### Webpack

React Editor works with standard React webpack configurations. Ensure you have:

- `babel-loader` for JSX/TSX files
- `css-loader` and `style-loader` for CSS imports

### Next.js

Next.js works seamlessly with React Editor. See [Next.js Integration](nextjs-integration.md) for more details.

### Create React App

React Editor works perfectly with Create React App without any additional configuration.

## CDN Usage

While not recommended for production, you can use React Editor via CDN:

```html
<script src="https://unpkg.com/@akincand/react-editor@latest/dist/index.js"></script>
```

## Troubleshooting

### Module not found

If you see "Module not found" errors:

1. Clear your package manager cache:
   ```bash
   npm cache clean --force
   # or
   yarn cache clean
   ```

2. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

### Build Errors

If you encounter build errors:

1. Ensure your bundler is configured to handle CSS imports
2. Check that peer dependencies are installed
3. Verify your TypeScript configuration (if using TypeScript)

### Performance Issues

For optimal performance:

1. Use code splitting if your bundle is large
2. Lazy load the editor component if it's not immediately needed
3. Consider using Next.js dynamic imports for server-side rendering scenarios

