module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "rules": {
    "no-console": "off",
    "jsx-a11y/anchor-is-valid": "off",
    // 自己喜欢自定义哪些规则可以看情况添加
  },
  "globals": {
    "_DEV_": "readonly"
  },
  "plugins": ["react"]
};
