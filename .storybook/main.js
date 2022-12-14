const webpackConfigResolve = require('../webpack.config.resolve');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }], require.resolve('@emotion/babel-preset-css-prop')],
      },
    });
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensions: [...config.resolve.extensions, '.png'],
        alias: {
          ...config.resolve.alias,
          ...webpackConfigResolve.alias,
        },
      },
    };
  },
};
