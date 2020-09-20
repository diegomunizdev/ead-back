"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseRoutes = void 0;
var exercise_controller_1 = require("../controllers/exercise.controller");
var token_validation_1 = require("../middlewares/token.validation");
var upload_files_1 = require("../middlewares/upload.files");
exports.ExerciseRoutes = function (routes) {
    routes.post('/exercises', token_validation_1.TokenValidationTeacher, upload_files_1.UploadFile.single('file'), exercise_controller_1.createExercise);
    routes.get('/exercises', token_validation_1.TokenValidationTeacher, exercise_controller_1.getAll);
    routes.patch('/exercises/:exerciseId/update', token_validation_1.TokenValidationTeacher, exercise_controller_1.updateExercise);
    routes.delete('/exercises/:exerciseId/delete', token_validation_1.TokenValidationTeacher, exercise_controller_1.deleteExercise);
};
