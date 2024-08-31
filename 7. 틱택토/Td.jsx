import React from "react";
import { CLICK_CELL, CHANGE_TURN } from "./TicTacToe";

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickId = () => {
    console.log(rowIndex, cellIndex);
    dispatch({ type: CLICK_CELL,  row: rowIndex, cell: cellIndex});
    dispatch({ type: CHANGE_TURN })
  }
  return <>
    <td onClick={onClickId}>{cellData}</td>
  </>
}

export default Td;