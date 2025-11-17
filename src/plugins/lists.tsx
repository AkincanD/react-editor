import React from 'react';
import { EditorPlugin } from '../types';

export const listsPlugin: EditorPlugin = {
  name: 'lists',
  version: '1.0.0',
  toolbarButtons: [
    {
      id: 'bulletList',
      label: '• List',
      title: 'Bullet List',
      command: 'insertUnorderedList',
      group: 'lists',
      order: 1,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      isActive: () => document.queryCommandState('insertUnorderedList')
    },
    {
      id: 'orderedList',
      label: '1. List',
      title: 'Numbered List',
      command: 'insertOrderedList',
      group: 'lists',
      order: 2,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      isActive: () => document.queryCommandState('insertOrderedList')
    }
  ],
  commands: [
    {
      name: 'insertUnorderedList',
      execute: () => document.execCommand('insertUnorderedList', false),
      canExecute: () => true
    },
    {
      name: 'insertOrderedList',
      execute: () => document.execCommand('insertOrderedList', false),
      canExecute: () => true
    }
  ]
};

