import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName:  {
        type: String,
        required:[true,' Please add project name'],
        maxLength:[100, 'Name can not Exceed more then 100 Characters'],
        trim: true,
        unique: true,
    },
    projectId:  {
        type: String,
        required:[true,' Please add project ID'],
        maxLength:[50, 'Poject ID can not Exceed more then 50 Characters'],
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

export default mongoose.model('Project', ProjectSchema);