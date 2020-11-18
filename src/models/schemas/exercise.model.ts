import Mongoose, { Document } from 'mongoose'

export interface IExercise extends Document {
    file: string
    title: string
    description: string
    delivery: string
    urlVideo: string
    subjectId: string
}

const ExerciseSchema = new Mongoose.Schema({
    file: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    delivery: { type: String },
    urlVideo: { type: String },
    subjectId: { type: String },
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

const ExerciseModel = Mongoose.model<IExercise>('Exercise', ExerciseSchema)
export default ExerciseModel