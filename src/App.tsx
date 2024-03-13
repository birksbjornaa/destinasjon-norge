import Home from "./pages/home";
import DestinationChooser from "./pages/DestinationChooser";
import Login from "./pages/Login";
import DestinationDetailed from "./pages/DestinationDetailed";
import EditDestination from "./pages/EditDestination";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import CreateDestination from "./pages/CreateDestination";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/destinationChooser" element={<DestinationChooser />} />
          <Route path="/destination/:id" element={<DestinationDetailed />} />
          <Route path="/createdestination" element={<CreateDestination />} />
          <Route path="/edit/:id" element={<EditDestination />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
