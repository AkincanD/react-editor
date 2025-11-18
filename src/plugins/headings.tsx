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
      icon: <span className="font-bold text-lg">H1</span>,
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        return element?.tagName === 'H1';
      }
    },
    {
      id: 'h2',
      label: 'H2',
      title: 'Heading 2',
      command: 'formatBlock',
      value: '<h2>',
      group: 'headings',
      order: 2,
      icon: <span className="font-bold">H2</span>,
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        return element?.tagName === 'H2';
      }
    },
    {
      id: 'h3',
      label: 'H3',
      title: 'Heading 3',
      command: 'formatBlock',
      value: '<h3>',
      group: 'headings',
      order: 3,
      icon: <span className="font-semibold text-sm">H3</span>,
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        return element?.tagName === 'H3';
      }
    },
    {
      id: 'paragraph',
      label: 'P',
      title: 'Paragraph',
      command: 'formatBlock',
      value: '<p>',
      group: 'headings',
      order: 4,
      icon: <span>P</span>,
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        if (!element) return false;
        const tagName = element.tagName;
        // Active if it's a paragraph and not a heading
        return tagName === 'P' || (tagName !== 'H1' && tagName !== 'H2' && tagName !== 'H3' && tagName !== 'H4' && tagName !== 'H5' && tagName !== 'H6');
      }
    }
  ],
  commands: [
    {
      name: 'formatBlock',
      execute: (value?: unknown) => document.execCommand('formatBlock', false, value as string),
      canExecute: () => true
    }
  ]
};

