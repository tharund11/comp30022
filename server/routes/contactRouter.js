import express from 'express';

// importing the controller functions for contacts
import {getContacts, getOneContact, createContact, deleteContact, updateContact} from "../controller/contactController.js";

// creating an instance of a router
const router = express.Router();

/*
inside it would take parameters
    1. path
    2. call back function
req : request
res: response
*/ 

// using the function from contact controller
router.post('/', getContacts);
router.get('/:id', getOneContact);
router.post('/create', createContact);
router.delete('/delete', deleteContact);
router.post('/update', updateContact);

export default router;