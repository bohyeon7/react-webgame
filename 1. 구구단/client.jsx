const React = require('react');
const ReactDom = require('react-dom/client');

const GuGuDan = require('./gugudan');

ReactDom.createRoot(document.querySelector('#root')).render(<GuGuDan />);