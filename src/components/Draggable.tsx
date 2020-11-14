import React, { isValidElement, ReactChild } from "react";
import { useDragging } from "../hooks/useDragging";

interface Props {
  children: ReactChild;
}

const Draggable: React.FC<Props> = ({ children }) => {
  const [draggableRef, boxRef, isBoxDragging] = useDragging();

  const draggableStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90vw",
    height: "90vh",
    margin: "auto",
    backgroundColor: "#ced4da",
    overflow: "hidden",
    border: "5px solid",
    borderColor: isBoxDragging ? "#08a9e3" : "#ced4da",
  };

  return (
    <div style={draggableStyle} ref={draggableRef}>
      {React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          return React.cloneElement(child, {
            ref: boxRef,
          });
        }
      })}
    </div>
  );
};

export default Draggable;
