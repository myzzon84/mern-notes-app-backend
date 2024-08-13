import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        content: { type: String, required: true, unique: true },
        tags: { type: [String], default: [] },
        isPinned: { type: Boolean, default: false },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('Note', noteSchema);