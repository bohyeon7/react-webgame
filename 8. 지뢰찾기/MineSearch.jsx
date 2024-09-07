import React, { useReducer, createContext, useMemo} from "react";
import Table from "./Table";
import Form from "./Form";

const CODE = {
  MINE: -7, // 지뢰
  NORMAL: -1, // 초기상태
  QUESTION: -2, // 물음표
  FLAG: -3, // 깃발
  QUESTION_MINE: -4, // 물음표이면서 지뢰
  FLAG_MINE: -5, // 깃발이면서 지뢰
  CLICK_MINE: -6, // 지뢰누른경우
  OPENED: 0, // 정상적으로 연 경우 (0 이상이면 다 opened)
}

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  
}

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: // 지뢰심기
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      };
    default:
      return state;
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]);

  return <>
    <TableContext.Provider value={value}>
      <Form></Form>
      {/* <div>{state.timer}</div> */}
      <Table></Table>
      {/* <div>{state.result}</div> */}
    </TableContext.Provider>
  </>
}

export default MineSearch;