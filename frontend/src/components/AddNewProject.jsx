import { useState } from "react";
import "../css/AddNewProject.css";
import { useMutation  , useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';
import { baseURL } from "../constant/base.js";

export const AddNewProject = ({ onClose }) => {
  const queryClient = useQueryClient();
  const[techStack,setTechStack] = useState([]);
  const[keyPoints,SetKeyPoints] = useState([]);
  const[name , setName] = useState("");
  const[shortDiscription , setshortDiscription] = useState("");
  const[longDiscription , setLongDiscription] = useState("");
  const[siteLink , setSiteLink] = useState("");
  const[codeLink , setCodeLink] = useState("");
  const[mainImg , setMainImg] = useState("");
  const[heroImg , setHeroImg] = useState("");

  const { mutate : addNewProject , isPending , isError , error } = useMutation({
    mutationFn : async(newProject)=> {
      try {
        const res = await fetch(`${baseURL}/api/project/addNewProject`,{
          method : "POST",
          credentials : "include",
          body : newProject
        });
        const data = await res.json();
        if(!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        console.log(error);
        throw error;
     }
    },
    onSuccess : ()=> {
      toast.success("New Project Added Successfully");
      document.getElementById("add-new-project-form").reset();
      setName("");
      setshortDiscription("");
      setLongDiscription("");
      setSiteLink("");
      setCodeLink("");
      setMainImg("");
      setHeroImg("");
      setTechStack([]);
      SetKeyPoints([]);
      queryClient.invalidateQueries({
            queryKey: ["allProject"]
      });
      onClose();
    },
    onError: (error) => {
      toast.error("Unable to Save the Project");
      console.error("Error Adding Project:", error);
    },
  });


  const editTechStack = (index , value , type)=> {
    const updatedTechStack = [...techStack];
    updatedTechStack[index][type] = value;
    setTechStack(updatedTechStack);
  }

  const deleteTechStack = (index) => {
    setTechStack((pre)=> pre.filter((_,i)=> i != index));
  }
  
  const addNewTechStackByInput = ()=> {
    const techNameInput = document.getElementById("newTechInput").value;
    const techDiscriptionInput = document.getElementById("newTechInputDiscription").value;
    if(techNameInput.trim()=="" || techDiscriptionInput=="") return;
    setTechStack((pre)=> [...pre , { Tech : techNameInput , TechDiscription : techDiscriptionInput }]);
    document.getElementById("newTechInput").value="";
    document.getElementById("newTechInputDiscription").value="";
  }

  const addNewKeyPointByInput = ()=> {
    const newKeyPoint = document.getElementById("keyPointInput").value;
    if(newKeyPoint.trim() == "") return;
    SetKeyPoints((pre)=> [...pre , newKeyPoint]);
    document.getElementById("keyPointInput").value = "";
  } 

  const deleteKeyPoint = (index) => {
    SetKeyPoints((pre)=> pre.filter((_,i)=> i != index));
  }

  const editKeyPoint = (index,value) => {
    const updatedKeyPoints = [...keyPoints];
    updatedKeyPoints[index] = value;
    SetKeyPoints(updatedKeyPoints);
  }

  const addNewProjectOnSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("Name" , name);
    formdata.append("ShortDiscription" , shortDiscription);
    formdata.append("FullDiscription" , longDiscription);
    formdata.append("SiteLink" , siteLink);
    formdata.append("CodeLink" , codeLink);
    formdata.append("Img" , mainImg);
    formdata.append("HeroImg" , heroImg);
    formdata.append("Technology",JSON.stringify(techStack));
    formdata.append("KeyPoints",JSON.stringify(keyPoints));
    addNewProject(formdata);
  }

  return (
    <div className="add-new-project-wrapper">
      <div className="add-new-project-container p-3">
        <div className="add-new-project-container-header d-flex align-items-center justify-content-between">
            <p>Add New Project</p>
            <button className="border-0 bg-transparent px-3 rounded-3" onClick={onClose} >X</button>
        </div>
        <form onSubmit={addNewProjectOnSubmit} className="row" id="add-new-project-form">
          <div className="col-lg-6 col-12 mb-2">
            <div className="form-group mt-2">
              <label htmlFor="name" className="mb-1">Enter the Name<span>*</span></label>
              <input className="form-control" id="name" value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter the Name of the Project" required/>
            </div>
            <div className="form-group mt-3">
               <label htmlFor="short-discription" className="mb-1">Enter the short Discription<span>*</span></label>
              <input className="form-control" id="short-discription" value={shortDiscription} onChange={(e)=>setshortDiscription(e.target.value)} type="text" placeholder="Enter the short Discription" required/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="long-discription" className="mb-1">Enter the Long Discription<span>*</span></label>
              <input className="form-control" id="long-discription" value={longDiscription} onChange={(e)=>setLongDiscription(e.target.value)} type="text" placeholder="Enter the Full Discription" required/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="Site-Link" className="mb-1">Enter the Site Link</label>
              <input className="form-control" id="Site-Link" type="text" value={siteLink} onChange={(e)=>setSiteLink(e.target.value)} placeholder="Hosted Link"/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="code-Link" className="mb-1">Enter the Code Link</label>
              <input className="form-control" id="code-link" type="text" value={codeLink} onChange={(e)=>setCodeLink(e.target.value)} placeholder="GitHub Link"/>
            </div>
            <div className="from-image-input-container d-flex mt-3">
                <div className="w-50">
                  <label htmlFor="main-img" className="mb-2"> Select Main Image<span>*</span></label>
                  <input type="file" name="main-img" id="main-img" onChange={(e) => { const file = e.target.files?.[0]; if(file) setMainImg(file) }} required />
                </div>
                <div className="w-50">
                  <label htmlFor="hero-img" className="mb-2"> Select Hero Image<span>*</span></label>
                  <input type="file" name="hero-img" id="hero-img" onChange={(e) => { const file = e.target.files?.[0]; if(file) setHeroImg(file) }} required />
                </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="form-group mt-1">
              <label htmlFor="technology">Enter the Technology Used</label>
              <div  className="form-group tech-container mt-2">
                <input className="form-control" placeholder="Tech Name" id="newTechInput"/>
                <input className="form-control" placeholder="Discription" id="newTechInputDiscription"/>
                <button type="button" className="border-0 px-4 rounded-2" onClick={addNewTechStackByInput} >Add</button>
              </div>
              {
                techStack.map((eachTech,index)=>(
                  <div  className="form-group tech-container mt-2" key={index}>
                    <input className="form-control" value={eachTech.Tech} onChange={(e)=>{editTechStack(index,e.target.value,"tech")}} placeholder="Tech Name" />
                    <input className="form-control" value={eachTech.TechDiscription} onChange={(e)=>{editTechStack(index,e.target.value,"discription")}}  placeholder="Discription"/>
                    <button type="button" className="border-0 px-4 rounded-2 delete-btn px-4" onClick={()=>deleteTechStack(index)}>X</button>
                  </div>
                ))
              }
            </div>
             <div className="form-group mt-3">
              <label htmlFor="keyPointInput">Enter the Technology Used</label>
              <div  className="form-group keyPoints-container gap-2 d-flex justify-content-between mt-2">
                <input className="form-control" id="keyPointInput" placeholder="Add the Key Points"/>
                <button type="button" className="border-0 px-4 rounded-2" onClick={addNewKeyPointByInput}>Add</button>
              </div>
              {
                keyPoints.map((keyPoint,index)=>(
                  <div  className="form-group keyPoints-container gap-2 d-flex justify-content-between mt-2" key={index}>
                    <input className="form-control" placeholder="Add the Key Points" onChange={(e)=>editKeyPoint(index,e.target.value)} value={keyPoint}/>
                    <button type="button" className="border-0 px-4 rounded-2 delete-btn2 px-4" onClick={()=>deleteKeyPoint(index)}>X</button>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-12 mt-2"><button type="submit" className="w-100 py-2 border-0 add-new-project-form-submit-button" disabled={isPending}>{isPending ? "Saving" : "Submit"}</button></div>
        </form>
      </div>
    </div>
  )
}
