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
import { getUser, login, register } from './controllers/userControllers.js';
import {
    addNote,
    deleteNote,
    editNote,
    getAllNotes,
    updateIsPinned,
} from './controllers/noteControllers.js';

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
app.post('/add-note', authenticateToken, createNoteValidationYup, addNote);

// Edit note
app.put(
    '/edit-note/:noteId',
    authenticateToken,
    createNoteValidationYup,
    editNote
);

// Get all notes
app.get('/get-all-notes', authenticateToken, getAllNotes);

// Delete note
app.delete('/delete-note/:noteId', authenticateToken, deleteNote);

// Update isPinned value
app.put('/update-note-pinned/noteId', authenticateToken, updateIsPinned);

// Get user
app.get('/get-user', authenticateToken, getUser);

app.listen(8000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server OK!');
    }
});

//
