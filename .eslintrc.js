module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-essential', 'standard', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {},
}