import mongoose from 'mongoose';

const Schema = mongoose.Schema;
import Option, {OptionSchema} from './OptionSchema';

const FieldSchema = new Schema({
    fieldName: {
        type: String,
        required: [true, ' Please add field Name'],
        maxLength: [50, 'Name can not Exceed more then 50 Characters'],
        trim: true
    },
    fieldDisplayName: {
        type: String,
        required: [true, ' Please add field Name'],
        maxLength: [50, 'Name can not Exceed more then 50 Characters'],
        trim: true
    },
    fieldId: {
        type: String,
        required: [true, ' Please add field Name'],
        maxLength: [50, 'Name can not Exceed more then 50 Characters'],
        trim: true
    },
    fieldType: {
        type: String,
        required: [true, 'Please add type'],
        enum: ['DATE', 'INT', 'BOOLEAN', 'SINGLE_SELECT', 'MULTI_SELECT', 'DICT', 'KEY_VALUE', 'TEXT', 'COST', 'FILE', 'DECIMAL', 'LOG'],
    },
    fieldOptions: {
        type: [OptionSchema]
    },
    required: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String
    },
    fieldValue : {
        type: Schema.Types.Mixed
    },
}, {
    versionKey: false
});

export default mongoose.model('Field', FieldSchema);
export  {FieldSchema};