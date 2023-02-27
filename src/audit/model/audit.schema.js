import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AuditSchema = new Schema({
    action: {type: String, required: true},
    createdBy: {type: ObjectId, ref: 'User', required: true},
    auditMessage: {type: String, required: true},
    diff: {type: Schema.Types.Mixed},
}, {
    versionKey: false,
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
});

export default mongoose.model('Audit', AuditSchema);