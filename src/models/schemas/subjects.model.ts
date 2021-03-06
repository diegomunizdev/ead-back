import Mongoose, { Document } from 'mongoose'

export interface ISubjects extends Document {
    name: string
    shift: string
    schedule: string
    period: string
    teacherId: string
}

const SubjectSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    shift: { type: String },
    schedule: { type: String },
    period: { type: String },
    teacherId: { type: String }
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

const SubjectsModel = Mongoose.model<ISubjects>('Disciplinas', SubjectSchema)
export default SubjectsModel