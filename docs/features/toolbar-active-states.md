# Toolbar Active States

React Editor automatically detects and displays active states for toolbar buttons based on the current selection.

## Overview

When you select text in the editor, toolbar buttons automatically update to show which formatting is currently applied. This provides immediate visual feedback about the text's formatting state.

## How It Works

The toolbar uses the `isActive` function on each button to determine if it should be highlighted:

1. **Selection Change Detection**: The editor listens to selection changes via `selectionchange`, `mouseup`, and `keyup` events
2. **Active State Evaluation**: Each button's `isActive` function is called to check if the current format matches
3. **Visual Update**: Active buttons are highlighted with the `reactEditor_active` CSS class
4. **Real-time Updates**: The toolbar updates instantly as you move the cursor or select different text

## Built-in Active States

All built-in plugins include proper active state detection:

### Headings (H1, H2, H3, P)
- Detects the current heading level by checking the parent element's tag name
- Only one heading button can be active at a time
- Paragraph button is active when text is not a heading

### Text Formatting (Bold, Italic, Underline, Strikethrough)
- Uses `getComputedStyle()` to check CSS properties
- Bold: Checks `fontWeight >= 700`
- Italic: Checks `fontStyle === 'italic'` or `'oblique'`
- Underline: Checks `textDecorationLine` or `textDecoration` for 'underline'
- Strikethrough: Checks `textDecorationLine` for 'line-through'

### Alignment (Left, Center, Right, Justify)
- Uses `getComputedStyle()` to check `textAlign` property
- Only one alignment button can be active at a time
- Left alignment is also active when `textAlign` is 'start' or empty

### Lists (Bullet, Numbered)
- Checks if the selection is inside a `<ul>` or `<ol>` element
- Uses `element.closest('ul')` or `element.closest('ol')` for detection

### Links
- Link button is active when cursor is inside an `<a>` tag
- Unlink button is also active when inside a link
- Uses `element.closest('a')` for detection

## Creating Custom Active States

When creating custom plugins, implement `isActive` functions using modern DOM APIs:

### Basic Pattern

```tsx
{
  id: 'myButton',
  label: 'My Button',
  isActive: () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return false;
    
    const node = selection.anchorNode;
    if (!node) return false;
    
    // Get the element (handle text nodes)
    const element = node.nodeType === Node.TEXT_NODE 
      ? node.parentElement 
      : node as HTMLElement;
    
    if (!element) return false;
    
    // Check your condition
    return /* your check here */;
  }
}
```

### Examples

**Check CSS Property:**
```tsx
isActive: () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const node = selection.anchorNode;
  if (!node) return false;
  const element = node.nodeType === Node.TEXT_NODE 
    ? node.parentElement 
    : node as HTMLElement;
  if (!element) return false;
  
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.color === 'rgb(255, 0, 0)'; // Red text
}
```

**Check Element Type:**
```tsx
isActive: () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const node = selection.anchorNode;
  if (!node) return false;
  const element = node.nodeType === Node.TEXT_NODE 
    ? node.parentElement 
    : node as HTMLElement;
  
  return element?.tagName === 'BLOCKQUOTE';
}
```

**Check Parent Element:**
```tsx
isActive: () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const node = selection.anchorNode;
  if (!node) return false;
  const element = node.nodeType === Node.TEXT_NODE 
    ? node.parentElement 
    : node as HTMLElement;
  if (!element) return false;
  
  return element.closest('.my-custom-class') !== null;
}
```

**Check Multiple Conditions:**
```tsx
isActive: () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const node = selection.anchorNode;
  if (!node) return false;
  const element = node.nodeType === Node.TEXT_NODE 
    ? node.parentElement 
    : node as HTMLElement;
  if (!element) return false;
  
  const computedStyle = window.getComputedStyle(element);
  const isBold = computedStyle.fontWeight === '700';
  const isRed = computedStyle.color === 'rgb(255, 0, 0)';
  
  return isBold && isRed;
}
```

## Best Practices

### 1. Always Check Selection
```tsx
// ✅ Good
isActive: () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  // ... rest of logic
}

// ❌ Bad - No selection check
isActive: () => {
  return document.body.style.color === 'red';
}
```

### 2. Handle Text Nodes
```tsx
// ✅ Good - Handles both text and element nodes
const element = node.nodeType === Node.TEXT_NODE 
  ? node.parentElement 
  : node as HTMLElement;

// ❌ Bad - Assumes element node
const element = node as HTMLElement;
```

### 3. Use Modern APIs
```tsx
// ✅ Good - Modern API
const computedStyle = window.getComputedStyle(element);
return computedStyle.fontWeight === '700';

// ❌ Bad - Deprecated API
return document.queryCommandState('bold');
```

### 4. Return Early for Performance
```tsx
// ✅ Good - Early returns
isActive: () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const node = selection.anchorNode;
  if (!node) return false;
  // ... continue only if needed
}

// ❌ Bad - Unnecessary work
isActive: () => {
  const allElements = document.querySelectorAll('*');
  // ... expensive operations
}
```

## Performance

The active state detection is optimized for performance:

- **Event Throttling**: Selection change events are handled efficiently
- **Lazy Evaluation**: `isActive` functions are only called when needed
- **Non-blocking**: Updates don't block the UI thread
- **Cached Results**: React's rendering optimizes re-evaluations

## Troubleshooting

### Button Not Showing Active State

1. **Check Selection**: Make sure text is actually selected
2. **Verify Logic**: Test your `isActive` function manually
3. **Check Console**: Look for errors in the browser console
4. **Inspect Element**: Use DevTools to check computed styles

### Active State Updates Slowly

1. **Optimize Function**: Reduce expensive operations in `isActive`
2. **Check Dependencies**: Ensure no blocking operations
3. **Use Early Returns**: Return `false` as soon as possible

### Multiple Buttons Active

This is normal for some cases:
- **Link + Unlink**: Both can be active when inside a link
- **Formatting Combinations**: Bold + Italic can both be active

## Examples

See the built-in plugins for complete examples:
- [Headings Plugin](../../src/plugins/headings.tsx)
- [Basic Formatting Plugin](../../src/plugins/basicFormatting.tsx)
- [Alignment Plugin](../../src/plugins/alignment.tsx)
- [Lists Plugin](../../src/plugins/lists.tsx)
- [Links Plugin](../../src/plugins/links.tsx)

## Related Documentation

- [Creating Custom Plugins](../plugins/creating-plugins.md)
- [Plugin API Reference](../plugins/plugin-api.md)
- [Toolbar Configuration](../configuration.md)

