const React = require('react');
const ReactDom = require('react-dom/client');

const ResponseCheck = require('./ResponseCheck');

ReactDom.createRoot(document.querySelector('#root')).render(<ResponseCheck />);