import User from "../models/user.model.js";
import { v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";

const uploadToCloudinary = (buffer) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream((err, result) =>
    err ? reject(err) : resolve(result)
  );
  streamifier.createReadStream(buffer).pipe(stream);
});

export const addNewProject = async (req,res)=>{
    try {
        const user = req.user;
        const userData = await User.findOne({_id : user._id});
        if(!userData) return res.status(400).json({error : "User not Found"});
        const {Name , ShortDiscription , FullDiscription , SiteLink , CodeLink ,  Technology , KeyPoints , Category } = req.body;
        if(!Name || !ShortDiscription || !FullDiscription){
            return res.status(400).json({message : "Some of the field is Missing."});
        }
        
        const imgUrl = await uploadToCloudinary(req.files.Img[0].buffer);
        const heroUrl = await uploadToCloudinary(req.files.HeroImg[0].buffer);

        const newProject = {
            Name,
            ShortDiscription,
            FullDiscription,
            Category : Category.toLowerCase(),
            Img : imgUrl.secure_url,
            HeroImg : heroUrl.secure_url
        };

        if(!SiteLink=="") newProject.SiteLink = SiteLink;
        if(!CodeLink=="") newProject.CodeLink = CodeLink;
        if(!Technology=="") newProject.Technology = JSON.parse(Technology);
        if(!KeyPoints=="") newProject.KeyPoints = JSON.parse(KeyPoints);
        userData.Project.push(newProject);
        await userData.save();
        res.status(200).json({message : "New Project Added Successfully",newProject});

    } catch (error) {
        console.log("Error in the Add New Project Controller : ",error);
        res.status(500).json({error : "Internal Server Error"});
    }
}

export const deleteProject = async (req,res) => {
    try {
        const user = req.user;
        const userData = await User.findOne({_id : user._id});
        if(!userData) return res.status(400).json({error : "User not Found"});
        const { deleteId } = req.body;
        if(!deleteId) {
            return res.status(400).json({error:"The ID is missng for the delete."});
        } 
        const deletedProject = userData.Project.id(deleteId);
        if(!deletedProject) {
            return res.status(400).json({error:"Unable to Delete this Project."});   
        }
        await cloudinary.uploader.destroy(deletedProject.Img.split("/").pop().split(".")[0]);
        await cloudinary.uploader.destroy(deletedProject.HeroImg.split("/").pop().split(".")[0]);
        userData.Project = userData.Project.filter(pro => pro._id.toString() !== deleteId.toString());
        await userData.save();
        res.status(200).json({message:"Project Deleted SuccessFully.",deletedProject});
    } catch (error) {
        console.log("Error in the delete controller",error);
        res.status(500).json({error : "Internal Server Message"});
    }
}

export const updateProject = async(req,res) => {
    try {
        const user = req.user;
        const userData = await User.findOne({_id : user._id});
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({message : "ID is miissing to update the record"});
        }
        const {Name , ShortDiscription , FullDiscription , SiteLink , CodeLink ,  Technology , KeyPoints , Category } = req.body;
        const imgFile = req.files?.Img?.[0] || null;
        const heroImgFile = req.files?.HeroImg?.[0] || null;

        const project =  userData.Project.id(id);
        if(!project) return res.status(400).json({message : "Invaid ProjectID"});

        let uploadedImg = null;
        let uploadedHeroImg = null;

        if (imgFile) {
            await cloudinary.uploader.destroy(project.Img.split("/").pop().split(".")[0]);
            uploadedImg = await uploadToCloudinary(imgFile.buffer);
        }

        if (heroImgFile) {
            await cloudinary.uploader.destroy(project.HeroImg.split("/").pop().split(".")[0]);
            uploadedHeroImg = await uploadToCloudinary(heroImgFile.buffer);
        }

        project.Name = Name || project.Name;
        project.ShortDiscription = ShortDiscription || project.ShortDiscription;
        project.FullDiscription = FullDiscription || project.FullDiscription;
        project.SiteLink = SiteLink || project.SiteLink;
        project.CodeLink = CodeLink || project.CodeLink;
        project.Technology = JSON.parse(Technology) || project.Technology;
        project.KeyPoints = JSON.parse(KeyPoints) || project.KeyPoints;
        project.Category = Category.toLowerCase() || project.Category;
        if (uploadedImg) project.Img = uploadedImg.secure_url;
        if (uploadedHeroImg) project.HeroImg = uploadedHeroImg.secure_url;

        await userData.save();
        res.status(200).json({message : "Updated Successfully",project});

    } catch (error) {
        console.log("Error in the update controller",error);
        res.status(500).json({error : "Internal Server Message"});
    }
}

export const getAllProject = async (req,res) => {
    try {
        const user = req.user;
        const userData = await User.findOne({_id : user._id});
        res.status(200).json(userData.Project);
    } catch (error) {
        console.log("Error in the getALlProject Controller",error);
        res.status(500).json({error : "Internal server error"});
    }
}
