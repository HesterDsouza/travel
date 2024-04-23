import express from "express";
import { updateUser, deleteUser, getUser, getUsers, countByType, getAdmins } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("Hello user! You are logged in!")
// })
// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("Hello user! You are logged in and you can delete your account!")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("Hello Admin! You are logged in and you can delete all account!")
// })

//Update
router.put("/:id", verifyUser, updateUser);

//Delete
router.delete("/:id", verifyUser, deleteUser);

//Get
router.get("/find/:id", verifyUser, getUser);

//GetAll
router.get("/", verifyAdmin, getUsers);

//Get user count
router.get("/countByType", verifyAdmin, countByType);

//Get all Admins
router.get("/admins",verifyAdmin, getAdmins);
 
export default router