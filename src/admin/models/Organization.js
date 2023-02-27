import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    orgName:  {
        type: String,
        required:[true,' Please add organization Name'],
        maxLength:[100, 'Name can not Exceed more then 100 Characters'],
        trim: true,
        unique: true,
    },
    orgId:  {
        type: String,
        required:[true,' Please add organization Id'],
        maxLength:[100, 'Id can not Exceed more then 100 Characters'],
        trim: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

export default mongoose.model('Organization', OrganizationSchema);