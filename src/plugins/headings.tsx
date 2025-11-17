import React from 'react';
import { EditorPlugin } from '../types';

export const headingsPlugin: EditorPlugin = {
  name: 'headings',
  version: '1.0.0',
  toolbarButtons: [
    {
      id: 'h1',
      label: 'H1',
      title: 'Heading 1',
      command: 'formatBlock',
      value: '<h1>',
      group: 'headings',
      order: 1,
      icon: <span className="font-bold text-lg">H1</span>
    },
    {
      id: 'h2',
      label: 'H2',
      title: 'Heading 2',
      command: 'formatBlock',
      value: '<h2>',
      group: 'headings',
      order: 2,
      icon: <span className="font-bold">H2</span>
    },
    {
      id: 'h3',
      label: 'H3',
      title: 'Heading 3',
      command: 'formatBlock',
      value: '<h3>',
      group: 'headings',
      order: 3,
      icon: <span className="font-semibold text-sm">H3</span>
    },
    {
      id: 'paragraph',
      label: 'P',
      title: 'Paragraph',
      command: 'formatBlock',
      value: '<p>',
      group: 'headings',
      order: 4,
      icon: <span>P</span>
    }
  ],
  commands: [
    {
      name: 'formatBlock',
      execute: (value: string) => document.execCommand('formatBlock', false, value),
      canExecute: () => true
    }
  ]
};

