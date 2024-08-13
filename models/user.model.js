import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: { type: String, unique: true },
        email: { type: String, unique: true },
        password: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
