import Mongoose, { Document } from 'mongoose'

/**
 * Modelo de Fórum:
 * O fórum será onde o tutores ou alunos poderão abrir uma
 * conversa para um contato dentro do sistema.
 **/

interface IMessage extends Document {
    userId: string,
    text: string,
    date: Date
}

export interface IForum extends Document {
    title: string
    subtitle: string
    message: IMessage[]
    userId: string
}

const ForumSchema = new Mongoose.Schema({
    title: { type: String, unique: true },
    subtitle: { type: String },
    message: { type: Array },
    userId: { type: String },
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

const ForumModel = Mongoose.model<IForum>('Forum', ForumSchema)
export default ForumModel

