import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authenticateToken } from './utilities.js';
import {
    createAccountValidationYup,
    createNoteValidationYup,
    loginValidationYup,
} from './validations.js';
import { login, register } from './controllers/userControllers.js';
import { addNote } from './controllers/noteControllers.js';

dotenv.config();

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log('MongoDB OK!'))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    res.json({ data: 'hello' });
});

// Create Account
app.post('/create-account', createAccountValidationYup, register);

// Login
app.post('/login', loginValidationYup, login);

// Add Note
app.post('/add-note', authenticateToken, createNoteValidationYup, addNote)

app.listen(8000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server OK!');
    }
});

//
