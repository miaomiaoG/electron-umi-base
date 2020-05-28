import pageRoutes from './router.config';
import path from 'path';
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
const APP_DIR = path.resolve(__dirname, './pages');

// ref: https://umijs.org/config/
export default {
  history: 'hash',
  outputPath: `../dist/renderer`,
  publicPath: './',
  treeShaking: true,
  cssLoaderOptions: {
    modules: true,
    rules: [
      {
        test: /\.css$/,
        include: APP_DIR,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              namedExport: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ['style-loader', 'css-loader'],
      },
    ],
    getLocalIdent: (context, localIdentName, localName) => {

      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('global.css')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/pages(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '').replace('.css', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `minieye-${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'c1_destop_tool',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  routes: pageRoutes,
}
