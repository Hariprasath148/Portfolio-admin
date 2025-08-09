import { NavLink } from "react-router-dom";
import { House , FolderDot , Code , LogOut } from "lucide-react";
import "../css/navigationBar.css";
import { useMutation , useQueryClient } from "@tanstack/react-query"
import { baseURL } from "../constant/base.js";
import toast from "react-hot-toast";

export const NavigationBar = ()=> {
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
    return(
        <>  
            <div className="navigator-wrapper">
                <NavLink to="/" className={({isActive})=>(isActive)?"navLink-icon active":"navLink-icon"} ><House /></NavLink>
                <p className="navLink-discription rounded-pill">Home</p>
            </div>
            <div className="navigator-wrapper">
                <NavLink to="/projects" className={({isActive})=>(isActive)?"navLink-icon active":"navLink-icon"} ><FolderDot /></NavLink>
                <p className="navLink-discription rounded-pill">Projects</p>
            </div>
            <div className="navigator-wrapper">
                <NavLink to="/skills" className={({isActive})=>(isActive)?"navLink-icon active":"navLink-icon"} ><Code /></NavLink>
                <p className="navLink-discription rounded-pill">Skills</p>
            </div>
            <div className="navigator-wrapper">
                <button onClick={logOut} className="logoutButton" ><LogOut /></button>
                <p className="navLink-discription rounded-pill">Logout</p>
            </div>
        </>
    )
};