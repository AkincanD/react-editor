# Contributing to React Editor

First off, thank you for considering contributing to React Editor! It's people like you that make React Editor such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what you expected**
* **Include screenshots if possible**
* **Include your environment details** (OS, Node version, React version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List any examples of similar features in other projects**

### Pull Requests

* Fill in the required template
* Follow the TypeScript/JavaScript style guide
* Include appropriate test cases
* Update documentation as needed
* End all files with a newline

## Development Process

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/AkincanD/react-editor.git
   cd react-editor
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```

### Development

1. Make your changes
2. Run the build:
   ```bash
   npm run build
   ```

3. Test your changes locally:
   ```bash
   npm run dev
   ```

### Testing

Run tests to ensure your changes don't break existing functionality:

```bash
npm test
```

### Committing

We follow conventional commits. Your commit messages should follow this format:

```
type(scope): subject

body

footer
```

Types:
* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that don't affect code meaning
* **refactor**: Code change that neither fixes a bug nor adds a feature
* **perf**: Performance improvement
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools

Examples:
```
feat(editor): add auto-save functionality
fix(toolbar): resolve button alignment issue
docs(readme): update installation instructions
```

### Submitting

1. Push to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```

2. Open a Pull Request on GitHub

3. Wait for review and address any feedback

## Style Guide

### TypeScript

* Use TypeScript for all new code
* Use interfaces over types where possible
* Avoid `any` type - use `unknown` if necessary
* Add JSDoc comments for public APIs

### React

* Use functional components with hooks
* Use meaningful component and prop names
* Keep components small and focused
* Use TypeScript prop types

### Code Style

* Use 2 spaces for indentation
* Use semicolons
* Use single quotes for strings
* Add trailing commas in multi-line structures
* Keep lines under 100 characters when possible

### Example

```tsx
import React, { useState, useCallback } from 'react';

interface MyComponentProps {
  title: string;
  onSave?: (content: string) => void;
}

/**
 * MyComponent description
 * @param props - Component props
 */
export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  onSave 
}) => {
  const [content, setContent] = useState('');

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(content);
    }
  }, [content, onSave]);

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
```

## Project Structure

```
react-editor/
├── src/
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom hooks
│   ├── plugins/         # Built-in plugins
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Main entry point
├── docs/                # Documentation
├── examples/            # Example applications
└── dist/                # Built files (generated)
```

## Documentation

* Update README.md if you change functionality
* Update TypeScript types and JSDoc comments
* Add examples for new features
* Update the changelog

## Community

* Join discussions in GitHub issues
* Help others in discussions
* Share your plugins and examples
* Spread the word about React Editor

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in the README.md file.

Thank you for contributing! 🎉

