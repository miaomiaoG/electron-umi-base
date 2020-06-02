import React from 'react';

export default class Welcome extends React.PureComponent {
  render() {
    return (
      <div>Welcome {this.props.name}</div>
    )
  }
}

/* 
export const Welcome = (props) => {
  return (
    <div>Welcome {props.name}</div>
  )
} */