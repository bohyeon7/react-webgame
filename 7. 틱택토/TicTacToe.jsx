import React, { useState, useReducer, useCallback} from "react";
import Table from "./Table";

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
};

// Td 에서 사용해야돼서 export
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // 라이브러리 immer 로 가독성 해결 가능
      tableData[action.row][action.cell] = state.turn;
      
      return {
        ...state,
        tableData: tableData
      }
    };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <>
    <Table tableData={state.tableData} dispatch={dispatch} />
    {state.winner && <div>{state.winner}님의 승리</div>}
  </>
}

export default TicTacToe;