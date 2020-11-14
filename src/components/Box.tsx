import React from "react";

interface Props {}

const Box = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const boxStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "160px",
    height: "160px",
    backgroundColor: "#08a9e3",
    color: "#ffffff",
    cursor: "move",
    fontSize: "20px",
    fontWeight: 500,
  };

  return (
    <div ref={ref} style={boxStyle}>
      I'm Box
    </div>
  );
});

export default Box;
