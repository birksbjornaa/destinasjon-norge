import Home from "./pages/home";
import DestinationChooser from "./pages/DestinationChooser";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<DestinationChooser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
