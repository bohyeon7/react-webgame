const React = require('react');
const { useState } = React;

const WordRelay = () => {
  const [text, setText] = React.useState('Hello, Webpack!');

  return <>
    <h1>{text}</h1>
  </>
}

module.exports = WordRelay;