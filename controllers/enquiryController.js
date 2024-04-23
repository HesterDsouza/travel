// import { AuthContext } from "../../admin_page/src/context/AuthContext.js";
import Enquiry from "../models/Enquiry.js";

//Create Enquiry
export const createEnquiry = async (req, res, next) =>{

    const{
        userID,
        username,
        email,
        phone,
        full_name,
        dates,
        options,
        packageID,
        duration,
        price,
        destinationName,
        packageType,
        days,
        query,
    } = req.body;

    //const newEnquiry = new Enquiry(req.body)

    //Validate full_name and phone

    if(!phone){
        return res.status(400).json({success: false, message: "Phone is required"});
    }
    if (!full_name) {
        return res.status(400).json({success: false, message: "Full name is required"});
    }

    try {
        const newEnquiry = new Enquiry({
            userID,
            username,
            email,
            phone,
            full_name,
            dates: JSON.stringify(dates),
            options,
            packageID,
            duration,
            price,
            destinationName,
            packageType,
            days,
            query,
        });

        const savedEnquiry = await newEnquiry.save()
        res.status(200).json(savedEnquiry)
    } catch (error) {
        next(error)
        // console.error("Error creating enquiry",error);
        // res.status(500).json({success: false, message:"Inernal Server Error"});
    }
}

//Assign Enquiry
export const assignEnquiry = async (req, res, next) => {
    const {enquiryIDs, adminID} = req.body;

    try {
        const updatedEnquiries = await Enquiry.updateMany(
            {_id: {$in: enquiryIDs}},
            {assignedTo: adminID}
        );
        res.status(200).json(updatedEnquiries);
    } catch (error) {
        next(error)
    }
}

//Update Enquiry
export const updateEnquiryStatus = async (req, res, next) => {

    const {status, handledByName} = req.body;

    try {
        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status, handledByName },
            {new: true}
        );
        if (!enquiry){
            return res.status(404).json({success: false, message:"No Enquiry Found!"});
        }
        res.status(200).json(enquiry);
    } catch (error) {
        next(error)
    }
}
//Delete Enquiry
export const deleteEnquiry = async (req, res, next) =>{

    try {
        const deleteEnquiry = await Enquiry.findByIdAndDelete(req.params.id)
        res.status(200).json("Enquiry has been deleted")
    } catch (error) {
        next(error)
        // if(error.name === 'ValidationError'){
        //     const errors = Object.values(error.errors).map(err => err.message);
        //     return res.status(400).json({success: false, errors});
        // }
    }
};

//Get Single Enquiry
export const getEnquiry = async (req, res, next) =>{

    try {
        const enquiry = await Enquiry.findById(req.params.id)
        .populate({
            path: "assignedTo", model: "User", select: "full_name",
        })
        res.status(200).json(enquiry)
    } catch (error) {
        next(error)
    }
}

// Get all enquiries
export const getEnquiries = async (req, res, next) =>{

    try {
        const enquiries = await Enquiry.find()
        res.status(200).json(enquiries)
    } catch (error) {
        next(error)
    }
}

//Get the count of enquiries
export const countByType = async (req, res, next)=>{
    try {
        const enquiriesCount = await Enquiry.countDocuments();
        res.status(200).json(enquiriesCount)
    } catch (error) {
        next(error)
    }
}

//Get the count of each status
export const countStatus = async (req, res, next) => {
    const {status}  = req.query;
    try {
        const count = await Enquiry.countDocuments({ status });
        res.status(200).json(count)
    } catch (error) {
       next(error) 
    }
}

//Get the enquiries as per user
export const getUserEnquiries = async (req, res, next) => {
    const {userId} = req.params;

    try {
        const enquiries = await Enquiry.find({ userID: userId});
        res.status(200).json(enquiries);
    } catch (error) {
        next(error)
    }
}

//Get Enquiries that are assigned to an Admin
export const getAssignedEnquiries = async (req, res, next) => {
    try {
        const enquiries = await Enquiry.find({assignedTo: {$ne: null}}).populate("assignedTo");
        res.status(200).json(enquiries);
    } catch (error) {
       next(error) 
    }
}