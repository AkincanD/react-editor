import { basicFormattingPlugin } from './basicFormatting';
import { headingsPlugin } from './headings';
import { listsPlugin } from './lists';
import { alignmentPlugin } from './alignment';
import { linksPlugin } from './links';
import { videoPlugin } from './video';
import { imagePlugin } from './image';

export { basicFormattingPlugin } from './basicFormatting';
export { headingsPlugin } from './headings';
export { listsPlugin } from './lists';
export { alignmentPlugin } from './alignment';
export { linksPlugin } from './links';
export { videoPlugin } from './video';
export { imagePlugin } from './image';

// Export modal wrappers
export { LinkModalWrapper } from './links';
export { VideoModalWrapper } from './video';
export { ImageModalWrapper } from './image';

// Export a default set of plugins
export const defaultPlugins = [
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin,
  alignmentPlugin,
  linksPlugin,
  videoPlugin,
  imagePlugin
];

