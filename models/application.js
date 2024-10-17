import mongoose from 'mongoose';

const applicationschemo = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    subjects:{
        type: String,
        required: true,
    },
    programmes:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: 'еще не рассмотрена',
    },
    }, 
{
    timestamps: true,
},
);

export default mongoose.model('Application', applicationschemo)