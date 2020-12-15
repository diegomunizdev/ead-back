import { Router } from 'express'
import { TokenValidation } from '../middlewares/token.validation'
import {
    addMessage,
    getAllMessages,
    deleteMessage
} from '../controllers/messages.controller'

export const MessageRoutes = (routes: Router) => {
    routes.post('/messages', TokenValidation, addMessage)
        .get('/forum/:forumId/messages', TokenValidation, getAllMessages)
        .delete('/forum/:forumId/messages/:messageId', TokenValidation, deleteMessage)
}