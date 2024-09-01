import React, { memo, useMemo } from "react";
import Td from "./Td";

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
  return <>
  <tr>
    {Array(rowData.length).fill().map((td, i) => (
      useMemo(() => <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch} />, [rowData[i]])
    ))}
  </tr>
  </>
});

export default Tr;