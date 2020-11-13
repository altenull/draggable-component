import React from "react";

interface Props {}

const Box = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "160px",
    height: "160px",
    backgroundColor: "#08a9e3",
    cursor: "move",
  };

  return (
    <div ref={ref} style={boxStyle}>
      Box
    </div>
  );
});

export default Box;
