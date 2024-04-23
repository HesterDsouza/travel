import User from "../models/User.js";

export const updateUser = async (req, res, next) =>{

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}
export const deleteUser = async (req, res, next) =>{

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (err) {
        next(err)
    }
}
export const getUser = async (req, res, next) =>{

    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
export const getUsers = async (req, res, next) =>{

    try {
        const users = await User.find();
        //const usersCount = await User.countDocuments();
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}

//Count number of users
export const countByType = async (req, res, next)=>{
    try {
        const usersCount = await User.countDocuments();
        res.status(200).json(usersCount)
    } catch (error) {
        next(error)
    }
}

//Get all Admins
export const getAdmins = async (req, res, next) => {
    try{
        const admins = await User.find({isAdmin: true});
        res.status(200).json(admins)
    } catch(err) {
        next(err)
    }
}