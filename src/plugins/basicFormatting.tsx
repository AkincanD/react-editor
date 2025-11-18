import React from 'react';
import { EditorPlugin } from '../types';

export const basicFormattingPlugin: EditorPlugin = {
  name: 'basicFormatting',
  version: '1.0.0',
  toolbarButtons: [
    {
      id: 'bold',
      label: 'B',
      title: 'Bold (Ctrl+B)',
      command: 'bold',
      group: 'formatting',
      order: 1,
      icon: <span className="font-bold">B</span>,
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        if (!element) return false;
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.fontWeight === '700' || computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight) >= 700;
      }
    },
    {
      id: 'italic',
      label: 'I',
      title: 'Italic (Ctrl+I)',
      command: 'italic',
      group: 'formatting',
      order: 2,
      icon: <span className="italic">I</span>,
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        if (!element) return false;
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.fontStyle === 'italic' || computedStyle.fontStyle === 'oblique';
      }
    },
    {
      id: 'underline',
      label: 'U',
      title: 'Underline (Ctrl+U)',
      command: 'underline',
      group: 'formatting',
      order: 3,
      icon: <span className="underline">U</span>,
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        if (!element) return false;
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.textDecorationLine?.includes('underline') || computedStyle.textDecoration?.includes('underline');
      }
    },
    {
      id: 'strikethrough',
      label: 'S',
      title: 'Strikethrough',
      command: 'strikeThrough',
      group: 'formatting',
      order: 4,
      icon: <span className="line-through">S</span>,
      isActive: () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        const node = selection.anchorNode;
        if (!node) return false;
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement;
        if (!element) return false;
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.textDecorationLine?.includes('line-through') || computedStyle.textDecoration?.includes('line-through');
      }
    }
  ],
  commands: [
    {
      name: 'bold',
      execute: () => document.execCommand('bold', false),
      canExecute: () => true
    },
    {
      name: 'italic',
      execute: () => document.execCommand('italic', false),
      canExecute: () => true
    },
    {
      name: 'underline',
      execute: () => document.execCommand('underline', false),
      canExecute: () => true
    },
    {
      name: 'strikeThrough',
      execute: () => document.execCommand('strikeThrough', false),
      canExecute: () => true
    }
  ],
  shortcuts: [
    {
      key: 'b',
      ctrlKey: true,
      handler: () => document.execCommand('bold', false)
    },
    {
      key: 'i',
      ctrlKey: true,
      handler: () => document.execCommand('italic', false)
    },
    {
      key: 'u',
      ctrlKey: true,
      handler: () => document.execCommand('underline', false)
    }
  ]
};

