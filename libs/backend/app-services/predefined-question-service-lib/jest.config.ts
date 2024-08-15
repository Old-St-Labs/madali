/* eslint-disable */
export default {
    displayName: 'predefined-question-service-lib',
    preset: '../../../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' },
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory:
        '../../../../coverage/libs/backend/app-services/predefined-question-service-lib',
};
