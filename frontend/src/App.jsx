import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigate, Route , RouterProvider , createBrowserRouter , createRoutesFromElements } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout.jsx";
import { Home } from "./components/Home.jsx";
import "./css/root.css"
import { Projects } from "./components/Projects.jsx";
import { Skills } from "./components/Skills.jsx";
import { LogIn } from "./components/LogIn.jsx";
import { AuthLayout } from "./layout/AuthLayout.jsx";
import { SignUp } from "./components/SignUp.jsx";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "./constant/base.js";

function App() {

  const { data  : authUser , isLoading } = useQuery({
    queryKey : ["authUser"],
    queryFn : async ()=> {
      try {
        const res = await fetch(`${baseURL}/api/auth/getUser`,{
          method : "GET",
          credentials : "include",
          headers : {
            "Content-Type" : "application/json"
          }
        });

        const data = await res.json();
        if(data.error) return null;
        if(!res.ok) throw new Error(data.error || "Something Went Wrong");
        return data;
      } catch (error) {
        console.log("Error while getting user",error);
        throw error;
      }
    },
    retry : false
  })

  if(isLoading) {
    return <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <div class="spinner-border" id="loader" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  }
  const router = createBrowserRouter (
    createRoutesFromElements ( 
      <>
        <Route element = {<AuthLayout/>} >
          <Route path="login" element =   {!authUser ? <LogIn/> : <Navigate to="/"/>} />
          <Route path="signUp" element =  {!authUser ? <SignUp/> : <Navigate to="/"/>} />
        </Route>
        <Route element = {authUser ? <MainLayout/> : <Navigate to="/login" /> }>
          <Route index element={<Home/>} />
          <Route path="projects" element={<Projects/>} />
          <Route path="skills" element={<Skills/>} />
          <Route path="logout" element={<Home/>} />
        </Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
