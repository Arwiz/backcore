import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// import Field, {FieldSchema} from "./FieldSchema";

const ColoumnSchema = new Schema({
    clientId:  {
        type: Schema.Types.ObjectId,
    },
    moduleId:  {
        type: Schema.Types.ObjectId,
    },
    availableFields: {
        type: [String]
    },
    customizedFields: {
        type: [String]
    }
}, {
    versionKey: false
});

export default mongoose.model('Coloumn', ColoumnSchema);
export {ColoumnSchema};