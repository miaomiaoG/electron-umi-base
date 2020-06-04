# React基础

这里只做简单的介绍，及基本使用,更详细的文档请参考 [react.js](https://reactjs.org/docs/getting-started.html)

## JSX 语法

在 React 中推荐使用 JSX，JSX 可以在 html 中插入 js 语句，在 html 的任何位置需要插入js时，插入一对大括号{}, 你可以在大括号{}中写入任何你需要的js代码，现在尝试在demo页面中使用JSX，eg:

```JSX
import React from 'react';
// ...
render() {
    const name = 'minieye';
    const array = [1, 2, 3, 4, 5];
    return (
      <div>
        {/* <%= name > */}
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

## 组件 & props & state

### 1. 组件

`组件`，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

#### 函数组件与 class 组件

定义组件的两种方式（两种方式定义的组件在React里是等效的）：

- 函数组件

  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```

- ES6 class
  
  ```jsx
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```

### 2. `props`（ReadOnly）

  当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。`props`是只读的，组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。eg：

  ```jsx
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  // 使用组件时，传入name=“minieye”，上述组件会渲染出 Hello, minieye
  <Welcome name="minieye">
  ```

### 3. `state`

  `state` 是组件内部数据对象，它的每一个属性值的合法修改都会引起页面重新渲染(也可以通过 `componentShouldUpdate` 生命周期函数阻止重新渲染)，即数据更新后会执行 `render()` 方法，当一个值更新后需要页面进行相应的更新的时候，这个值就需要存储在state里面。
  使用：

  ```JSX
  class Demo extends React.PureComponent {
    state = {
      count: 0
    }

    increase = () => {
      this.setState({ count: this.state.count + 1 });
    }

    render() {
      return (
        <div>
          <p>{this.state.count}</p> {/* 使用state的值 */}
          <Button onClick={this.increase} className={styles.increaseBtn}>increase</Button>
        </div>
      )
    }
  }
  ```

注意：

#### 不要直接修改`state`，此代码不会重新渲染组件

  ```JSX
  // Wrong
  this.state.count = this.state.count + 1;
  ```

  必须通过 `setState()` 方法更新 state，整个组件中只能在 `constructor` 中对 `this.state` 进行赋值操作，其他任何地方更新 state 必须使用 `setState()`

  ```JSX
    // Correct
    this.setState({name: 'minieye'});
  ```

#### state 的更新可能是异步的

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

## React 常用生命周期函数（只有 class 组件有，函数组件没有生命周期函数）

[React 生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

1. `constructor`

    如果不初始化 `state` 或不进行方法绑定，则不需要为 React 组件实现构造函数。
    在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 `super(props)`。否则，`this.props` 在构造函数中可能会出现未定义的 bug。eg：

    ```jsx
    constructor(props) {
      super(props);
      // 不要在这里调用 this.setState()
      this.state = { counter: 0 };
    }
    ```

    只能在构造函数中直接为 `this.state` 赋值。如需在其他方法中赋值，请使用 `this.setState()` 替代。

2. `render()`

    `render()`方法是 clas 组件中唯一一个必须实现的方法

    render 函数被调用时，会检查 `this.props` 和 `this.state` 的变化并返回以下之一：

     - React 元素：`<Welcome/>`，`<div/>`
     - 字符串或数值类型： 在DOM中会被渲染为文本节点
     - 布尔类型或null： 什么都不渲染，主要用于`bool_test && <Welcome/>`,bool_test为true时渲染`Welcome/>`，否则什么都不渲染
     - 数组或 [Fragments](https://reactjs.org/docs/fragments.html)，[Portals](https://reactjs.org/docs/portals.html)（fragments不常用）
  
    render函数应该为纯函数，如果需要与浏览器进行交互，请在 `componentDidMount` 或者其他生命周期方法中进行

    ```jsx
    render(){
      return(<Welcome/>)
      // return 'hello minieye!'
      // return bool_test && <Welcome/>
    }
    ```

3. `componentDidMount()`

    在组件已经被渲染到 DOM 中后运行，首次 render 后调用，可以这这一部分进行数据的获取、绑定事件、初始化、添加计时器等操作
    依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。
    这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 `componentWillUnmount()` 里取消订阅
    通常，在 `constructor()` 中初始化 state。如果渲染依赖于 DOM 节点的大小或位置等，比如需要通过 dom 节点的 id 初始化实例时，你可以使用此方式处理

    ```jsx
    componentDidMount(){
      let count = 0;
      this.timer = setInterval(() => {
        console.log(count++);
      }, 1000); // 初始化计时器
      this.fetchData(); // 渲染DOM后拉取数据
      this.fabricCanvas = new fabric('canvadId'); // 渲染DOM后根据DOM节点初始化canvas画布
      UE.getEditor('editorid'); // 初始化编辑器，根据 editorid 生成 Ueditor 实例
      mouseTrap.bind('ctrl+a',()=>{
        //dosomething
      }); // 绑定快捷键
    }
    ```

4. `componentWillUnmount()`

    组件卸载时要进行的操作，解绑事件、删除实例、清除计时器等

    ```jsx
    componentWillUnmount(){
      clearInterval(this.timer) // 清除计时器
      UE.delEditor('editorid'); // 删除 Ueditor 实例
      mouseTrap.unbind('ctrl+a'); // 解绑快捷键
    }
    ```

5. `componentDidUpdate(prevProps, prevState, snapshot)`

    会在更新后会被立即调用，当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。（例如，当 props 未发生变化时，则不会执行网络请求）eg:

    ```jsx
    componentDidUpdate(prevProps) {
      // 典型用法（不要忘记比较 props）：
      if (this.props.userID !== prevProps.userID) {
        this.fetchData(this.props.userID);
      }
    }
    ```
  
    `snapshot` 参数不常用

## 事件处理

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
  
与传统html事件处理对比

```js
// 传统html
<button onclick="increase()">
  increase count
</button>
// react 中
<button onClick={increase}>
  increase count
</button>
```

1. 一个 `react` 中事件处理例子，下面代码中，每次点击按钮都会使span标签中的数字加1：

    ```js
    class Demo extends React.PureComponent {

      constructor(props) {
        super(props);
        this.state = {
          count: 0,
        }
      }

      increase = () => {
        // 使用箭头函数避免出现 this 指向问题
        this.setState({ count: this.state.count + 1 });
      }

      render() {
        return (
          <div>
            <span>{this.state.count}</span>
            <button onClick={this.increase}>increase</button>
          </div>
        )
      }
    }
    ```

2. 如何向事件处理程序传参

    ```js
    <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
    <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
    ```

    `e 是一个合成事件。React 根据 W3C 规范来定义这些合成事件`

### 注意事项

- 在 `react` 中不能通过返回 `false` 的方式阻止默认行为，必须显示的使用 `preventDefault`
  
  ```js
  // 传统html
  <a href="#" onclick="console.log('The link was clicked.'); return false">
    Click me
  </a>
  // react(函数组件)
  function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }

    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }
  ```

- `this` 指向问题
  
  `class` 的方法默认不会绑定 this。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。因此通常我们都使用箭头函数来处理事件函数，箭头函数默认将当前类的 `this` 绑定到了函数上。
  在 `class` 组件中，用默认方法处理之间函数时，也可以通过 `this` 绑定将 `this` 传入函数，这一步在 `constructor` 中进行，eg：

  ```jsx
  // Demo class
  constructor(props) {
    super(props);
    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    // 普通函数（非箭头函数事件处理需要绑定this）
  }

  render(){
    return <a onClick=(this.handleClick)>Click me</a>
  }
  ```

## 文档

[this in react](https://zhuanlan.zhihu.com/p/37911534)

[一网打尽 React 重难点](https://zhuanlan.zhihu.com/p/83079398)

[你真的理解 setState 吗？](https://juejin.im/post/5b45c57c51882519790c7441#comment)

[React源码解析](https://react.jokcy.me/)
