import Mongoose, { Document } from 'mongoose'

export interface IGame extends Document {
    question: string
    correctAnswer: string
    userResponse: string
    options: string[]
    answered: boolean
    period: string
    points: number
    userId: string
}

const GameSchema = new Mongoose.Schema({
    question: { type: String, unique: true },
    correctAnswer: { type: String },
    userResponse: { type: String },
    options: { type: Array },
    answered: { type: Boolean, default: false },
    period: { type: String },
    points: { type: Number, min: 1, max: 10 },
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

const GameModel = Mongoose.model<IGame>('Game', GameSchema)
export default GameModel

