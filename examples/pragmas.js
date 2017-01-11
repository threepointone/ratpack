/* @ratpack {
  target: 'node',
  devtool: 'eval',
  public: '../public',
  proxy: {
    '/yahoo': 'http://www.yahoo.com'
  },
  define: {
    'process.env.NODE_ENV': 'test'
  },
  offline: true,
  autoinstall: true,
  rules: [{ loader: 'cowsay-loader' }]
}
*/

/* eslint semi: 0 */

import { render } from 'react-dom'
render(<div>456</div>, window.root);

fetch('/yahoo')
 
