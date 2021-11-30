import express from 'express';
const app = express();

// Authentication imports
import cors from 'cors';
import cookieparser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from "dotenv";
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieparser(process.env.SECRET_KEY));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;

// View engine -> to decided which engine to use, bootstrapper, ejs, handlebars, pug etc.
// app.set('view engine', 'hbs')

import "./models/db.js";

import contactRouter from './routes/contactRouter.js';
// this will make sure that all the routes in student.js will start from /students
app.use('/contacts', contactRouter);

import eventRouter from "./routes/eventrouter.js";
app.use('/events', eventRouter);

import userRouter from "./routes/userRouter.js";
app.use('/user', userRouter);

// Render Home Page
app.get('/', (req, res) => {
    res.send('<h1>team-ion CRM</h1>'); // to change to res.render when temaplte engine has been chosen
})

app.all('*', (req, res) => {  // 'default' route to catch user errors
	// res.status(404).render('error', {errorCode: '404', message: 'That route is invalid.'})
	res.send('error: 404 Not Found');
})

app.listen(port, () => {
    console.log('crm is listening on port', {port});
})