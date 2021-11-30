import pkg from "mongoose";
const { Schema, model } = pkg;

const contactSchema = new Schema({
    note: {type: String, required: false},
    roleAtEvent: {type: String, required: false},
    socialTag: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    phoneNumber: {type: String , required: false},
    email: {type: String , required: false},
    eventId: [{type: String, required: false}]
    },
    { timestamps: true }
);

const Contact = model("Contact", contactSchema);

export default Contact;