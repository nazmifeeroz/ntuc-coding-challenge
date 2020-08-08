module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', { targets: { node: 'current' } }],
    'next/babel',
  ],
  plugins: [
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
    [
      'module-resolver',
      {
        alias: {
          _components: './src/components',
          _hooks: './src/hooks',
          _pages: './pages',
        },
      },
    ],
  ],
}
