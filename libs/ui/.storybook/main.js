const path = require("path");

const config = {
    stories: ['../src/lib/**/*.mdx', '../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: ['@storybook/addon-essentials'],
    framework: {
        name: '@storybook/nextjs',
        options: {
            nextConfigPath: path.resolve(__dirname, '../next.config.js'),
        },
    },
    docs: {
        autodocs: true
    }
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
