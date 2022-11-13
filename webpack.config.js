const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

const devServerPort = 8111;

module.exports = [
  (env, argv) => {
    /** @type {import('webpack').Configuration}*/
    const config = {
      mode: argv.mode,
      devtool: argv.mode === 'development' ? 'eval-cheap-module-source-map' : false,
      entry: {
        monacoRenderer: './src/monacoRenderer.tsx',
      },
      output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'module',
      },
      experiments: {
        outputModule: true,
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/u,
            use: [
              {
                loader: 'thread-loader',
              },
              {
                loader: 'ts-loader',
                options: {
                  happyPackMode: true,
                  transpileOnly: true,
                  compilerOptions: {
                    noEmit: false,
                  },
                },
              },
            ],
          },
          {
            test: /\.css$/u,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
              },
            ],
          },
          {
            test: /\.ttf$/u,
            type: 'asset/resource',
          },
        ],
      },
      devServer: {
        port: devServerPort,
        hot: true,
        disableHostCheck: true,
        writeToDisk: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
      plugins: [
        new MonacoWebpackPlugin({
          languages: ['css', 'graphql', 'html', 'ini', 'javascript', 'json', 'markdown', 'sql', 'xml', 'yaml'],
          features: [
            '!accessibilityHelp',
            '!anchorSelect',
            'bracketMatching',
            '!caretOperations',
            'clipboard',
            'codeAction',
            '!codelens',
            '!colorPicker',
            '!comment',
            'contextmenu',
            '!coreCommands',
            '!cursorUndo',
            '!dnd',
            '!documentSymbols',
            'find',
            'folding',
            '!fontZoom',
            'format',
            '!gotoError',
            '!gotoLine',
            '!gotoSymbol',
            '!hover',
            '!iPadShowKeyboard',
            '!inPlaceReplace',
            'indentation',
            '!inlineHints',
            '!inspectTokens',
            '!linesOperations',
            '!linkedEditing',
            'links',
            '!multicursor',
            '!parameterHints',
            '!quickCommand',
            '!quickHelp',
            '!quickOutline',
            '!referenceSearch',
            '!rename',
            '!smartSelect',
            '!snippets',
            '!suggest',
            '!toggleHighContrast',
            '!toggleTabFocusMode',
            '!transpose',
            '!unusualLineTerminators',
            '!viewportSemanticTokens',
            'wordHighlighter',
            'wordOperations',
            'wordPartOperations',
          ],
        }),
        new ForkTsCheckerWebpackPlugin({
          async: true,
          typescript: {
            diagnosticOptions: {
              semantic: true,
              syntactic: true,
            },
          },
        }),
      ],
      optimization: {
        minimize: true,
      },
    };
    return config;
  },
];
