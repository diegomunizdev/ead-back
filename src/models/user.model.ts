import Mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserType {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    TUTOR = 'tutor',
    STUDENT = 'student'
}

export interface IUser extends Document {
    name: string
    email: string
    password: string | undefined
    avatar: string
    type: UserType // admin, teacher, tutor and student
    period: number
    gamePoints: number
    notes: number[]
    encryptPassword(password: string): Promise<string>
    validatePassword(password: string): Promise<boolean>
}

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        min: 4,
        required: true
    },
    avatar: {
        type: String
    },
    type: {
        type: UserType,
        required: true,
    },
    period: {
        type: Number
    },
    gamePoints: {
        type: Number
    },
    notes: {
        type: Array,
        max: 2
    }
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

UserSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

const UserModel = Mongoose.model<IUser>('User', UserSchema)
export default UserModel