import React from 'react'; // react项目页面必须要引入的库

// 定义页面类并导出（一定要export，否则路由页面无法引用该页面内容）
export default class Demo extends React.PureComponent {

  state = {
    name: 'minieye'
  }
  render() {
    // const name = 'minieye';
    const array = [1, 2, 3, 4, 5];

    return (
      <div>
        hello, {this.state.name}!  {/* 使用定义的变量 */}
        <ul>
          {
            // 使用数组的方法，需要用到数组方法的返回值时必须要用map方法，
            // 比如这个地方遍历数组的每一项返回一个dom节点，如果不使用map将无法展示子节点
            array.map(item => <li key={item}>{item}</li>)
          }
        </ul>
        {/* <p>test</p> */}
      </div>
    )
  }
}