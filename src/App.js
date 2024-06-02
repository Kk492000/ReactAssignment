import React, { Suspense } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";

const UserList = React.lazy(() => import("./components/ui/UserList"));

function App() {
  return (
    <div className="App" style={{ width: "100%" }}>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <UserList />
      </Suspense>
    </div>
  );
}

export default App;
