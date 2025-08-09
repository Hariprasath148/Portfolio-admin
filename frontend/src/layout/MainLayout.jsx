import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../components/Header.jsx';
import { Outlet } from 'react-router-dom'
import { NavigationBar } from '../components/NavigationBar.jsx';
import "../css/mainLayout.css";
import { MobileNavigationBar } from '../components/MobileNavigationBar.jsx';
import {Toaster} from "react-hot-toast";

export const MainLayout = () => {
  return (
    <div className="p-md-3 p-2 vh-100" id="Main-layout-container">
        <Header/>
        <div className='main-wrapper-container d-flex m-0'>
          <div className="d-flex flex-column gap-4 navgationBar-container desktop-navigation-container px-2 py-2 mt-2">
            <NavigationBar/>
          </div>
          <MobileNavigationBar/>
          <div className="outlet-container w-100">
             <Outlet/>
          </div>
        </div>
        <Toaster containerStyle={{ zIndex: 999999999999 }}/>
    </div>
  )
};
