import mongoose from 'mongoose';

const repetitorschemo = new mongoose.Schema({
    coverUrl: String,
    name:{
        type: String,
        required: true,
    },
    surname:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    experience:{
        type: Number,
        required: true,
    },
    person:{
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
    requestCount:{
        type: Number,
        default: 0,
    },
    },
    {
    timestaps: true,
    },
);

export default mongoose.model('Repetitor', repetitorschemo);