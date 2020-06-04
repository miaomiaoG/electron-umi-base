import React from 'react'; // react项目页面必须要引入的库
import { Button, Card } from 'antd';
import router from 'umi/router';
// import {Welcome} from './Welcome';
import Welcome from './Welcome';
import styles from './index.less';

// 定义页面类并导出（一定要export，否则路由页面无法引用该页面内容）
export default class Demo extends React.PureComponent {

  constructor(props) {
    super(props); 
    console.log(props);
    this.state = {
      name: 'minieye',
      count: 0,
    }

    // this.setState({count:169})

    /* this.logCount();
    const pro = new Promise((re,rj)=>{
      re();
    })
    pro.then(()=>{
      console.log('promise resolve')
      this.setState({count:169})
    }) */
  }

  componentDidMount() {
    console.log('componentDidMount');

    /*  let count = 0;
     this.timer = setInterval(() => {
       console.log(count++);
     }, 1000); */
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');

    // clearInterval(this.timer)
  }

  logCount = () => {
    console.log('count:', this.state.count);
  }

  increase = () => {
    this.setState({ count: this.state.count + 1 });
    // this.logCount();
    // this.setState({ count: this.state.count + 1 }, () => {
    //   this.logCount();
    // })
  }

  toAnotherPage = () => {
    // 参数 page2 的路由
    router.push('/page2');
  }

  render() {
    console.log('render');
    const name = 'minieye';
    const array = [1, 2, 3, 4, 5];

    return (
      <div className={styles.demoPage}>
        <Card title="JSX">
          <p>{`{${name}}`}</p>
            hello, {this.state.name}!  {/* 使用定义的变量 */}
          <ul>
            {
              // 使用数组的方法，需要用到数组方法的返回值时必须要用map方法，
              // 比如这个地方遍历数组的每一项返回一个dom节点，如果不使用map将无法展示子节点
              array.map(item => <li key={item}>{item}</li>)
            }
          </ul>
          <Button type="primary">this is a button</Button>
          {/* <p>test</p> */}
          <br />
        </Card>

        <br />

        <Card title="props">
          <Welcome name="minieye" age="19" />
        </Card>

        <br />

        <Card title="state">
          <div>
            <p>{this.state.count}</p>
            <Button onClick={this.increase} className={styles.increaseBtn}>increase</Button>
          </div>
        </Card>

        <br />

        {/* <Card title="router">
          <Button onClick={this.toAnotherPage}>route to page2</Button>
        </Card> */}

        <br />

        {/* <Card title="component style" className={styles.myCard}>
          Card Content
        </Card> */}
      </div>
    )
  }
}