import Entity from "./Entity"
import bcrypt from 'bcrypt';

export enum UserType {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    TUTOR = 'tutor',
    STUDENT = 'student'
}

export default class User extends Entity {
    private _name: string | undefined
    private _email: string | undefined
    private _password: string | undefined
    private _type: UserType | undefined
    private _period: string | undefined
    private _gamePoints: number | undefined
    private _noteOne: number | undefined
    private _noteTwo: number | undefined
    private _noteThree: number | undefined
    private _noteFour: number | undefined

    constructor() {
        super()
        this._name = ''
        this._email = ''
        this._password = ''
        this._type = '' as UserType
        this._period = ''
    }

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }

    get email(): string | undefined {
        return this._email
    }

    set email(value: string | undefined) {
        this._email = value
    }

    get password(): string | undefined {
        return this._password
    }

    set password(value: string | undefined) {
        this._password = value
    }

    get type(): UserType | undefined {
        return this._type
    }

    set type(value: UserType | undefined) {
        this._type = value
    }

    get period(): string | undefined {
        return this._period
    }

    set period(value: string | undefined) {
        this._period = value
    }

    get gamePoints(): number | undefined {
        return this._gamePoints
    }

    set gamePoints(value: number | undefined) {
        this._gamePoints = value
    }

    get noteOne(): number | undefined {
        return this._noteOne
    }

    set noteOne(value: number | undefined) {
        this._noteOne = value
    }

    get noteTwo(): number | undefined {
        return this._noteTwo
    }

    set noteTwo(value: number | undefined) {
        this._noteTwo = value
    }

    get noteThree(): number | undefined {
        return this._noteThree
    }

    set noteThree(value: number | undefined) {
        this._noteThree = value
    }

    get noteFour(): number | undefined {
        return this._noteFour
    }

    set noteFour(value: number | undefined) {
        this._noteFour = value
    }

    public fromJSON(json: any): User {
        super.fromJSON(json)

        if (json.name !== undefined) {
            this._name = json.name
        }

        if (json.email !== undefined) {
            this._email = json.email
        }

        if (json.password !== undefined) {
            this._password = json.password
        }

        if (json.type !== undefined) {
            this._type = json.type
        }

        if (json.period !== undefined) {
            this._period = json.period
        }

        if (json.gamePoints !== undefined) {
            this._gamePoints = json.gamePoints
        }

        if (json.noteOne !== undefined) {
            this._noteOne = json.noteOne
        }

        if (json.noteTwo !== undefined) {
            this._noteTwo = json.noteTwo
        }

        if (json.noteThree !== undefined) {
            this._noteThree = json.noteThree
        }

        if (json.noteFour !== undefined) {
            this._noteFour = json.noteFour
        }

        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            name: this.name ? this.name : undefined,
            email: this.email ? this.email : undefined,
            password: this.password ? this.password : undefined,
            type: this.type ? this.type : undefined,
            period: this.period ? this.period : undefined,
            gamePoints: this.gamePoints ? this.gamePoints : undefined,
            noteOne: this.noteOne ? this.gamePoints : undefined,
            noteTwo: this.noteTwo ? this.noteTwo : undefined,
            noteThree: this.noteThree ? this.noteThree : undefined,
            noteFour: this.noteFour ? this.noteFour : undefined
        }
    }

    public async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        return Promise.resolve(bcrypt.hash(password, salt))
    }

    public async validatePassword(password: string): Promise<boolean> {
        return Promise.resolve(bcrypt.compare(password, this.password ? this.password : ''))
    }

}