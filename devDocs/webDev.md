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

## React 相关介绍

这里只做简单的介绍，及基本使用,更详细的文档请参考 [react.js](https://reactjs.org/docs/getting-started.html)

### JSX 语法

在 React 中推荐使用 JSX，JSX 可以在 html 中插入 js 语句，在 html 的任何位置需要插入js时，插入一对大括号{}, 你可以在大括号{}中写入任何你需要的js代码，现在尝试在demo页面中使用JSX，eg:

```JSX
// ...
render() {
    const name = 'minieye';
    const array = [1, 2, 3, 4, 5];
    return (
      <div>
        hello, {name}!  {/* 使用定义的变量 */}
        <ul>
          {
            // 使用数组的方法，需要用到数组方法的返回值时必须要用map方法而不是forEach，
            // 比如这个地方遍历数组的每一项返回一个dom节点，如果不使用map将无法展示子节点
            // 原因：map方法遍历完成后会返回遍历完成的数组，而forEach遍历完成后没有任何返回
            array.map(item=><li key={item}>{item}</li>)
          }
        </ul>
        {/* <p>test</p> */}
      </div>
    )
  }
//...
```

注意：

- 注释：在JSX中使用注释时，需要先用大括号{}，然后使用js的注释方式即可(参考上面的代码注释)
- `array.map(item=><li key={item}>{item}</li>)`，react遍历生成dom节点时，每个节点都要有唯一的key，不需要全局唯一，但要在当前列表唯一，参考文档 [Lists and keys](https://reactjs.org/docs/lists-and-keys.html)

### React 常用生命周期简介

1. `render`
   `render()`方法是一个组件中唯一一个必须存在的方法

2. `componentDidMount`
   首次 render 后调用，可以这这一部分进行数据的获取、绑定事件、初始化等操作

3. `componentWillUnmount`
   组件卸载时要进行的操作，解绑事件、恢复初始化等

4. `componentDidUpdate`
   组件更新后需要进行的操作

### 组件 & state & props

#### 1. 组件

`组件`，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

##### 函数组件与 clas 组件

定义组件最简单的方式就是编写 JavaScript 函数：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

#### 2. `porps`

  `props` 是父级元素传过来的数据对象，当前元素通过this.props['propertyname']使用父元素传过来的值。

#### 3. `state`

  `state` 是组件内部数据对象，它的每一个属性值的合法修改都会引起页面重新渲染(也可以通过 `componentShouldUpdate` 生命周期函数阻止重新渲染)，即数据更新后会执行 `render()` 方法，当一个值更新后需要页面进行相应的更新的时候，这个值就需要存储在state里面。
  使用：

  ```JSX
  class Demo extends React.PureComponent {
    state = {
      name: 'minieye'
    }
    render() {
      return (
        <div>
          hello, {this.state.name}  {/* 使用state的值 */}
        </div>
      )
    }
  }
  ```

注意：

##### 不要直接修改`state`，此代码不会重新渲染组件

  ```JSX
  // Wrong
  this.state.name = 'minieye';
  ```

  必须通过 `setState()` 方法更新 state，整个组件中只能在 `constructor` 中对 `this.state` 进行赋值操作，其他任何地方更新 state 必须使用 `setState()`

  ```JSX
    // Correct
    this.setState({name: 'minieye'});
  ```

##### state 的更新可能是异步的

  出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
  因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
  此代码无法拿到最新的name：

  ```JSX
    // Wrong
    this.setState({name: 'banboo'});
    console.log(this.state.name) // log: 'minnieye'，而不是 'banboo'
  ```

  如果一定要在更新 state 后立马使用更新后的值，可以使用 `setState` 的函数参数：

  ```JSX
    // Correct
    this.setState({name:'banboo}, (state)=>{
      console.log(state.name) // log: 'banboo'
    })
  ```
  
