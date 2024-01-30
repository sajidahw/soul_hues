//Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

// creating a schema for MongoDB

import mongoose from "mongoose";
import { randomUUID } from "crypto"; //generates new random UUIDs

// schema defintions and fields
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {// assistant as AI chatbot or a user
        type: String,
        required: true,
    },
    content: {// message properties of user
        type: String,
        required: true,
    },

});


// id will be automatically created by MongoDB so skip that
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // creates indexes for email to search thru
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema], // chats will be an array of chatSchema

});


export default mongoose.model("User", userSchema);
//Models are responsible for creating and reading documents from the underlying MongoDB database.
