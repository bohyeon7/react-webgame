const React = require('react');
const ReactDom = require('react-dom/client');

const RSP = require('./RSP');

ReactDom.createRoot(document.querySelector('#root')).render(<RSP />);