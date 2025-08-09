import mongoose from "mongoose";

const TechSchema = new mongoose.Schema({
    Tech : {
        type : String,
    },
    TechDiscription : {
        type : String
    }
});

const projectSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    CodeLink : {
        type : String
    },
    SiteLink : {
        type : String
    },
    Img : {
        type : String
    },
    HeroImg : {
        type : String
    },
    ShortDiscription : {
        type : String,
        required : true
    },
    FullDiscription : {
        type : String,
        required : true
    },
    Technology : [TechSchema],
    KeyPoints : {
        type : [String]
    }
},{ timestamps : true });

const Project = mongoose.model("Project",projectSchema);
export {projectSchema};
export default Project;