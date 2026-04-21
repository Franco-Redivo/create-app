module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^Assets/.*\\.svg$': '<rootDir>/tests/__mocks__/fileMock.js',
    '^Assets/.*\\.(gif|ttf|eot|png|jpg|jpeg|webp)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '^Components/(.*)$': '<rootDir>/client/components/$1',
    '^Utilities/(.*)$': '<rootDir>/client/util/$1',
    '^Assets/(.*)$': '<rootDir>/client/assets/$1',
    '^@root/(.*)$': '<rootDir>/$1',
    '\\.(css|scss|sass)$': '<rootDir>/tests/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e-tests/'],
}
