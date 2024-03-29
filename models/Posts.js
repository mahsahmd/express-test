import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})
const postsModel = mongoose.model('Posts', postSchema)
export default postsModel;