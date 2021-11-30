/*
check https://httpstatuses.com/
to understand the response codes
*/

import Contact from "../models/contact.js";
import User from "../models/user.js";
import Event from "../models/event.js";
import { ObjectId } from "bson";

//we are using aync on the first line because we are using await in the try statement
// await is because in a large database it will take along time to retrieve all the data
export const getContacts = async (req, res)=>{

    try {
        
        // find all contacts and store in a variable
        const currentUser = await User.findOne({_id: req.body.id}).lean();
        
        // send all the contacts back to the front end
        var contacts = [];
        for await (const element of currentUser.contactsId){
            if (element != null){
                const temp = await Contact.findOne({_id: element}).lean();
                
                if (temp != null){
                    contacts.push(temp);
                }
            }
            
            
        }

        res.status(200).json(contacts);

    } catch (error) {
        console.log("getContacts is not working");
        res.status(404).json({message: error.message});
        
    }
}

export const getOneContact = async (req, res) => {
    
    try{
        const thisContact = await Contact.findOne({_id: req.params.id}).lean();
        res.status(200).json(thisContact);
    } catch (error) {
        console.log("getOneContacts is not working");
        res.status(404).json({message: error.message});
    }
}

// because there is an await we use an async
export const createContact = async (req, res)=>{
    req.body.contact._id = ObjectId();
    const arrivedContact =new Contact(req.body.contact);

    // saving the initial arrived contact to the database
    try {
        // making a new contact can take time so there is an await
        await arrivedContact.save();

    } catch (error) {

        res.status(409).json({message: error.message});

    }
    
    console.log(req.body.id)
    // adding the contact for the user signed in 
    try{
        await User.updateOne({_id: req.body.id},
        { $push: {contactsId : arrivedContact._id}},
        );
      
        console.log("Added contact to user");

    } catch (error){
        console.log("adding contact to user error");
        res.status(409).json({message: error.message});
    }

    // add contacts to event if the event already exists
    try{
        console.log("Outside loop");
        if (arrivedContact.eventId != null){
            
            // go through all events
            for (const arrivedEvent of arrivedContact.eventId){
                
                console.log("Entered loop");

                const thisEvent = await Event.findOne({eventGID: arrivedEvent});

                // if event exists then add contacts to that event
                if (thisEvent != null){
                    thisEvent.contactsId.push(arrivedContact._id);
                    await thisEvent.save();


                // if event doesnt exist
                }else{
                  
                   
                    let newEvent = new Event ({
                        "eventGID" : arrivedEvent,
                        "contactsId" : [arrivedContact._id]
                    })
                    

                    // saving data to database   
                    newEvent.save( (err) => {
                        // Handle errors
                        if (err) {
                            console.log("adding event error");
                            res.send(err);
                        }
                        
                    })

                     // adding the event to the user
                    try{
                        await User.updateOne({_id: req.body.id},
                        { $push: {eventId : newEvent._id}},
                        );
                        
                        console.log("Added event to user");
                    } catch (error){
                        console.log("adding event to user error");
                        res.status(409).json({message: error.message});
                    }
                    
                }
                

            }
            res.send(arrivedContact);
        }
    } catch (error) {
        console.log("contact-event error");
        res.status(409).json({message: error.message});
    }

}

export const deleteContact = async(req, res) =>{

    const id = req.body.contactID;
    
    try {
        // delete the contact from the user contact-list
        await User.findOneAndUpdate({_id: req.body.userID},
            {
                $pull: {contactsId: id}
            }
        );
        console.log("contact removed from user");

    } catch (error) {
        res.status(404).json({message: error.message});
    }

    // delete the contact from any event that it is linked to
    // by deleting the contacts from events contact list
    const thisContact = await Contact.findOne({_id: id});
    //console.log(thisContact);
    for (const event of thisContact.eventId){
        await Event.findOneAndUpdate({eventGID: event},
            {
                $pull: {contactsId: id}
            }
        );
    }

  
    try {
        await Contact.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted!');
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}

// when user wants to update contact
export const updateContact = async(req, res) => {
    //console.log("!!");
    //console.log(req.body);
    //console.log(req.body.contact);
    //console.log("!!!!");
    const arrivedContact = new Contact(req.body.contact);
    //console.log(arrivedContact);
    try{
        
        // updating details of contact with the new information recieved
        await Contact.updateOne({_id: arrivedContact._id},
            { 
                note: arrivedContact.note,
                roleAtEvent: arrivedContact.roleAtEvent,
                socialTag: arrivedContact.socialTag,
                firstName: arrivedContact.firstName,
                lastName: arrivedContact.lastName,
                phoneNumber: arrivedContact.phoneNumber,
                email: arrivedContact.email,
                $push: {eventId : arrivedContact.eventId},
            }
        );
        //console.log("!!");
        // adding the contact to the events contact list 
        const thisContact = await Contact.findOne({_id: arrivedContact._id});
            
        // go through all events
        for (const arrivedEvent of thisContact.eventId){
                
            const thisEvent = await Event.findOne({eventGID: arrivedEvent});

            // if event exists then add contacts to that event
            if (thisEvent != null){
                // only if contact is not present then add contact to event
                if (!thisEvent.contactsId.includes(thisContact._id)){
                    thisEvent.contactsId.push(thisContact._id);
                    await thisEvent.save();
                }
                
            // if event doesnt exist
            }else{
                
                let newEvent = new Event ({
                    "eventGID" : arrivedEvent,
                    "contactsId" : [thisContact._id]
                })

                // saving data to database   
                newEvent.save( (err) => {
                    // Handle errors
                    if (err) {
                        console.log("adding event error");
                        res.send(err);
                    }
                    
                })
                
                // adding the event to the user
                try{
                    await User.updateOne({_id: req.body.id},
                    { $push: {eventId : newEvent._id}},
                    );
                  
                    console.log("Added event to user");
                } catch (error){
                    console.log("adding event to user error");
                    res.status(409).json({message: error.message});
                }

            }
        }
        //console.log("done");
        res.status(200).json(thisContact);
    } catch (error){
        console.log("updating contact error");
        res.status(409).json({message: error.message});
    }



}
