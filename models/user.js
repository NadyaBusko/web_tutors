import mongoose from 'mongoose';

const userschemo = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    }
    }, 
{
    timestamps: true,
},
);

export default mongoose.model('User', userschemo)