import Note from '../models/note.model.js';
import * as Yup from 'yup';

export const addNote = async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
            user: user._id,
        });

        await note.save();

        return res.json({
            note,
            message: 'Note added successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const editNote = async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({
            message: 'No changes provided',
        });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({
                message: 'Note not found',
            });
        }
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            note,
            message: 'Note update successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const { user } = req.user;
        const notes = await Note.find({ userId: user._id }).sort({
            isPinned: -1,
        }).populate('user');
        return res.json({
            notes,
            message: 'All notes retrieved successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

export const deleteNote = async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({
                message: 'Note not found',
            });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            message: 'Note deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

export const updateIsPinned = async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({
                message: 'Note not found',
            });
        }
        note.isPinned = isPinned;

        await note.save();

        return res.json({
            note,
            message: 'Note update successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
