module.exports = {
  "verbose": true,
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "transform": {
    "^.+\\.(js|jsx)?$": "<rootDir>/node_modules/babel-jest"
  },
  "modulePaths": [
    "<rootDir>/src"
  ],
  "moduleFileExtensions": [
    ".",
    "js",
    "jsx",
    "jsx"
  ],
  "moduleDirectories": [
    "<rootDir>/node_modules",
    "<rootDir>/src"
  ],
  "setupFilesAfterEnv": ['./src/jest.setup.js'],
}