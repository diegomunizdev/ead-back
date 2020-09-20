"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ExerciseSchema = new mongoose_1.default.Schema({
    file: { type: String, required: true },
    chair: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    delivery: { type: String },
    urlVideo: { type: String },
    userId: { type: String, required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
var ExerciseModel = mongoose_1.default.model('Exercise', ExerciseSchema);
exports.default = ExerciseModel;
