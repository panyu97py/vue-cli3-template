# vue-cli3 模板项目

## 配置项
* element-ui
* element-ui 自定义主题
* webpack svg-sprite-loader 
* vuex
* vue-router
* cross-env 环境变量
* axios 拦截器配置
* excel 文件导出配置
* el-table 组件的二次开发
* el-checkbox 组件的二次开发

## 安装依赖
```
cnpm i
```

## 项目启动(不同的环境变量)
```

cnpm run serve:dev

cnpm run serve:alpha

cnpm run serve:prod

```
### 项目构建(不同的环境变量)
```
cnpm run build:dev

cnpm run build:alpha

cnpm run build:prod
```

## element-ui 自定义主题配置

### 安装工具
```bash
cnpm i element-theme -g
```

### 初始化变量文件
```
et -i src/styles/element-variables.scss
```
### 编译主题

#### 普通编译
```
et -c src/styles/element-variables.scss -o src/styles/element-ui-theme
```
#### 实时编译
```
et -c src/styles/element-variables.scss -o src/styles/element-ui-theme
```
