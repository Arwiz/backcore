import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ModuleStatusSchema = new Schema({
    clientId:  {
        type: Schema.Types.ObjectId,
        required:[true,' Please add client Id'],
    },
    moduleId:  {
         type: String,
         required:[true,' Please add module Name'],
         unique: true
    },
    moduleName:  {
        type: String,
        required:[true,' Please add module Name'],
        maxLength:[50, 'Name can not Exceed more then 50 Characters'],
        trim: true,
        unique: true
    },
    status: {
        type: String,
        required: [true, 'Please add status'],
        enum: ['PUBLISHED', 'UNPUBLISHED','DRAFT'],
        default: 'DRAFT'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
    },
}, {
    versionKey: false
});

export default mongoose.model('ModuleStatus', ModuleStatusSchema);
export {ModuleStatusSchema};