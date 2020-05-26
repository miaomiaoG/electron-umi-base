# 前端基于 umi 框架的开发流程

## 1. 创建页面

页面文件夹位置：`/renderer/pages/`
每个页面创建一个文件夹，eg：`/renderer/pages/page1`，page1 文件夹下的所有文件都是 page1 页面相关的，`/renderer/pages/page1/index.js` 是page1页面的入口文件，是路由配置中需要引入的文件

## 2. 配置路由

路由配置文件：`/renderer/config/router.config.js`

参数说明：

- `path` - 页面的url
- `component` - 页面入口文件相对路径
- `routes` - 以为当前页面为框架的子路由集合，该集合中所有路由对应的页面具有相同的layouts样式和逻辑（目前系统已经给出了一套默认的layouts，系统的基本展示页面都应该在该layouts下）eg:

```js
[{
    path: '/',
    component: '../layouts/index.js', // 统一的菜单及外容器layouts
    routes: [
      {
        path: '/',
        component: './page1/index', // 某个菜单项对应的具体页面
      },
}]
```

## 3. 菜单配置

菜单所在文件：`/renderer/layouts/index.js`
eg:

```jsx
<Menu.Item key="/" icon={<UserOutlined />}>
  page1
</Menu.Item>
```

配置说明：

- `key` - 菜单元素的url地址，与路由配置对应
- `icon` - 菜单元素的ICON，可以在 antd 的 [ICON 组件](https://ant.design/components/icon-cn/)中找到适合的图标并参考[文档](https://ant.design/components/icon-cn/)引入使用。eg:
  
  ```jsx
  // 引入某个 ICON 组件
  import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
  // 使用已经引入的 ICON 组件
  <StarOutlined />
  <StarFilled />
  <StarTwoTone twoToneColor="#eb2f96" />
  ```

- `page1` - 菜单元素的name，自定义
