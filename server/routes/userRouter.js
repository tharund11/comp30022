import express from 'express';

import {registerUser, loginUser} from "../controller/userController.js";

// creating an instance of a router
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;