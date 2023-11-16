import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema ({
    first_name :{
        type: String,
        required : true
    },
    last_name :{
        type : String,
        required: false
    },
    email:{
        type :String,
        required:true
    },
    password : {
        type: String,
        required: true
    },
    age : {
        type : Number,
        required: false
    },
    skills : {
        type : Array,
        required: false
    },
    role : {
       type: String,
       required: true

    },
     image : {
        type: String,
        required: false
     }
});

export interface IUsers extends mongoose.Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    age: Number;
    skills: [];
    role: string;
    image: string;
  }
