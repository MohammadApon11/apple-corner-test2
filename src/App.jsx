import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import HeroManagePage from "./pages/HeroManagePage";
import EventMangePage from "./pages/EventMangePage";
import ProductManagePage from "./pages/ProductManagePage";
import HomePage from "./pages/HomePage";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/hero"
            element={authUser ? <HeroManagePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/event"
            element={authUser ? <EventMangePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/product"
            element={
              authUser ? <ProductManagePage /> : <Navigate to="/login" />
            }
          />
        </Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
