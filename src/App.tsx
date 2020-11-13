import React from "react";
import "./App.css";
import { Box, Draggable } from "./components";

function App() {
  return (
    <main className="main">
      <Draggable>
        <Box />
      </Draggable>
    </main>
  );
}

export default App;
