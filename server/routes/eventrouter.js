import express from 'express';
import {getEvents, getOneEvent, createEvent, deleteEvent} from "../controller/eventController.js";

const eventRouter = express.Router();

eventRouter.post('/', getEvents);
eventRouter.get('/:id', getOneEvent);
eventRouter.post('/create', createEvent);
eventRouter.delete('/:id', deleteEvent);

export default eventRouter;