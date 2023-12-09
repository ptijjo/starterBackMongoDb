import mongoose from "mongoose";
import { UserInterface } from "./user.interface";
import uniquevalidator from 'mongoose-unique-validator';


const userSchema = new mongoose.Schema<UserInterface>({
    first_name:{
        type:String,
        required:true,
        trim:true

    },

    last_name:{
        type:String,
        required:true,
        trim:true

    },

    email:{
        type:String,
        required:true,
        trim:true

    },

    password:{
        type:String,
        required:true,
        trim:true
    },

    genre:{
        type:String,
        enum:["Homme","Femme"],
        required:true 
    },

    picture:{
        type:String
    },

});

userSchema.plugin(uniquevalidator);

module.exports = mongoose.model("User",userSchema);
