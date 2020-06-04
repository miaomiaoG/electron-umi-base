# 前端基于 umi 框架的开发

## 了解React

 [传送门](react.md)

## 创建新页面流程

### 1. 创建页面文件

页面文件夹位置：`/renderer/pages/`

1. 在页面文件夹位置下创建一个新的文件夹，eg：`/renderer/pages/demo/`（文件夹的命名建议与路由名一致或相关，方便快速定位文件），文件夹以页面为单位，每个页面创建一个文件夹，`demo` 文件夹下的所有文件都是与 page1 页面相关的文件（入口js，样式文件，子页面文件，当前页面独有的组件等）

2. 在第`1`步建好的文件夹下创建页面入口 `js` 文件（eg:index.js），eg:`/renderer/pages/demo/index.js` ，该文件是路由配置中需要引用的文件，入口文件中需要有以下代码（一个页面就是一个 `class` 组件）

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
        // path: '/demo/:id', //带参路由
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

## 组件使用及开发

在开始这部分之前，请先对 [react](react.md) 进行粗略的了解

### ant design 的使用

本系统的基础组件库使用的是阿里的 [ant design](https://ant.design/index-cn) ，大多数使用频率较高的组件都可以在这个库里面找到，比如 `Button`, `Table`, `Modal`，使用时只需要在文件中引入相关的组件即可

eg：在 React 中使用 `antd` 组件

```jsx
//...
import {Button} from 'antd'; // 从 antd 组件库引入需要使用的组件

class Demo extends React.PureComponent{
  render() {
    return (
      <div>
        {/* 使用 antd Button 组件 */}
        <Button type="primary">this is a button</Button>
      </div>
    )
  }
}
```

### 自定义组件及使用

如果页面或者系统有组件可以拆分出来时，可以自己定义一个组件，并在页面中使用。
对于系统中可能多次会使用到的组件请在 `renderer/components/` 文件夹下新建文件夹，并创建自己的组件，eg：`renderer/components/Markdown`，这是一个系统通用的 markdown 容器组件。
如果是提取的一个页面的组件，最后只在某个页面中使用的组件请在页面所在的文件夹下 `renderer/pages/demo/` 创建组件，分离出来的组件较多时，可以在该文件夹下创建 `components` 文件夹用来放置所有当前页面的所有组件

eg:在demo文件夹下创建组件 `Welcome`

```jsx
import React from 'react';
export default class Welcome extends React.PureComponent{
  render(){
    return(
    <div>Welcome {this.props.name}</div>
    )
  }
}
```

在demo页面使用 `Welcome` 组件

```jsx
import React from 'react'; // react项目页面必须要引入的库
import Welcome from './Welcome';

export default class Demo extends React.PureComponent {
  render() {
    return (
      <div>
        <Welcome name="minieye"/>
      </div>
    )
  }
}
```

## 给页面添加样式

在页面文件夹（eg：`renderer/pages/demo/`）下新建样式文件，本系统使用 `css` 预处理器 [less](http://lesscss.org/) 来编写样式文件，使用 [css modules](https://github.com/css-modules/css-modules) 的方式来使用样式。

`less` 文件

```less
// less
@initialFont:18px; // less 变量

.demoPage{
  padding: 10px;
  .increaseBtn{
    font-size: @initialFont; // less 变量使用
  }
}

// 等价于下面的css
/* css 变量 */
--initialFont: 18px;
.demoPage{
  padding: 10px;
}
.demoPage .increaseBtn{
  /* css 变量使用 */
  font-size: var(--initialFont);
}
```

js文件中引用样式

```jsx
// import './index.less'; // 非CSS Modules
import styles from './index.less' //  CSS Modules

// ... Demo class

render(){
  return(
    // <div className="demoPage">
    <div className={styles.demoPage}>
      Hello minieye
      <button classNmae={styles.increaseBtn}>increase</button>
    </div>
  )
}
```

`如何使用内联样式（不推荐）`

在 `React` 中使用内联样式与传统html不太一样，`react` 中 `style` 属性的值接受一个对象，并将多单词的样式属性改为驼峰写法。选择器请避免使用 `id` 选择器，尽可能的使用类选择器等

```jsx
// react
// ... Demo class
render(){
  return(
    <div style={{padding: 10,margin: 10}}>
      <button style={{fontSize: 18}}>increase</button>
    </div>
  )
}
// or
render(){
  const commonStyle = {
    padding: 10,
    margin: 10,
  }
  return(
    <div style={commonStyle}>
      <button style={{fontSize: 18}}>increase</button>
    </div>
  )
}
// 传统html
<div style="padding: 10px;margin:10px">
  <button style="font-size: 18px">increase</button>
</div>
```

`修改第三方组件样式`

如果再使用第三方组件库时，对样式有修改的需求，但同时不希望这个修改影响到其他页面。比如再使用 ant design 的组件时，需要修改某些样式。

eg：修改 `Card` 组件的头部内间距

`js` 文件

```jsx
import {Card} from 'antd'
import styles from './index.less' //  CSS Modules

// ... Demo class
render(){
  return(
    <div className={styles.demoPage}>
      <Card title="card title" className={styles.myCard}>
        Card content
      </Card>
    </div>
  )
}
```

样式文件（index.less）

```jsx
.demoPage{
  .myCard{
    :global{
      .ant-card-head{
        padding: 10px;
      }
    }
  }
}
```

## 页面跳转

如何从如何从当前页面跳转到指定页：

1. `umi/link`

    ```jsx
    import Link from 'umi/link';
    // to="[router中配置的要跳转到的页面路径]"
    <Link to="/page2">
      <Button>to page2</Button>
    </Link>
    ```

2. `umi/router`

    ```jsx
    import router from 'umi/router';

    toAnotherPage=()=>{
      // 参数为 page2 的路由
      // 需要通过js进行处理后再进行跳转时使用此方法，其他情况优先考虑第一种方法
      router.push('/page2');
    }

    render(){
      return(
        <button onClick={this.toAnotherPage}>to page2</button>
      )
    }
    ```

3. `接收页面跳转时的参数`

    `demo` 页的路由配置 `/demo/:id`

    从 `page`页 携参数跳转至 `demo` 页

    ```jsx
    // page 页 js
    router.push('/demo/123?name=minieye&age=7');

    // Demo页 js 处理
    constructor(props){
      super(props);
      this.state={
        id: props.match.params.id,
        name:props.location.query.name,
        age:props.location.query.age,
      }
    }
    ```

    更多用法请移步 [umi路由](https://umijs.org/zh-CN/docs/routing)-路由组件参数部分

## 数据请求

前端使用 `Axios` 库，`/renderer/utils/request.js` 已经对对 `axios` 进行了简单的封装，使用时只需要引入该文件，调用相应的接口即可

```js
import axiosInstance from '@/utils/request';
```

数据请求建议在 `renderer/service` 文件夹下添加文件用来处理数据请求，然后再在页面文件中引入相应的数据请求，根据业务逻辑对数据进行进一步处理，文件以服务类别区分，比如所有跟用户相关的数据请求建议放在 `renderer/service/user.js` 中，与登录登出有关的放在 `renderer/service/login.js`， `service` 下的每个文件代表一类服务.

eg:

- `renderer/service/user.js`

    ```js
    export async function getApiUserInfo() {
      return axiosInstance.get('/api/user/info');
    }
    ```

- 使用
  
    ```js
    import { getApiUserInfo } from '@/service/user'
    // Demo class
    componentDidmount(){
      getApiUserInfo().then(data=>{
        this.setSate({useInfo: data});
      })
    }
    ```

在页面文件中请求数据

```jsx
// Demo class
componentDidmount(){
  axiosInstance.get('api/list', params).then(data=>{
    this.setState({list: data});
  })
}
```

## 文档

[ES6](https://es6.ruanyifeng.com/)

[this in react](https://zhuanlan.zhihu.com/p/37911534)

[你不知道的 JS](https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN)

[css-modules(glenmaddern)](https://glenmaddern.com/articles/css-modules)

[class-inheritance](https://javascript.info/class-inheritance)
