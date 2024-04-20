import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Auth from "./pages/auth/Auth";
import Locations from "./pages/locations/Locations";
import LocationInfo from "./pages/location/Location";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Locations />} />
          <Route path="/:id" element={<LocationInfo />} />
        </Route>

        <Route path="login" element={<Auth />} />
        <Route path="signup" element={<Auth />} />
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
