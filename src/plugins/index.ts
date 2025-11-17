import { basicFormattingPlugin } from './basicFormatting';
import { headingsPlugin } from './headings';
import { listsPlugin } from './lists';
import { alignmentPlugin } from './alignment';
import { linksPlugin } from './links';
import { videoPlugin } from './video';

export { basicFormattingPlugin } from './basicFormatting';
export { headingsPlugin } from './headings';
export { listsPlugin } from './lists';
export { alignmentPlugin } from './alignment';
export { linksPlugin } from './links';
export { videoPlugin } from './video';

// Export modal wrappers
export { LinkModalWrapper } from './links';
export { VideoModalWrapper } from './video';

// Export a default set of plugins
export const defaultPlugins = [
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin,
  alignmentPlugin,
  linksPlugin,
  videoPlugin
];

