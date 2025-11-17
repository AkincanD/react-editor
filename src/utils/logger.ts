// Logger utility for React Editor
// Logs only when debugConsole is enabled

let debugMode = false;

export const setDebugMode = (enabled: boolean) => {
  debugMode = enabled;
  if (enabled) {
    console.log(
      '%c🎨 React Editor Debug Mode Enabled',
      'background: #4F46E5; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
    );
  }
};

export const debugLog = (category: string, message: string, data?: unknown) => {
  if (debugMode) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(
      `%c[${timestamp}] %c${category}%c ${message}`,
      'color: #9CA3AF;',
      'color: #3B82F6; font-weight: bold;',
      'color: inherit;',
      data !== undefined ? data : ''
    );
  }
};

export const debugWarn = (category: string, message: string, data?: unknown) => {
  if (debugMode) {
    const timestamp = new Date().toLocaleTimeString();
    console.warn(
      `%c[${timestamp}] %c${category}%c ${message}`,
      'color: #9CA3AF;',
      'color: #F59E0B; font-weight: bold;',
      'color: inherit;',
      data !== undefined ? data : ''
    );
  }
};

export const debugError = (category: string, message: string, data?: unknown) => {
  if (debugMode) {
    const timestamp = new Date().toLocaleTimeString();
    console.error(
      `%c[${timestamp}] %c${category}%c ${message}`,
      'color: #9CA3AF;',
      'color: #EF4444; font-weight: bold;',
      'color: inherit;',
      data !== undefined ? data : ''
    );
  }
};

export const debugGroup = (title: string, collapsed = false) => {
  if (debugMode) {
    if (collapsed) {
      console.groupCollapsed(`%c${title}`, 'color: #8B5CF6; font-weight: bold;');
    } else {
      console.group(`%c${title}`, 'color: #8B5CF6; font-weight: bold;');
    }
  }
};

export const debugGroupEnd = () => {
  if (debugMode) {
    console.groupEnd();
  }
};

