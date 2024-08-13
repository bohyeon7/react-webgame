const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState('보현');
  const [word2, setWord2] = useState('나보');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [result2, setResult2] = useState('');
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
    } else {
      setResult('땡');
      setValue('');
    }

    inputRef.current.focus();
  }

  const onSubmitForm2 = (e) => {
    e.preventDefault();
    console.log(inputRef2.current.value);
    
    if (word2[word.length - 1] === e.target.children.word2.value[0]) {
      setResult2('딩동댕');
      setWord2(e.target.children.word2.value);
      e.target.children.word2.value = '';
    } else {
      setResult2('땡');
      e.target.children.word2.value = '';
    }

    inputRef2.current.focus();
  }

  return <>
    <div>
      <h3>controlled input</h3>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input 
          ref={inputRef} 
          value={value} 
          onChange={onChangeInput} 
          type="text" />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </div>

    <div>
      <h3>uncontrolled input</h3>
      <div>{word2}</div>
      <form onSubmit={onSubmitForm2}>
        <input id='word2' ref={inputRef2} />
        <button>입력!</button>
      </form>
      <div>{result2}</div>
    </div>
  </>
}

module.exports = WordRelay;