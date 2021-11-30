import Contact from "../models/contact.js";
import Event from "../models/event.js";
import User from "../models/user.js";

export const getEvents = async (req, res) => {
    try{
        // checks which user is logged in 
        const currentUser = await User.findOne({_id: req.body.id});
        
        // send all the events back to the front end for the currently logged in user
        var allEvents = [];
        for await (const element of currentUser.eventId){

            if (element != "" || element != null){
                //console.log(" element not null");
                const temp = await Event.findOne({_id: element})

                if (temp != null){
                    var event = {id : '', contacts : []};
                    //console.log(" temp not null");
                    event.id = (temp.eventGID);
                    var contacts = [];
                    for await (const contact of temp.contactsId){
                        const thisContact = await Contact.findOne({_id: contact});
                        contacts.push(thisContact);
                    }
                    console.log(event);
                    event.contacts = contacts
                    allEvents.push(event);
                    console.log(allEvents);
                }
            }
        }
        res.status(200).json({events : allEvents});
        
    } catch (error) {
        console.log("get events error")
        res.status(404).json({message: error.message});
    }
}

export const getOneEvent = async (req, res) => {
    try{
        const thisEvent = await Event.findOne({_id: req.params.id});
        res.status(200).json(thisEvent.eventGID);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createEvent = async (req, res) => {
    
    const newEvent = new Event(req.body);
    
    /*let newEvent = new Event ({
        "eventName" : req.body.eventName,
        "eventDate" : req.body.eventDate,
        "contactsId" : req.body.contactsId
    })
       
    newEvent.save( (err, result) => {
        // Handle errors
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.send('Successfully Added!');
    })*/
    
    
    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.log(error);
        res.status(409).json({message: error.message});
    }
}

export const deleteEvent = async (req, res) => {

    const id = req.params.id;

    const thisEvent = await Event.findOne({eventGID : id});
    
    // deletes event from the user using the event id
    try {
        await User.findOneAndUpdate({_id: req.body.id},
            {
                $pull: {eventId: thisEvent._id}
            }
        );
        console.log("event removed from user");

    } catch (error) {
        res.status(404).json({message: error.message});
    }

    // goes to every contact and deletes every event depending on the google event id
    for (const contact of thisEvent.contactsId){
        await Contact.findOneAndUpdate({_id: contact},
            {
                $pull: {eventId: id}
            }
        );
    }

    try {
        await Event.findByIdAndRemove(thisEvent._id).exec();
        res.send('Successfully Deleted!');
    }catch (error) {
        res.status(404).json({message: error.message});
    }

}