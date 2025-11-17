# Modal Component

The Modal component provides a beautiful, accessible dialog interface used throughout React Editor for user interactions like link and video insertion.

## Features

- 🎨 **Theme-Aware**: Automatically adapts to light/dark theme
- ⌨️ **Keyboard Navigation**: ESC key closes modal
- 🖱️ **Click Outside**: Click overlay to close
- 🔒 **Body Scroll Lock**: Prevents background scrolling
- ✨ **Smooth Animations**: Fade-in and slide-up animations
- 📱 **Responsive**: Works on all screen sizes
- ♿ **Accessible**: Proper focus management and ARIA labels

## Import

```typescript
import { Modal } from '@akincand/react-editor';
```

## Basic Usage

```tsx
import { Modal } from '@akincand/react-editor';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Called when modal should close |
| `title` | `string` | Yes | Modal title text |
| `children` | `ReactNode` | Yes | Modal body content |

## Modal Structure

The modal consists of three main parts:

### 1. Header
Contains the title and close button.

```tsx
<Modal title="Insert Link" /* ... */>
  {/* Content */}
</Modal>
```

### 2. Body
Contains your custom content.

```tsx
<Modal /* ... */>
  <div className="reactEditor_formGroup">
    <label className="reactEditor_label">URL</label>
    <input className="reactEditor_input" />
  </div>
</Modal>
```

### 3. Footer (Optional)
Add a footer with buttons using the provided class:

```tsx
<Modal /* ... */>
  <div className="reactEditor_formGroup">
    {/* Form fields */}
  </div>
  
  <div className="reactEditor_modalFooter">
    <button className="reactEditor_button reactEditor_buttonSecondary">
      Cancel
    </button>
    <button className="reactEditor_button reactEditor_buttonPrimary">
      Submit
    </button>
  </div>
</Modal>
```

## Styling Classes

### Form Elements

```css
/* Form group wrapper */
.reactEditor_formGroup

/* Label */
.reactEditor_label

/* Input field */
.reactEditor_input

/* Checkbox wrapper */
.reactEditor_checkbox

/* Checkbox input */
.reactEditor_checkboxInput

/* Checkbox label */
.reactEditor_checkboxLabel
```

### Buttons

```css
/* Base button */
.reactEditor_button

/* Primary button (blue) */
.reactEditor_buttonPrimary

/* Secondary button (gray) */
.reactEditor_buttonSecondary
```

### Layout

```css
/* Modal footer */
.reactEditor_modalFooter

/* Advanced options toggle */
.reactEditor_advancedToggle

/* Advanced content wrapper */
.reactEditor_advancedContent

/* Two-column input row */
.reactEditor_inputRow
```

## Complete Example

```tsx
import { Modal } from '@akincand/react-editor';
import { useState } from 'react';

function CompleteModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [phone, setPhone] = useState('');
  
  const handleSubmit = () => {
    console.log({ name, email, phone });
    setIsOpen(false);
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setShowAdvanced(false);
  };
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Form
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="User Information"
      >
        <div className="reactEditor_formGroup">
          <label className="reactEditor_label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="reactEditor_input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="reactEditor_formGroup">
          <label className="reactEditor_label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="reactEditor_input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="reactEditor_advancedToggle">
          <label className="reactEditor_checkbox">
            <input
              type="checkbox"
              className="reactEditor_checkboxInput"
              checked={showAdvanced}
              onChange={(e) => setShowAdvanced(e.target.checked)}
            />
            <span className="reactEditor_checkboxLabel">
              Advanced Options
            </span>
          </label>
          
          {showAdvanced && (
            <div className="reactEditor_advancedContent">
              <div className="reactEditor_formGroup">
                <label className="reactEditor_label" htmlFor="phone">
                  Phone (Optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="reactEditor_input"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="reactEditor_modalFooter">
          <button
            type="button"
            className="reactEditor_button reactEditor_buttonSecondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="reactEditor_button reactEditor_buttonPrimary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
}
```

## Two-Column Layout

Use `.reactEditor_inputRow` for side-by-side inputs:

```tsx
<div className="reactEditor_inputRow">
  <div className="reactEditor_formGroup">
    <label className="reactEditor_label">Width</label>
    <input className="reactEditor_input" placeholder="640px" />
  </div>
  <div className="reactEditor_formGroup">
    <label className="reactEditor_label">Height</label>
    <input className="reactEditor_input" placeholder="480px" />
  </div>
</div>
```

## Keyboard Behavior

- **ESC**: Closes modal
- **Tab**: Navigates through focusable elements
- **Enter**: Submit form (add your own handler)
- **Click Outside**: Closes modal

## Accessibility Features

1. **Focus Management**: Automatically manages focus when opened/closed
2. **Body Scroll Lock**: Prevents background scrolling when modal is open
3. **Keyboard Navigation**: Full keyboard support
4. **ARIA Labels**: Proper labeling for screen readers
5. **Close Button**: Visible × button with ARIA label

## Theme Support

The modal automatically adapts to the editor's theme:

```tsx
// Light mode
<Modal /* ... */>
  {/* Light theme styling */}
</Modal>

// Dark mode (automatic when editor theme is dark)
<Modal /* ... */>
  {/* Dark theme styling */}
</Modal>
```

## Custom Styling

Override modal styles with CSS:

```css
/* Customize modal width */
.reactEditor_modal {
  max-width: 600px; /* Default: 500px */
}

/* Customize overlay opacity */
.reactEditor_modalOverlay {
  background-color: rgba(0, 0, 0, 0.7); /* Default: 0.5 */
}

/* Customize animations */
.reactEditor_modal {
  animation: reactEditor_slideUp 0.5s ease-out; /* Slower animation */
}

/* Custom form styling */
.reactEditor_input {
  border-radius: 8px; /* Rounder corners */
  padding: 12px 16px; /* More padding */
}

/* Custom button styling */
.reactEditor_buttonPrimary {
  background-color: #059669; /* Green instead of blue */
}
```

## Using in Plugins

Create modal-based features in your custom plugins:

```tsx
import { EditorPlugin, Modal } from '@akincand/react-editor';
import { useState } from 'react';

let modalState = {
  isOpen: false,
  setIsOpen: (value: boolean) => {}
};

export const myModalPlugin: EditorPlugin = {
  name: 'my-modal-plugin',
  version: '1.0.0',
  
  toolbarButtons: [
    {
      id: 'open-modal',
      label: '🎯',
      title: 'Open My Modal',
      onClick: () => {
        modalState.setIsOpen(true);
      }
    }
  ]
};

export const MyModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  modalState.isOpen = isOpen;
  modalState.setIsOpen = setIsOpen;
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="My Custom Modal"
    >
      <p>Custom modal content</p>
    </Modal>
  );
};
```

## Best Practices

1. **Close on Success**: Always close modal after successful action
2. **Reset State**: Clear form values when closing
3. **Auto-focus**: Use `autoFocus` on first input for better UX
4. **Validation**: Validate inputs before submission
5. **Loading States**: Show loading indicator for async operations
6. **Error Messages**: Display clear error messages inline
7. **Responsive**: Test on different screen sizes

## Troubleshooting

### Modal Not Closing

- Ensure `onClose` is properly connected to state setter
- Check for JavaScript errors preventing state updates
- Verify ESC key handler is not blocked

### Styling Issues

- Ensure editor CSS is loaded
- Check for z-index conflicts (modal uses z-index: 1000)
- Verify dark mode class is applied correctly

### Focus Issues

- Modal automatically manages focus
- If using custom focus logic, be careful with `autoFocus`
- Check that modal is mounted when trying to focus elements

## Related

- [Link Insertion](../features/link-insertion.md)
- [Video Embedding](../features/video-embedding.md)
- [Creating Custom Plugins](../plugins/creating-plugins.md)
- [Theming](../customization/theming.md)

