import express from "express";
import {  verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import { assignEnquiry, countByType, countStatus, createEnquiry, deleteEnquiry, getAssignedEnquiries, getEnquiries, getEnquiry, getUserEnquiries, updateEnquiryStatus } from "../controllers/enquiryController.js";

const router = express.Router();

//Create
router.post("/create", verifyToken, createEnquiry);

//Assign Enquiry to Admin
router.post("/assignEnquiry", verifyAdmin, assignEnquiry);

//Update
router.put("/:id", verifyAdmin, updateEnquiryStatus);

//Delete
router.delete("/:id", verifyAdmin, deleteEnquiry );

//Get
router.get("/find/:id",verifyToken, getEnquiry);

//Get All
router.get("/", verifyToken, getEnquiries);

//Get count of all users/packages/enquiries
router.get("/countByType", verifyAdmin, countByType);

//Get all enquiries by status
router.get("/countStatus", verifyAdmin, countStatus);

//Get all enquiries of specific user
router.get("/user/:userId", verifyToken, getUserEnquiries);

//Get all assigned enquiries
router.get("/assigned", verifyAdmin, getAssignedEnquiries);

export default router;