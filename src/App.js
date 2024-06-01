import { useSelector } from "react-redux";
import "./App.css";
import Loader from "./components/Loader/Loader";

function App() {
  let content = <Loader />;
  const selector = useSelector((state) => state.counter.counter);
  console.log(selector, "selector");
  return (
    <div className="App">
      {content}
      <h1>React Assignment</h1>
    </div>
  );
}

export default App;
