# Debugging Guide

Learn how to debug React Editor using the built-in debug console feature.

## Enabling Debug Mode

Enable debug logging by setting `debugConsole` prop to `true`:

```tsx
import { Editor, defaultPlugins } from '@akincand/react-editor';

function App() {
  return (
    <Editor
      plugins={defaultPlugins}
      debugConsole={true}  // Enable debug logging
      placeholder="Start typing..."
    />
  );
}
```

## What Gets Logged

When debug mode is enabled, you'll see detailed console logs for:

### 1. Editor Initialization
- Editor mounting and setup
- Configuration details (theme, plugins, options)

### 2. Plugin System
- Plugin registration
- Plugin loading process
- Toolbar buttons registration
- Commands registration
- Keyboard shortcuts registration
- Plugin `onLoad` callbacks

### 3. Commands
- Command registration
- Command execution
- Command execution failures
- Missing commands warnings

### 4. Toolbar
- Button clicks
- Button registration
- View source toggle

### 5. Content Changes
- Visual editor content changes
- Source code editor changes
- Content length and preview

### 6. View Mode
- Switching between visual and source modes

## Console Output Format

Debug logs use color-coded categories for easy identification:

```
🎨 React Editor Debug Mode Enabled

[HH:MM:SS] INIT Editor initializing...
[HH:MM:SS] PLUGIN Registering plugin: basicFormatting
[HH:MM:SS] PLUGIN   ↳ Registering 4 toolbar button(s)
[HH:MM:SS] PLUGIN   ↳ Registering 4 command(s)
[HH:MM:SS] PLUGIN ✓ Plugin basicFormatting loaded successfully
[HH:MM:SS] INIT ✓ Editor ready and mounted
[HH:MM:SS] TOOLBAR Button clicked: bold
[HH:MM:SS] COMMAND Executing: bold
[HH:MM:SS] CONTENT Content changed (visual mode)
```

### Categories:
- **INIT** - Editor initialization and lifecycle
- **PLUGIN** - Plugin system operations
- **COMMAND** - Command registration and execution
- **TOOLBAR** - Toolbar button operations
- **CONTENT** - Content changes
- **VIEW** - View mode changes

## Using Debug Logger in Custom Plugins

You can use the debug logger in your custom plugins:

```tsx
import { EditorPlugin, debugLog, debugWarn, debugError } from '@akincand/react-editor';

export const myCustomPlugin: EditorPlugin = {
  name: 'myCustomPlugin',
  version: '1.0.0',
  
  onLoad: (context) => {
    debugLog('PLUGIN', 'My custom plugin is loading...');
    
    // Your plugin logic
    try {
      // Do something
      debugLog('PLUGIN', 'Custom operation completed successfully');
    } catch (error) {
      debugError('PLUGIN', 'Custom operation failed', error);
    }
  },
  
  commands: [
    {
      name: 'myCommand',
      execute: (value) => {
        debugLog('COMMAND', 'Executing my custom command', { value });
        // Command implementation
      }
    }
  ]
};
```

## Programmatic Debug Control

You can control debug mode programmatically:

```tsx
import { setDebugMode, debugLog } from '@akincand/react-editor';

// Enable debug mode
setDebugMode(true);

// Disable debug mode
setDebugMode(false);

// Log custom messages
debugLog('CUSTOM', 'My custom debug message', { data: 'example' });
```

## Debug Logger API

### `setDebugMode(enabled: boolean)`
Enable or disable debug mode.

```tsx
setDebugMode(true);  // Enable
setDebugMode(false); // Disable
```

### `debugLog(category: string, message: string, data?: unknown)`
Log a debug message.

```tsx
debugLog('PLUGIN', 'Plugin initialized', { pluginName: 'myPlugin' });
```

### `debugWarn(category: string, message: string, data?: unknown)`
Log a warning message.

```tsx
debugWarn('COMMAND', 'Command execution skipped', { reason: 'not ready' });
```

### `debugError(category: string, message: string, data?: unknown)`
Log an error message.

```tsx
debugError('PLUGIN', 'Plugin failed to load', { error: 'Network error' });
```

### `debugGroup(title: string, collapsed?: boolean)`
Start a grouped console output.

```tsx
debugGroup('Loading plugins', true);
// ... multiple logs ...
debugGroupEnd();
```

### `debugGroupEnd()`
End a grouped console output.

```tsx
debugGroupEnd();
```

## Example: Debugging a Custom Plugin

```tsx
import { 
  EditorPlugin, 
  debugLog, 
  debugWarn, 
  debugError,
  debugGroup,
  debugGroupEnd 
} from '@akincand/react-editor';

export const advancedPlugin: EditorPlugin = {
  name: 'advancedPlugin',
  version: '2.0.0',
  
  onLoad: (context) => {
    debugGroup('Advanced Plugin Loading', true);
    
    debugLog('PLUGIN', 'Initializing advanced features...');
    
    // Check requirements
    const requirements = checkRequirements();
    if (!requirements.met) {
      debugWarn('PLUGIN', 'Some requirements not met', requirements);
    }
    
    // Register custom commands
    debugLog('PLUGIN', 'Registering advanced commands...');
    try {
      context.registerCommand({
        name: 'advancedFeature',
        execute: () => {
          debugLog('COMMAND', 'Running advanced feature');
          // Implementation
        }
      });
      debugLog('PLUGIN', '✓ Commands registered successfully');
    } catch (error) {
      debugError('PLUGIN', 'Failed to register commands', error);
    }
    
    debugGroupEnd();
  },
  
  onUnload: () => {
    debugLog('PLUGIN', 'Advanced plugin unloading...');
    // Cleanup
  }
};
```

## Best Practices

### 1. Use Meaningful Categories
Choose clear category names that describe the context:

```tsx
debugLog('PLUGIN', '...');    // Plugin-related logs
debugLog('COMMAND', '...');   // Command execution
debugLog('UI', '...');        // UI interactions
debugLog('API', '...');       // API calls
```

### 2. Include Relevant Data
Pass objects with context data for better debugging:

```tsx
debugLog('PLUGIN', 'Plugin loaded', {
  name: plugin.name,
  version: plugin.version,
  features: plugin.features
});
```

### 3. Use Groups for Related Operations
Group related logs together:

```tsx
debugGroup('Loading Configuration');
debugLog('CONFIG', 'Loading user preferences...');
debugLog('CONFIG', 'Applying theme...');
debugLog('CONFIG', 'Initializing plugins...');
debugGroupEnd();
```

### 4. Use Appropriate Log Levels
- `debugLog` - Normal operations
- `debugWarn` - Potential issues
- `debugError` - Actual errors

### 5. Don't Log Sensitive Data
Avoid logging passwords, tokens, or user data:

```tsx
// ❌ Bad
debugLog('AUTH', 'User logged in', { password: user.password });

// ✅ Good
debugLog('AUTH', 'User logged in', { userId: user.id });
```

## Performance Considerations

Debug mode has minimal performance impact:
- Logs only execute when `debugConsole={true}`
- All debug functions check the flag before executing
- No overhead in production when debug mode is disabled

## Troubleshooting

### Debug Logs Not Appearing

1. Check that `debugConsole` prop is set to `true`
2. Check browser console is open
3. Check console filters (make sure "Verbose" is enabled)

### Too Many Logs

Use browser console filters to show only specific categories:

1. Open browser DevTools
2. Type in filter: `PLUGIN` to see only plugin logs
3. Type in filter: `COMMAND` to see only command logs

### Custom Categories Not Showing

Make sure you're using the debug logger functions:

```tsx
// ❌ Won't work
console.log('My message');

// ✅ Will work with debug mode
debugLog('CUSTOM', 'My message');
```

## Next Steps

- [API Reference](api-reference.md)
- [Plugin Development](plugins/creating-plugins.md)
- [Configuration](configuration.md)

