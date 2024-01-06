import { useState } from "react";
import "./App.css";
import Story from "./components/Story";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Story />
  );
}

export default App;
