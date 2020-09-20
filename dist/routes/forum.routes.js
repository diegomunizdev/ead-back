"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumRoutes = void 0;
var forum_controller_1 = require("../controllers/forum.controller");
exports.ForumRoutes = function (routes) {
    routes.post('/forum', forum_controller_1.createForum)
        .get('/forums', forum_controller_1.getAll)
        .get('/forum/:forumId', forum_controller_1.forumById)
        .patch('/forum/:forumId/update', forum_controller_1.updateForum)
        .delete('/forum/:forumId/delete', forum_controller_1.deleteForum);
};
