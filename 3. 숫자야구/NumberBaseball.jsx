const React = require('react');
const { useState, useRef } = React;
const Try = require('./Try');

// 숫자 네개를 겹치지않고 랜덤하게 뽑는 함수
const getNumbers = () => {
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }

  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers); // lazy init
  const [tries, setTries] = useState([]); // push 쓰면 안됨 (불변성)
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      alert('게임을 다시 시작합니다!');
    } else {
      const answerArray = value.split('').map((v) => parseInt(v)); // 입력된 네자리 숫자를 배열로 생성
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join('')}였습니다`);
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        alert('게임을 다시 시작합니다!');
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }
        setTries((prevTries) => [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다`}]);
        setValue('');
      }
    }

    inputRef.current.focus();
  }

  const onChangeInput = (e)  => {
    console.log('answer : '+answer);
    setValue(e.target.value);
  }

  return <>
    <h1>{result}</h1>
    <form onSubmit={onSubmit}>
      <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} />
      <button onSubmit={onSubmit}>입력</button>
    </form>
    <div>시도 : {tries.length}</div>
    <ul>
      {
        tries.map((v, i) => (
            <Try key={i} value={v} index={i} />
          )
        )
      }
    </ul>
  </>
}

module.exports = NumberBaseball;