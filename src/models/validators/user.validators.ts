import * as yup from 'yup'
import { UserType } from '../schemas/user.model'
/**
 * Yup validation field's
 * https://github.com/jquense/yup
 */

export const ValidateUser = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().required().min(4),
    type: yup.string().oneOf(Object.values(UserType)).required(),
    period: yup.string(),
    gamePoints: yup.number(),
    noteOne: yup.number(),
    noteTwo: yup.number(),
    noteThree: yup.number(),
    noteFour: yup.number()
})