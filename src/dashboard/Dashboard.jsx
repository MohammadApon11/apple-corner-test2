import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import EventMangePage from "../pages/EventMangePage";
import HeroManagePage from "../pages/HeroManagePage";
import ProductManagePage from "../pages/ProductManagePage";
import Sidebar from "../components/shared/Sidebar";
import TopHeader from "../components/shared/TopHeader";

const Dashboard = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="relative grid grid-cols-12 overflow-x-hidden bg-gray-950">
      <div className="col-span-3">
        <div className="fixed overflow-x-hidden h-[100vh] border-r">
          <Sidebar />
        </div>
      </div>
      <div className="col-span-9 px-8 overflow-x-hidden overflow-y-auto h-[100vh]">
        <TopHeader />
        <Outlet />
      </div>
      <div className="bg-white absolute"></div>
    </div>
  );
};

export default Dashboard;
