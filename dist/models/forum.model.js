"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ForumSchema = new mongoose_1.default.Schema({
    title: { type: String, unique: true },
    subtitle: { type: String },
    message: { type: Array },
    userId: { type: String },
    subjectId: { type: String }
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
var ForumModel = mongoose_1.default.model('Forum', ForumSchema);
exports.default = ForumModel;
