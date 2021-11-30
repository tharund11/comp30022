import pkg from "mongoose";
const { Schema, model } = pkg;

const eventSchema = new Schema({
    eventGID: {type: String, required: true},
    contactsId: [{type: Schema.Types.ObjectId, ref:"Contact", required: false}]
})

const Event = model("Event", eventSchema);

/*
export default [
{
    "eventName" : "Booty Ball",
    "eventDate" : 01/01/2020,
    "contactsId" : []
},
{
    "eventName" : "Hollapalooza",
    "eventDate" : 02/02/2021,
    "contactsId" : []
}
]*/

export default Event;