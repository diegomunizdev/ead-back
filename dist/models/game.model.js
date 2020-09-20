"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var GameSchema = new mongoose_1.default.Schema({
    question: { type: String, unique: true },
    rightAnswers: { type: String },
    options: { type: Array },
    period: { type: String },
    points: { type: Number, min: 1, max: 10 }
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
var GameModel = mongoose_1.default.model('Game', GameSchema);
exports.default = GameModel;
