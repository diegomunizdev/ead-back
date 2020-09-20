import { Router } from 'express'
import { createExercise } from '../controllers/exercise.controller'
import { TokenValidationTeacher } from '../middlewares/token.validation'
import { UploadFile } from '../middlewares/upload.files'

export const ExerciseRoutes = (routes: Router) => {
    routes.post('/exercises' , TokenValidationTeacher, UploadFile.single('file'), createExercise)
}