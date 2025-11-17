import { basicFormattingPlugin } from './basicFormatting';
import { headingsPlugin } from './headings';
import { listsPlugin } from './lists';
import { alignmentPlugin } from './alignment';
import { linksPlugin } from './links';

export { basicFormattingPlugin } from './basicFormatting';
export { headingsPlugin } from './headings';
export { listsPlugin } from './lists';
export { alignmentPlugin } from './alignment';
export { linksPlugin } from './links';

// Export a default set of plugins
export const defaultPlugins = [
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin,
  alignmentPlugin,
  linksPlugin
];

