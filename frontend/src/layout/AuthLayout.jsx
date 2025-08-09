import {  Outlet } from 'react-router-dom';
import "../css/authLayouts.css";
import {Toaster} from "react-hot-toast";

export const AuthLayout = () => {
  return (
    <div className='auth-wrapper w-100 h-100'>
        <div className="auth-container p-2 row m-2">
            <div className="col-lg-4 col-12 auth-info-container pt-3 px-3">
              <p className='m-0 mb-1 text-light'>Access Restricted</p>
              <p className='m-0 mt-2 text-light'>This page is accessible only by me. If you'd like to know more about me, click the link below.</p>
              <a href="https://hariprasath-profile-sand.vercel.app/" className="text-light mt-1 d-block" target="_blank" >Know more</a>
            </div>
            <div className="col-lg-8 col-12 px-lg-5">
                <Outlet />
            </div>
        </div>
        <Toaster containerStyle={{ zIndex: 999999999999 }}/>
    </div>
  )
}
