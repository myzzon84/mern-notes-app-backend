import Note from '../models/note.model.js';
import * as Yup from 'yup';

export const addNote = async (req, res) => {
    const {title, content, tags} = req.body;
    const {user} = req.user;

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            note,
            message: 'Note added successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}