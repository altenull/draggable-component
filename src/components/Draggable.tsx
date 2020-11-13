import React, { ReactChild } from "react";

interface Props {
  children: ReactChild;
}

const Draggable: React.FC<Props> = ({ children }) => {
  const draggableStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90vw",
    height: "90vh",
    margin: "auto",
    backgroundColor: "#ced4da",
  };

  return <div style={draggableStyle}>{children}</div>;
};

export default Draggable;
