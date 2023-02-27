import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    teamName:  {
        type: String,
        required:[true,' Please add team name'],
        maxLength:[100, 'Name can not exceed more then 100 Characters'],
        trim: true,
        unique: true,
    },
    teamId:  {
        type: String,
        required:[true,' Please add team Id'],
        maxLength:[50, 'Team Id can not exceed more then 50 Characters'],
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

export default mongoose.model('Team', TeamSchema);