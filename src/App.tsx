import Home from "./pages/home";
import DestinationChooser from "./pages/DestinationChooser";
import DestinationDetailed from "./pages/DestinationDetailed";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditDestination from "./pages/EditDestination";
import CreateDestination from "./pages/CreateDestination";
import { Profile } from "./pages/Profile";
import AuthProvider from "./provider/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/destinationChooser"
              element={<DestinationChooser />}
            />
            <Route path="/destination/:id" element={<DestinationDetailed />} />
            <Route path="/createdestination" element={<CreateDestination />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/:id" element={<EditDestination />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
