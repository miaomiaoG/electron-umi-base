# 前端基于 umi 框架的开发

## 创建新页面流程

### 1. 创建页面文件

页面文件夹位置：`/renderer/pages/`

1. 在页面文件夹位置下创建一个新的文件夹，eg：`/renderer/pages/demo/`（文件夹的命名建议与路由名一致或相关，方便快速定位文件），文件夹以页面为单位，每个页面创建一个文件夹，`demo` 文件夹下的所有文件都是与 page1 页面相关的文件（入口js，样式文件，子页面文件，当前页面独有的组件等）

2. 在第`1`步建好的文件夹下创建入口js文件（index.js），eg:`/renderer/pages/demo/index.js` ，是路由配置中需要引用的文件，入口文件中需要有以下代码（一个页面就是一个组件类）

    ```jsx
    import React from 'react'; // react项目页面必须要引入的库

    // 定义页面类并导出（一定要export，否则路由页面无法引用该页面内容）
    export default class Demo extends React.PureComponent {
      render(){
        return(
          <div>
            Hello, this ia a Demo!
          </div>
        )
      }
    }
    ```

### 2. 给新页面配置路由

路由配置文件：`/renderer/config/router.config.js`

参数说明：

- `path` - 页面的url（建议url和页面文件夹的名字及层级有一定关联，可以通过路由快速定位到页面文件）
- `component` - 页面入口文件相对路径，指向的路由组件文件是从 `renderer/pages` 目录开始解析的
- `routes` - 以为当前页面为框架的子路由集合，该集合中所有路由对应的页面具有相同的layouts样式和逻辑（目前系统已经给出了一套默认的layouts，系统的基本展示页面都应该在该layouts下）eg:

```js
export default[{
    path: '/',
    component: '../layouts/index.js', // 统一的外容器layouts
    routes: [
      {
        path: '/demo',
        component: './demo/index', // 具体页面内容
      },
}]
```

### 3. 给新页面配置菜单（非必要，需要通过菜单控制跳转的页面要配置菜单，否则不需要）

需要通过菜单访问的页面要修改菜单文件的配置

菜单所在文件：`/renderer/layouts/index.js`
eg:

```jsx
<Menu.Item key="/" icon={<UserOutlined />}>
  demo
</Menu.Item>
```

配置说明：

- `key` - 菜单元素的url地址，与路由配置对应
- `icon` - 菜单元素的Icon，可以在 antd 的 [Icon 组件](https://ant.design/components/icon-cn/)中找到适合的图标并参考[文档](https://ant.design/components/icon-cn/)引入使用。eg:
  
  ```jsx
  // 引入某个 Icon 组件
  import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
  // 使用已经引入的 Icon 组件
  <StarOutlined />
  <StarFilled />
  <StarTwoTone twoToneColor="#eb2f96" />
  ```

- `[demo]` - 菜单元素的name

`至此，完成上述三个步骤后，就已经成功添加了一个可访问的新页面，可以在页面上看到 demo 菜单项，点击后容器中会渲染出 demo 页面的内容`
