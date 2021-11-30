import pkg from "mongoose";
const { Schema, model } = pkg;

const userSchema = new Schema({
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: false},
    password: {type: String, required: true},
    contactsId: [{type: Schema.Types.ObjectId, ref:"Contact", required: false}],
    eventId: [{type: Schema.Types.ObjectId, ref:"Event", required: false}]
})

const User = model("User", userSchema);

export default User;