import Mongoose, { Document } from 'mongoose'


export interface IClasses extends Document {
    record: string
    date: string
    subjectId: string
}

const ClassesSchema = new Mongoose.Schema({
    record: { type: String },
    date: { type: String },
    subjectId: { type: String }
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

const ClassesModel = Mongoose.model<IClasses>('Aulas', ClassesSchema)
export default ClassesModel