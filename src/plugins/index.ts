import { basicFormattingPlugin } from './basicFormatting';
import { headingsPlugin } from './headings';
import { listsPlugin } from './lists';
import { alignmentPlugin } from './alignment';
import { linksPlugin } from './links';
import { videoPlugin } from './video';
import { imagePlugin } from './image';
import { colorPlugin } from './color';

export { basicFormattingPlugin } from './basicFormatting';
export { headingsPlugin } from './headings';
export { listsPlugin } from './lists';
export { alignmentPlugin } from './alignment';
export { linksPlugin } from './links';
export { videoPlugin } from './video';
export { imagePlugin } from './image';
export { colorPlugin } from './color';

// Export modal wrappers
export { LinkModalWrapper } from './links';
export { VideoModalWrapper } from './video';
export { ImageModalWrapper } from './image';
export { ColorButton } from './color';

// Export a default set of plugins
export const defaultPlugins = [
  basicFormattingPlugin,
  headingsPlugin,
  listsPlugin,
  alignmentPlugin,
  linksPlugin,
  videoPlugin,
  imagePlugin,
  colorPlugin
];

