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
  CLICKED_MINE: -6, // 지뢰누른경우
  OPENED: 0, // 정상적으로 연 경우 (0 이상이면 다 opened)
}

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  halted: false,
});

const initialState = {
  tableData: [],
  halted: false,
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
export const OPEN_CELL = 'OPEN_CELL';
export const CLICKED_MINE = 'CLICKED_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: // 지뢰심기
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      };
    case OPEN_CELL: { // 클릭해서 셀 열기
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED;
      return {
        ...state,
        tableData,
      }
    };
    case CLICKED_MINE: { // 지뢰 열기
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      }
    };
    case FLAG_CELL: { // 깃발
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;  
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return  {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: { // 물음표
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;  
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return  {
        ...state,
        tableData,
      };
    }
    case  NORMALIZE_CELL: { // 정상칸
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;  
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return  {
        ...state,
        tableData,
      };
    }
    default:
      return state;
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted } = state;

  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

  return <>
    <TableContext.Provider value={value}>
      <Form></Form>
      <Table></Table>
    </TableContext.Provider>
  </>
}

export default MineSearch;