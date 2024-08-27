import React from "react";
import { useState, useRef, useEffect } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1); // 1-45 숫자 후보배열 생성
  const shuffle = [];
  while (candidate.length > 0) { // 후보배열에서 무작위로 추출하여 shuffle 에 저장
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1]; // 보너스번호는 마지막 요소
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // 당첨번호는 처음 6개를 오름차순으로 정렬한 배열
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const [winNumbers, setWinNumbers] = useState(getWinNumbers); // 당첨 숫자들 7개의 배열
  const [winBalls, setWinBalls] = useState([]); // 앞에 6개의 공
  const [bonus, setBonus] = useState(null); // 보너스 공
  const [redo, setRedo] = useState(false); // 마지막 1개의 공 (보너스공까지 다 출력된 후 redo 버튼 보이게하기 위함)
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => { // 1초마다 당첨공 배열에 저장
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
      }, 1000 * (i + 1));
    }

    timeouts.current[6] = setTimeout(() => { // 7초에 보너스공 저장
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);

  useEffect(() => {
    console.log('로또 숫자를 생성합니다');
    console.log(winNumbers);
    
  }, [winNumbers]);

  const onClickRedo = () => {
    console.log('onClickRedo');
    
    // 초기화
    setWinNumbers(getWinNumbers);
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }

  return <>
    <div>당첨 숫자</div>
    <div id="결과창">
      {winBalls.map((v) => <Ball key={v} number={v} />)}
    </div>
    <div>보너스!</div>
    {/* Ball 에는 onClick 함수가 왜있는거지??? */}
    {bonus && <Ball number={bonus} />}
    {redo && <button onClick={onClickRedo}>한 번 더!</button>}
  </>
}

export default Lotto;