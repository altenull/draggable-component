import React, { isValidElement, ReactChild, useRef } from "react";

interface Props {
  children: ReactChild;
}

const Draggable: React.FC<Props> = ({ children }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const draggableStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90vw",
    height: "90vh",
    margin: "auto",
    backgroundColor: "#ced4da",
  };

  return (
    <div style={draggableStyle}>
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
