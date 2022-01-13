# 时空小胶囊

## 指南

> 本项目使用的是`vue`框架，并搭配[`element`](https://element.eleme.cn/#/zh-CN)组件库

运行本项目：`ctrl+~`打开终端，在终端输入`npm run serve`，所搭建的环境将自带**热重载**，保存代码后会自动更新修改

## 文件作用介绍

- main.js - 项目的入口文件，项目中所有的页面都会加载 main.js，它的作用有：

  - 实例化 vue
  - 放置项目中经常用到的插件和 css 样式，如网络请求插件：axios 和 vue-resource、图片懒加载插件：vue-lazyload
  - 存储全局变量（store/vuex）

- package.json - `package.json` 文件是项目的清单。 它可以做很多完全互不相关的事情。 例如，它是用于工具的配置中心, 也是 `npm` 和 `yarn` 存储所有已安装软件包的名称和版本的地方。它的常见属性有：

  - `version` 表明了当前的版本。
  - `name` 设置了应用程序/软件包的名称。
  - `description` 是应用程序/软件包的简短描述。
  - `main` 设置了应用程序的入口点。
  - `private` 如果设置为 `true`，则可以防止应用程序/软件包被意外地发布到 `npm`。
  - `scripts` 定义了一组可以运行的 node 脚本。
  - `dependencies` 设置了作为依赖安装的 `npm` 软件包的列表。
  - `devDependencies` 设置了作为开发依赖安装的 `npm` 软件包的列表。
  - `engines` 设置了此软件包/应用程序在哪个版本的 Node.js 上运行。
  - `browserslist` 用于告知要支持哪些浏览器（及其版本）。

  详情请移步[`Node.js官方说明文档`](http://nodejs.cn/learn/the-package-json-guide)
