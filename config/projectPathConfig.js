import path from 'path';

export const ROOT_PATH = path.normalize(path.join(__dirname, '/../'));
export const SRC_PATH = path.join(ROOT_PATH, 'src');
export const BUILD_PATH = path.join(ROOT_PATH, 'build');
export const NODE_MODULES_PATH = path.join(ROOT_PATH, 'node_modules');
