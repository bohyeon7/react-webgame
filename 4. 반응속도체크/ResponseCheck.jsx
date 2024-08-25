const React = require('react');
const { useState, useRef } = React;

const ResponseCheck = () => {
  const [state, setState] = useState('waiting'); // waiting, ready, now
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const onClickScreen = () => {
    if (state === 'waiting') {

      setState('ready');
      setMessage('초록색이 되면 클릭하세요');

      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭!');

        startTime.current = new Date(); // 시작시간

      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 사이

    } else if (state === 'ready') {

      setState('waiting')
      setMessage('성급하시네요 초록색이 되면 클릭하세요');

      clearTimeout(timeout.current); // setTimeout 죽이기

    } else if (state === 'now') {

      endTime.current = new Date(); // 클릭한시간

      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current] // 이전배열에 결과 추가
      });
      
    }
  }

  const renderAverage = () => {
    return result.length === 0
      ? null 
      : <>
      <div>평균 시간: {result.reduce((a, c) => a + c, 0) / result.length}ms</div>
      <button onClick={onClickReset}>Reset</button>
      </>
  }

  const onClickReset = () => {
    setResult([]);
  }

  return <>
    <div id='screen' className={state} onClick={onClickScreen}>
      {message}
    </div>
    {renderAverage()}
  </>
}

module.exports = ResponseCheck;