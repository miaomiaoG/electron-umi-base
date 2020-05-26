# Q&A

## npm install 失败

1. 报`fs-extra`语法错误
  请务必保证 node 的版本 >= 10  
  `electron-builder依赖中的 fs-extra: ^9.0.0 required node 10 or higher`

  如果是报其他的安装包语法错误，也优先考虑是不是node版本的问题

## 启动后页面为空白页面

同时启动主进程和渲染进程时，渲染进程编译完成会迟于主进程，初次显示为空白，需要待渲染进程
准备完成后，通过目录或快捷键手动刷新(目录 `view/refresh` )

先启动渲染进程再启动主进程时是不会有这个问题出现的
