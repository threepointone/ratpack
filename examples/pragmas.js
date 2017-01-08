/* @ratpack {
  target: 'node',
  devtool: 'eval',
  public: '../public',
  jsx: 'Glamor.createElement',
  proxy: {
    '/yahoo': 'http://www.yahoo.com'
  },
  provide: {
    Glamor: 'glamor/react'
  },
  define: {
    'process.env.NODE_ENV': 'test'
  },
  offline: true,
  autoinstall: true,
  rules: []
}
*/


import { render } from 'react-dom'
render(<div css={{ color:'red' }}>123</div>, window.root)

fetch('/yahoo')


  // alias: {
  //   'react': 'preact-compat',
  //   'react-dom': 'preact-compat'
  // },
