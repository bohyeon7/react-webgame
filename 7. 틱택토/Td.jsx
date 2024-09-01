import React, { useCallback } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickId = () => {
    console.log(rowIndex, cellIndex);

    if (cellData) return; // 이미 클릭했던 cell 은 변경안됨

    dispatch({ type: CLICK_CELL,  row: rowIndex, cell: cellIndex});
  };
  return <>
    <td onClick={onClickId}>{cellData}</td>
  </>
}

export default Td;