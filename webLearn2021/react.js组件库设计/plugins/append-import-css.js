import * as path from 'path';
import MagicString from 'magic-string';

/**
 * 查找当前目录下是否有 css 文件
 * @param {string} dirname 目录名称
 * @param {bundle} files bundle 信息
 * @returns string
 */
const findCSS = (dirname, bundle) => {
  for (const key in bundle) {
    if (dirname === path.dirname(key) && /.css$/i.test(key)) {
      return path.basename(key);
    }
  }

  return '';
};

/**
 * 添加导入 css，如：import './index.css'
 */
export default function appendImportCSS() {
  return {
    name: 'append-import-css',
    generateBundle(_, bundle) {
      const files = Object.entries(bundle);

      for (const [key, file] of files) {
        if (!file.isEntry) continue;

        const cssFileName = findCSS(path.dirname(key), bundle);

        if (!cssFileName) continue;

        const magicString = new MagicString(file.code);
        magicString.appendLeft(
          0,
          `import './${cssFileName}';${
            process.env.NODE_ENV === 'development' ? '\n' : ''
          }`
        );

        file.code = magicString.toString();
        file.map = magicString.generateMap();

        delete bundle[key];
        bundle[key] = file;
      }
    },
  };
}
