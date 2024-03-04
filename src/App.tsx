import Home from "./pages/home";
import DestinationChooser from "./pages/DestinationChooser";
import DestinationDetailed from "./pages/DestinationDetailed";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import EditDestination from "./pages/NewDestination";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinationChooser" element={<DestinationChooser />} />
          <Route path="/destination/:id" element={<DestinationDetailed />} />
          <Route path="/editdestination" element={<EditDestination />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
