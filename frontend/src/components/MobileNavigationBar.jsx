import { NavLink } from "react-router-dom";
import { House , FolderDot , Code , LogOut } from "lucide-react";
import "../css/mobileNavigationBar.css"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import { baseURL } from "../constant/base.js";
import toast from "react-hot-toast";

export const MobileNavigationBar = () => {
  const queryClient = useQueryClient();
  const { mutate : logOut }  = useMutation({
      mutationFn : async ()=>{ 
          try {
              const res = await fetch(`${baseURL}/api/auth/logOut`,{
                  method : "POST",
                  credentials : "include",
                  headers : {
                      "Content-Type" : "application/json"
                  }
              });
              const data = await res.json();
              if(!res.ok) throw new Error(data.error || "Something Went Worng" )
          } catch (error) {
              console.log("Error while logOut",error);
              throw error;
          }  
      },
      onSuccess : ()=> {
          queryClient.invalidateQueries({
              queryKey : ["authUser"]
          });
          toast.success("logOut");
      }
  })
  return (
    <>
     <div className="px-3 py-2 gap-4 justify-content-around navgationBar-container mobile-navigation-container">
        <div className="mobile-navigator-wrapper">
            <NavLink to="/" className={({isActive})=>(isActive)?"mobile-navLink-icon active":"mobile-navLink-icon"} ><House /></NavLink>
        </div>
        <div className="mobile-navigator-wrapper">
            <NavLink to="/projects" className={({isActive})=>(isActive)?"mobile-navLink-icon active":"mobile-navLink-icon"} ><FolderDot /></NavLink>
        </div>
        <div className="mobile-navigator-wrapper">
            <NavLink to="/skills" className={({isActive})=>(isActive)?"mobile-navLink-icon active":"mobile-navLink-icon"} ><Code /></NavLink>
        </div>
        <div className="mobile-navigator-wrapper">
            <button onClick={logOut} className="mobile-logout" ><LogOut /></button>
        </div>
     </div>
    </>
  )
};
