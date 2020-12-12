import { Router } from 'express'
import { createExercise, deleteExercise, getAll, updateExercise } from '../controllers/exercise.controller'
import { TokenValidationTeacher } from '../middlewares/token.validation'
import { UploadFile } from '../middlewares/upload.files'

export const ExerciseRoutes = (routes: Router) => {
    routes.post('/exercises', TokenValidationTeacher, createExercise)
        .get('/exercises', TokenValidationTeacher, getAll)
        .patch('/exercises/:exerciseId/update', TokenValidationTeacher, updateExercise)
        .delete('/exercises/:exerciseId/delete', TokenValidationTeacher, deleteExercise)
}