// require is used to bring in packages or other files
import pkg from "mongoose";
const { connect, connection } = pkg;

import dotenv from "dotenv";
dotenv.config();

// if mongo cloud 
var connectionString = "mongodb+srv://<username>:<password>@crm.eyx8e.mongodb.net/CRM?retryWrites=true&w=majority"
var dbAddress = connectionString.replace("<username>",process.env.MONGO_USERNAME).replace("<password>",process.env.MONGO_PASSWORD)

// running on local host
// const dbAddress = "mongodb://localhost";


console.log(dbAddress);

// if it works it works
connect(dbAddress ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "CRM"
})

const db = connection;

// if error in launching database
db.on("error",err =>
{
    console.error(err);
    process.exit(1)
})

// if it works
db.once("open", async ()=>{
    console.log("Mongo connection started on " + db.host + ":" + db.port);
});

import "./user.js";
import "./event.js";
import "./contact.js";
