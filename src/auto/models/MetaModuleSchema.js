import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Field, {FieldSchema} from "./FieldSchema";

const MetaModuleSchema = new Schema({
    clientId:  {
        type: Schema.Types.ObjectId,
    },
    projectId:  {
        type: Schema.Types.ObjectId,
    },
    moduleId:  {
        type: String,
        required:[true,' Please add module Id'],
        maxLength:[50, 'Name can not Exceed more then 50 Characters'],
        trim: true,
        unique: true,
    },
    moduleName:  {
        type: String,
        required:[true,' Please add module Name'],
        trim: true,
        unique: true
    },
    status: {
        type: String,
        required: [true, 'Please add status'],
        enum: ['PUBLISHED', 'UNPUBLISHED','DRAFT'],
        default: 'DRAFT'
    },
    fields:{
        type: [FieldSchema]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        // default: Date.now
    },
}, {
    versionKey: false
});

export default mongoose.model('MetaModule', MetaModuleSchema);
export {MetaModuleSchema};