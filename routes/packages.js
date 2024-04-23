import express from "express";
import {verifyAdmin} from "../utils/verifyToken.js";
import { createPackage, updatePackage, deletePackage, getPackage, getPackages, countByType, getAllUniqueDestinations, countByPackageType} from "../controllers/packageController.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createPackage);

//Update
router.put("/:id", verifyAdmin, updatePackage);

//Delete
router.delete("/:id", verifyAdmin, deletePackage);

//Get
router.get("/find/:id", getPackage);

//GetAll
router.get("/", getPackages);
//router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/countByPackageType", verifyAdmin, countByPackageType);
router.get("/destinations", getAllUniqueDestinations);
 
export default router