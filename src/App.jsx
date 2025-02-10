import React from "react";
import { Provider } from "./contexts/"
import { Main } from "./components/Main";


const App = () => {
    return (
    <Provider>
      <Main/>
    </Provider>
  );
}

export default App;
