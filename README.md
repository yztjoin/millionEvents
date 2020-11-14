# vue-cli3

简介：基于vue-cli3的脚手架

## 增加构建打包命令
```
npm run zip --note 打包修改的内容
or
yarn zip 打包修改的内容
```
生成的zip压缩包名称格式为:`项目域名-修改内容-修改人-时间戳.zip`,存放在zip文件夹下. 

其中项目域名、生成的目录层级可在 `scripts/config/index.js` 文件中修改

文件内容如下:
```javascript
 config = {
    webSite: '项目域名',//当前项目所对应的线上域名
    folderName: '' //当前项目所对应的文件夹目录名称 如果放置在根目录为空 如果有层级则如:/pagesV2/User/DriverList/  不要有空格
}
```
> 注意:如果folderName有过变更，需要手动清除一下dist文件夹,避免生成zip压缩包时包含了一些无用文件.

## 命令行生成页面以及组件

### 生成组件
```
 npm run new:comp  
 or 
 yarn new:comp
```
然后输入组件名称，如果是全局组件可在组件名称前加入 global/ 前缀

> 组件位置为components文件夹下，全局组件存放在components/global文件夹下，且在入口文件自动引入并注册。

### 生成页面

```
 npm run new:page  
 or 
 yarn new:page
```
输入页面名称，生成的.vue文件在src/pages/目录下

> 相关链接:https://juejin.im/post/5c4a6fcd518825469414e062#heading-0

## 内置公共js库   @plugin/tool-common

[git地址](https://uugit.uupt.com/Web/PubLibs/UUPT.Bomb/UUPT.Bomb.Materials/tree/master/plugins/mobile/business/common)

## 移动端使用注意
```
  在postcss.config.js文件中增加此postcss插件
    // 移动端项目开启此插件  将px转为rem
    'postcss-px2rem': {
      remUnit: '75'
    };

  入口文件main.js中引用amfe-flexible依赖:
    import "amfe-flexible"

```

## 兼容老框架
```
  将原@um文件夹放在与src同级目录下，引用方式与之前保持一致(通过别名引入)
```


