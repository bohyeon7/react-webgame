import React, { useState, useReducer, useCallback} from "react";
import Table from "./Table";

const initialState = {
  winner: '',
  turn: '0',
  tableData: [['', '', ''], ['', '', ''], ['', '', '']]
};

const SET_WINNER = 'SET_WINNER';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      }
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onClickTable = useCallback(() => { // 자식 컴포넌트에 넘기니까 useCallback 사용
    dispatch({ type: SET_WINNER, winner: '0' });
  }, []);

  return <>
    <Table onClick={onClickTable} />
    {state.winner && <div>{state.winner}님의 승리</div>}
  </>
}

export default TicTacToe;