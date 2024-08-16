const React = require('react');
const { useState, useRef } = React;

const Try = ({value, index}) => (
  <li>
    <div>{value.try}</div>
    <div>{value.result}</div>
  </li>
)

module.exports = Try;