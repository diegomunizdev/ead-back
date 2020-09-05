import Mongoose, { Document } from 'mongoose'

export interface IGame extends Document {
    question: string
    rightAnswers: string
    wrongAnswers: string[]
    period: string
    points: number
}

const GameSchema = new Mongoose.Schema({
    question: { type: String },
    rightAnswers: { type: String },
    wrongAnswers: { type: Array },
    period: { type: String },
    points: { type: Number, min: 1, max: 10 }
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

