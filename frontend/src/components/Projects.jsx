import { Pencil , Trash } from "lucide-react";
import "../css/project.css";
import { AddNewProject } from "./AddNewProject.jsx";
import { useState } from "react";
import { EditProject } from "./EditProject.jsx";
import { useMutation, useQuery , useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../constant/base.js";
import toast from "react-hot-toast";

export const Projects = () => {
  const[addNewProjectFormStatus , setAddNewProjectFormStatus ] = useState(false);
  const queryClient = useQueryClient();
  const[editProjectJson , setEditProjectJson] = useState(null);
  const{data : allProjects = [] , isLoading } = useQuery({
    queryKey : ["allProject"],
    queryFn : async() => {
        try {
            const res = await fetch(`${baseURL}/api/project/getAllProject`,{
                method :"GET",
                credentials : "include",
                headers : {
                "Content-Type" : "application/json"
              }
            });
            const data = await res.json();
            if(data.error) return null;
            if(!res.ok) { 
                throw new Error(data.error || "Something went Wrong");
            };
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    retry : false
  });

  const{ mutate : deleteProject , isError : isDeleteError , isPending : idDeletePending } = useMutation({
    mutationFn : async (id)=> {
        try {
            const res = await fetch(`${baseURL}/api/project/deleteProject`,{
                method : "DELETE",
                credentials : "include",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({deleteId : id})
            });
            const data = await res.json();
            if(!res.ok) throw new Error(data.error || "Something went Wrong");
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    onSuccess : () => {
        toast.success("Project Deleted");
        queryClient.invalidateQueries({
            queryKey: ["allProject"]
        });
    },
    onError : () => {
        toast.error("Unable to Deleted");
    }
  })

  if(isLoading) {
    return <div className="load">Loading</div>
  }

  return (
    <>
        <div className="project-navigation ps-4 pe-2 py-2 d-flex justify-content-between align-items-center">
            <p className="m-0">Projects</p>
            <button className="btn-primary border-0 add-new-project-button px-3 py-2" onClick={() => setAddNewProjectFormStatus(true)}>Add New</button>
        </div>
        { addNewProjectFormStatus && <AddNewProject onClose={() => setAddNewProjectFormStatus(false)}/> }
        { editProjectJson && <EditProject onClose={() => setEditProjectJson(null)} project={editProjectJson} /> }
        <div className="row mt-0">
            { (allProjects.length < 1) ? <div className="record-not-found w-100">No recored found</div> : allProjects.map((project,index)=>(
                <div className="col-lg-6 col-12 project-container-wrapper " key={index}>
                    <div className="project-container">
                        <div className="project-title-container d-flex justify-content-between">
                            <div className="project-title-wrapper">
                                <div className="project-header d-flex justify-content-between align-items-center">
                                    <p className="project-title m-0">{project.Name}</p>
                                </div>
                                <div className="white-curve">
                                </div>
                                <div className="tranparent-box"></div>
                            </div>
                            <div className="project-deleteAndEdit-container d-flex justify-content-center align-items-center">
                                <button className="project-deleteAndEdit-button project-edit-button border-0 mb-2" onClick={() => setEditProjectJson(project)} ><Pencil /></button>
                                <button className="project-deleteAndEdit-button project-delete-button border-0 mb-2" onClick={() => deleteProject(project._id)} disabled={idDeletePending} ><Trash /></button>
                                <div className="transparent-curve">
                                </div>
                            </div>
                        </div>
                        <div className="project-content-wrapper">
                            <div className="project-content-container m-0 row">
                                <div className="col-lg-6 col-12 project-img-container"><img src={project.Img} alt="..." /></div>
                                <div className="col-lg-6 col-12 pt-2 mt-2">
                                <p className="project-discription">{project.ShortDiscription}</p>
                                <div className="d-flex link-container">
                                    <a href={project.SiteLink} className="px-3 w-50 py-1 text-decoration-none text-center border-0 rounded-2 me-2 site-button view-button" target="blank">View Site</a>
                                    <a href={project.CodeLink} className="px-3 w-50 py-1 text-decoration-none text-center border-0 rounded-2 site-button code-button" target="blank">View Code</a>
                                </div>
                            </div>
                            </div>  
                        </div>
                    </div>
                </div>
            )) }
        </div>
    </>
  )
};

