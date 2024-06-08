import React, { Component, Suspense } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";

const UserList = React.lazy(() => import("./components/ui/UserList"));

class App extends Component {
  render() {
    return (
      <div>
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
}

export default App;
