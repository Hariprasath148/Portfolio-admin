import { useMutation , useQueryClient } from "@tanstack/react-query";
import { EyeOff , Eye } from "lucide-react";
import { useState } from "react";
import { baseURL } from "../constant/base";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

export const SignUp = () => {
  const [ showPassword , setShowPassword ] = useState(false);
  const [ Name , setName ] = useState("");
  const [ Email , setEmail ] = useState("");
  const [ Password , setPassword ] = useState("");
  const queryClient = useQueryClient();
  const{ mutate : signUp , isLoading , isError , error } = useMutation({
    mutationFn : async ({ Name , Email , Password}) => {
        const res = await fetch(`${baseURL}/api/auth/signUp`,{
          method : "POST",
          credentials : "include",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({Name,Email,Password})
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.error || "Something went Wrong");
    },
    onSuccess : ()=> {
      toast.success("SignUp Successfully");
      queryClient.invalidateQueries({
        queryKey : ["authUser"]
      });
    },
    onError : ()=> {
      toast.error("Unabel to signUp")
    }
  })

  const signUpControl = (e) => {
    e.preventDefault();
    signUp({Name,Email,Password});
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 login-signUp-container">
      <p className="login-signUp-logIn m-0">Welcome New Admin</p>
      <p className="text-white" >Creat an new Account</p>
      <form onSubmit={signUpControl} className="w-100 text-light">
        <div className="form-group mb-3">
          <label htmlFor="name" className="mb-2">Enter the Name</label>
          <input type="text" id="name" className="form-control" placeholder="Enter your Name" onChange={(e)=>{setName(e.target.value)}} autoComplete="name" required/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="mb-2">Enter the Email</label>
          <input type="text" id="email" className="form-control auth-input" placeholder="Enter your Email" onChange={(e)=>{setEmail(e.target.value)}} autoComplete="email" required/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="Password" className="mb-2">Enter the Password</label>
          <div className="password-container">
            <input type={showPassword ? "text" : "password"} id="password" className="form-control auth-input" placeholder="Enter your Password" onChange={(e)=>{setPassword(e.target.value)}} autoComplete="new-password" required/>
            <button type="button" className="eye-icon border-0 bg-transparent" onClick={() => setShowPassword(showPassword ? false : true)}>{ showPassword ? <Eye/> : <EyeOff />}</button>
          </div>
        </div>
        {isError && <p className="m-0 text-danger mb-2">{error.message}</p> } 
        <button disabled={isLoading} type="submit" id="submit-btn" className="w-100 border-0 py-2 mt-2">{ isLoading ? "Loading..." : "SignUp"}</button>
      </form>
      <p className="text-light mt-3">Already have an Account <NavLink className="ms-1 change-btn" to="/logIn">LogIn</NavLink></p>
    </div>
  )
}
 