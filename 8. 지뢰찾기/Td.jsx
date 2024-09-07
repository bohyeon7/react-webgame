import React, { memo, useCallback } from "react";

const Td = () => {
  const onClickId = useCallback(() => {

  }, []);
  return <>
    <td onClick={onClickId}></td>
  </>
};

export default Td;