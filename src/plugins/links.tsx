import React from 'react';
import { EditorPlugin } from '../types';

export const linksPlugin: EditorPlugin = {
  name: 'links',
  version: '1.0.0',
  toolbarButtons: [
    {
      id: 'createLink',
      label: 'Link',
      title: 'Insert Link',
      group: 'links',
      order: 1,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      onClick: () => {
        const url = prompt('Enter URL:');
        if (url) {
          document.execCommand('createLink', false, url);
        }
      }
    },
    {
      id: 'unlink',
      label: 'Unlink',
      title: 'Remove Link',
      command: 'unlink',
      group: 'links',
      order: 2,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ],
  commands: [
    {
      name: 'createLink',
      execute: (url?: unknown) => document.execCommand('createLink', false, url as string),
      canExecute: () => true
    },
    {
      name: 'unlink',
      execute: () => document.execCommand('unlink', false),
      canExecute: () => true
    }
  ]
};

