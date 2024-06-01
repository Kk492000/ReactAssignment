import { useSelector } from "react-redux";
import "./App.css";
import Loader from "./components/Loader/Loader";
import UserList from "./components/ui/UserList";

function App() {
  const selector = useSelector((state) => state.counter.counter);
  return (
    <div className="App" style={{ width: "100%" }}>
      <UserList />
    </div>
  );
}

export default App;
