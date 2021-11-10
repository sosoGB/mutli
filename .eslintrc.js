/*
 * @Author: your name
 * @Date: 2021-09-27 09:39:26
 * @LastEditTime: 2021-11-04 17:19:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \mutli\.eslintrc.js
 */
module.exports = {
  root: false,
  env: {
    browser: true,
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
