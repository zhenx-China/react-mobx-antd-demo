# CAD-MOBX-ANTD-DEMO

使用react+MobX(状态管理)+antd(UI库)+axios(服务请求)+intl(多语言)+css modules完成的demo。

## 使用步骤

* 1.启动依赖的服务程序，在cmd中执行以下命令，默认端口为8080，若被占用可以加上`--server.port=8090`参数指定端口。

```
java -jar demo-0.0.1-SNAPSHOT.jar 

```

* 2.执行`npm install`命令安装依赖

* 3.执行`npm start`运行demo。默认访问地址为http://localhost:3000

* 4.登录账户：userName:admin;password:admin

## 注意事项

以下是demo开发过程中一些注意事项的相关说明，demo中已全部配置完成。

### MobX

使用MobX时，如果想使用装饰器，需要进行以下配置。

* 1.在tsconfig.json中添加以下配置以消除VSCode中对使用装饰器的警告。
```
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

* 2.在create-react-app中使用装饰器,需要首先执行`npm run eject`,将所有内建的配置（配置文件和 package.json 依赖库）暴露出来。

* 3.安装相关依赖
```
npm install babel-preset-stage-2 --save-dev
npm install babel-preset-react-native-stage-0 --save-dev
npm install --save mobx mobx-react
```

* 4.修改配置文件package.json中的"babel"节点，添加以下内容：
```
    "presets": [
      "react-native-stage-0/decorator-support"
    ]
```

### antd

使用antd时，为了避免加载全部的 antd 组件的样式，需要引入babel-plugin-import，它是一个用于按需加载组件代码和样式的 babel 插件。

* 1.安装相关依赖

```
npm install babel-plugin-import --save-dev 
```

* 2.修改配置文件package.json中的"babel"节点，添加以下内容：

```
     "plugins": [
     "transform-runtime",
       [
           "import",
           {
               "libraryName": "antd",
               "style": "css"
          }
       ]
   ]
```

## css modules

css modules是在构建步骤（例如使用Webpack或Browserify）中对CSS类名选择器限定作用域的一种方式。需要修改config目录下的webpack.config.dev.js配置,添加对css modules的支持。需要注意的是，antd 和 css modules 不能混用，因此需要在开启时将antd的css排除在外，并且针对antd的css 单独写一条loader的规则,不开启 css modules。

```
{
            test: /\.css$/,
            exclude: [/node_modules|antd\.css/],
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,   // 新增对css modules的支持
                  localIdentName: '[name]__[local]__[hash:base64:5]', //
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          }, 
  //新增针对antd的css 的loader规则,不开启 css modules
          {
          test: /\.css$/,
           include: [/node_modules|antd\.css/],
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  // 改动
                  // modules: true,   // 新增对css modules的支持
                  // localIdentName: '[name]__[local]__[hash:base64:5]', //
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
```


