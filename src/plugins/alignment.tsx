import React from 'react';
import { EditorPlugin } from '../types';

export const alignmentPlugin: EditorPlugin = {
  name: 'alignment',
  version: '1.0.0',
  toolbarButtons: [
    {
      id: 'alignLeft',
      label: 'Left',
      title: 'Align Left',
      command: 'justifyLeft',
      group: 'alignment',
      order: 1,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      )
    },
    {
      id: 'alignCenter',
      label: 'Center',
      title: 'Align Center',
      command: 'justifyCenter',
      group: 'alignment',
      order: 2,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M8 12h8M6 18h12" />
        </svg>
      )
    },
    {
      id: 'alignRight',
      label: 'Right',
      title: 'Align Right',
      command: 'justifyRight',
      group: 'alignment',
      order: 3,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M12 12h8M4 18h16" />
        </svg>
      )
    },
    {
      id: 'alignJustify',
      label: 'Justify',
      title: 'Justify',
      command: 'justifyFull',
      group: 'alignment',
      order: 4,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )
    }
  ],
  commands: [
    {
      name: 'justifyLeft',
      execute: () => document.execCommand('justifyLeft', false),
      canExecute: () => true
    },
    {
      name: 'justifyCenter',
      execute: () => document.execCommand('justifyCenter', false),
      canExecute: () => true
    },
    {
      name: 'justifyRight',
      execute: () => document.execCommand('justifyRight', false),
      canExecute: () => true
    },
    {
      name: 'justifyFull',
      execute: () => document.execCommand('justifyFull', false),
      canExecute: () => true
    }
  ]
};

