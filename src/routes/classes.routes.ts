import { Router } from 'express'
import { TokenValidationTeacher } from '../middlewares/token.validation'
import { createClasses, deleteClasses, getBySubjectId, updateClasses } from '../controllers/classes.controller'

export const ClassesRoutes = (routes: Router) => {
    routes.post('/classes', TokenValidationTeacher, createClasses)
        .get('/subject/:subjectId/classes', getBySubjectId)
        .patch('/subject/:subjectId/classes/:classesId/update', TokenValidationTeacher, updateClasses)
        .delete('/subject/:subjectId/classes/:classesId/delete', TokenValidationTeacher, deleteClasses)
}