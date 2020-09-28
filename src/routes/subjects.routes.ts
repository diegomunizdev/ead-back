import { Router } from 'express'
import { createSubject, deleteSubject, updateSubject, getAll, getById, getByPeriod, getByTeacher } from '../controllers/subjects.controller'
import { TokenValidationTeacher } from '../middlewares/token.validation'

export const SubjectsRoutes = (routes: Router) => {
    routes.post('/subject', TokenValidationTeacher, createSubject)
        .get('/subjects', TokenValidationTeacher, getAll)
        .get('/:teacherId/subjects/', TokenValidationTeacher, getByTeacher)
        .get('/subjects/:period', TokenValidationTeacher, getByPeriod)
        .get('/subjects/:subjectId', TokenValidationTeacher, getById)
        .patch('/subject/:subjectId/update', TokenValidationTeacher, updateSubject)
        .delete('/subject/:subjectId/delete', TokenValidationTeacher, deleteSubject)
}