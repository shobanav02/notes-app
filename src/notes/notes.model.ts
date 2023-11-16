import * as mongoose from 'mongoose';

export const NotesSchema = new mongoose.Schema ({
    title:{
        type :String,
        required:true
    },
    description : {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

export interface INotes extends mongoose.Document {
    title: string;
    description: string;
    user_id : string
  }
