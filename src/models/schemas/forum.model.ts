import Mongoose, { Document } from 'mongoose'

export interface IForum extends Document {
    title: string
    subtitle: string
    userId: string
}

const ForumSchema = new Mongoose.Schema({
    title: { type: String, unique: true },
    subtitle: { type: String },
    userId: { type: String }
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

const ForumModel = Mongoose.model<IForum>('Forum', ForumSchema)
export default ForumModel