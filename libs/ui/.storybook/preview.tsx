import { Preview } from '@storybook/react';
// import 'react-day-picker/src/style.css';
// import '../styles/calendar.scss';
import '../styles/index.scss';
// preview.js
// eslint-disable-next-line import/no-webpack-loader-syntax
// import '!style-loader!css-loader!sass-loader!./scss-loader.scss';

const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                order: ['Introduction']
            }
        }
    }
};

export default preview;