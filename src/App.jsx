import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./pages/Dashboard";
import { EventProvider } from "./context/EventContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <EventProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/eventpage" element={<DashboardLayout />} />
          </Routes>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
