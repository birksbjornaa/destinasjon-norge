import Home from "./pages/home";
import DestinationChooser from "./pages/DestinationChooser";
import DestinationDetailed from "./pages/DestinationDetailed";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import NewDestination from "./pages/NewDestination";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinationChooser" element={<DestinationChooser />} />
          <Route path="/destination/:id" element={<DestinationDetailed />} />
          <Route path="/newdestination" element={<NewDestination/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
