const React = require('react');
const { useState, useRef, memo } = React;

const Try = memo(({value, index}) => {

  return <>
    <li>
      <div>{value.try}</div>
      <div>{value.result}</div>
    </li>
  </>
});

Try.displayName = 'Try';
module.exports = Try;