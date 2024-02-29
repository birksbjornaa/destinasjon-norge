import Home from "./pages/home";
import DestinationChooser from "./pages/DestinationChooser";
import DestinationDetailed from "./pages/DestinationDetailed";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<DestinationChooser />} />
          <Route
            path="/destinationdetailed"
            element={<DestinationDetailed />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
