/* eslint-disable */
export default {
    displayName:
        'predefined-question-database-lib',
    preset: '../../../../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' },
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory:
        '../../../../../coverage/libs/backend/database-services/predefined-question-database-lib/predefined-question-database-lib',
};
