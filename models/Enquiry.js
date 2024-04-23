import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
    //User Fields
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    full_name:{
        type: String,
        required: true,
    },
    dates:{
        type: String,
        required: false,
    },
    options:{
        type: Object,
        required: false,
    },

    //Package Fields
    packageID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    destinationName:{
        type: String,
        required: true,
    },
    packageType:{
        type: String,
        required: true,
    },

    //Other
    query:{
        type: String,
        required: true,
    },
    days:{
        type: String,
        required: false
    },
    status:{
        type: String,
        enum: ["Pending", "Contacted", "Checked"],
        default: "Pending",
    },
    //Store the aDmin who handled the enquiry
    handledByName:{
        type: String,
        required: false,
    },
    //Store the id of the Admin to whom the enquiry is assigned to
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

export default mongoose.model("Enquiry", EnquirySchema);