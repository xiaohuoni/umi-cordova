# umi cordova

## 安装环境（Mac）
1.安装XCode
2.安装xcode-select
```sh
$ xcode-select --install
```
弹出软件一直下一步就好。
3.安装ios-deploy
```sh
$ sudo yarn global add ios-deploy
```
4.全局安装Cordova
```sh
$ sudo yarn global add cordova
```
## 新建项目
正常的新建umi项目

## 添加umi-plugin-cordova插件
```sh
$ yarn add umi-plugin-cordova
```
```js
// .umirc.js
export default {
  plugins: [
    ['umi-plugin-cordova']
  ],
};
```

## 添加cordova初始化命令
如果你全局安装了umi，可以使用umi cordova --init --ios
如果你没有全局安装umi，可以在package.json里面添加scripts

```json
{
  "scripts": {
    "cordova-init":"umi cordova --init",
    "cordova-add-ios":"umi cordova --ios",
    "cordova-add-android":"umi cordova --android",
    "start":"umi dev",
    "build":"umi build",
  },
}
```

| 参数 | 说明 |
|  :-  | :-:  |
| --init | 初始化Cordova项目，添加配置文件和相关文件夹 |
| --ios | 执行cordova platforms add ios |
| --android | 执行cordova platforms add android |

## 启动项目
开发环境执行umi dev
dev环境有热更新，如果使用手机查看，要求需要在统一个网络环境下。

编译执行umi build

使用xcode打开项目 `./platforms/ios/Tutorial.xcworkspace`
选择虚拟机，执行。

虚拟机中查看效果
![](./umi-cordova.png)
