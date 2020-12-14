import Mongoose, { Document } from 'mongoose'
import { string } from 'yup'

export interface IMessage extends Document {
    userId: string,
    text: string,
    date: string,
    forumId: string
}

const MessageSchema = new Mongoose.Schema({
    text: { type: String },
    date: { type: Date, default: Date.now() },
    forumId: { type: String },
    userId: { type: String, required: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            return ret
        }
    }
})

const MessagesModel = Mongoose.model<IMessage>('Messages', MessageSchema)
export default MessagesModel