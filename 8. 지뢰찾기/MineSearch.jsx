import React, { useReducer, createContext, useMemo} from "react";
import Table from "./Table";
import Form from "./Form";

export const CODE = {
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

const plantMine = (row, cell, mine) => { // 지뢰심기
  console.log(row, cell, mine);
  
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });

  const shuffle = [];
  while (candidate.length >  row * cell - mine) { // 지뢰를 뺀 개수만큼 랜덤돌려서 shuffle[] 만들기
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) { // 정상 칸 생성
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) { // 지뢰 칸 생성
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
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