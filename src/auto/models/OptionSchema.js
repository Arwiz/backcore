import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    optionName:  {
        type: String,
        required:[true,' Please add option Name'],
        maxLength:[500, 'Name can not Exceed more then 50 Characters'],
        trim: true
    },
    optionValue:  {
        type: String,
        required:[' Please add option value'],
        maxLength:[500, 'Name can not Exceed more then 50 Characters'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String
    },
}, {
    versionKey: false
});

export default mongoose.model('Option', OptionSchema);
export {OptionSchema};