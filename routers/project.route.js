import express from "express";
import { addNewProject , deleteProject , getAllProject, updateProject } from "../controllers/project.controller.js";
import upload from "../middleware/ImgUpload.js";
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router();

router.post("/addNewProject",protectRoute,upload.fields([
  { name: 'Img', maxCount: 1 },
  { name: 'HeroImg', maxCount: 1 }
]),addNewProject);
router.delete("/deleteProject",protectRoute,deleteProject);
router.patch("/updateProject/:id",protectRoute,upload.fields([
  { name: 'Img', maxCount: 1 },
  { name: 'HeroImg', maxCount: 1 }
]),updateProject);
router.get("/getAllProject",protectRoute,getAllProject);

export default router;