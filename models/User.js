import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    username: {
        type:  String,
        required: true,
        unique: true
    },
    email: {
        type:  String,
        required: true,
        unique: true
    },
    password: {
        type:  String,
        required: true,
        unique: true
    },
    full_name:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    isAdmin:{
        type:  Boolean,
        default: false,
    },
    securityQuestion: {
        type: String,
        required: true,
    },
    securityAnswer: {
        type: String,
        required: true,
    }
},
{ timestamps: true}
);

UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('securityAnswer')) return next();

    const salt = bcrypt.genSaltSync(10);
    const secureAnsHash = bcrypt.hashSync(user.securityAnswer, salt);
    user.securityAnswer = secureAnsHash;
    next();
});

export default mongoose.model("User", UserSchema)