import { Router } from 'express'

import { createForum, getAll, forumById, updateForum, deleteForum } from '../controllers/forum.controller'

export const ForumRoutes = (routes: Router) => {
    routes.post('/forum', createForum)
        .get('/forums', getAll)
        .get('/forum/:forumId', forumById)
        .patch('/forum/:forumId/update', updateForum)
        .delete('/forum/:forumId/delete', deleteForum)
}