import path from 'path';

export const ROOT_FOLDER_PATH = path.normalize(path.join(__dirname, '/../'));
export const SRC_FOLDER_PATH = path.join(ROOT_FOLDER_PATH, 'src');
export const BUILD_FOLDER_PATH = path.join(ROOT_FOLDER_PATH, 'public');
export const NODE_MODULES_FOLDER_PATH = path.join(ROOT_FOLDER_PATH, 'node_modules');
