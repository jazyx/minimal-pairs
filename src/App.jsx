import React from "react";
import { Provider } from "./contexts/"
import { Main } from "./views/Main";


const App = () => {
    return (
    <Provider>
      <Main/>
    </Provider>
  );
}

export default App;
