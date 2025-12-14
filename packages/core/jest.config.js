module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleNameMapper: {
        '\\.(css)$': 'identity-obj-proxy',
        '^@company/(.*)$': '<rootDir>/../$1/src',
    },
    transform: {
        '^.+\\.css\\.ts$': '<rootDir>/vanilla-extract-jest-mock.js',
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: {
                    jsx: 'react',
                    esModuleInterop: true,
                    allowSyntheticDefaultImports: true,
                },
            },
        ],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@company)/)',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.stories.tsx',
        '!src/**/*.css.ts',
        '!src/**/index.ts',
    ],
};
