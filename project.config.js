const NODE_ENV = process.env.NODE_ENV || 'development';
const PUB_PATH = process.env.PUB_PATH || 'data-list';

module.exports = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: './src/data-list',

  popupDir: './src/popup',
  optionsDir: './src/options',
  /** The file name of the plugin's entry point */
  main: 'index.js',
  popup: 'popup.js',
  options: 'options.js',
  outDir: './data-list',
  outPopupDir: './popup',
  outOptionsDir: './options',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: PUB_PATH,
  /** Whether to generate sourcemaps */
  sourcemaps: NODE_ENV == 'development' ? true : false,
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: {},
  /** Whether to enable verbose logging */
  verbose: false,
  /** The list of modules to bundle separately from the core application code */
  vendors: [
  ],
};
