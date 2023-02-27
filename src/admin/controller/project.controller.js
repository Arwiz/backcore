/* ****************************************************************************
*  Model Handler : Project
******************************************************************************/

import asyncHandler from "../../shared/middleware/asyncHandler";
import { Project} from '../models'

// @desc  Get All projects
// @method GET
// @url /projects

export const GetAllProjects = asyncHandler(async (req, res, next) => {
    const results = await Project.find();
    res.status(200).json({success: true, data: results});
});

// @desc  Create Id Handler
// @method POST
// @url /projects
export const CreateProject = asyncHandler(async (req, res, next) => {
    if (req.body) {
        const newObject = {orgName: req.body.organizationName};
        const addStatus = await Project.create(newObject);
        res.status(201).json({success: true, data: addStatus})
    }else{
        next(Error('Please provide data'));
    }
});


/*  Update/Delete with ID*/

// @desc  Get Id Handler
// @method GET
// @url /projects/:id
export const GetProjectByIdHandler =  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const results = await Project.findById(id);
    res.status(200).json({success: true, data: results});
    res.send('Get Organization Handler Called');
});

// @desc Update Handler Function
// @method PUT
// @url /projects/:id
export const UpdateProjectByIdHandler = asyncHandler( async (req, res, next) => {
    const newObject = {teamName: req.body.teamName};
    const id = req.params.id;
    const addStatus = await Project.findOneAndReplace({ _id: id}, {...newObject});
    res.status(201).json({success: true, data: addStatus})
    res.send('Get Organization Handler Called');
});

// @desc  Delete Handler Function
// @method delete
// @url /projects/:id
export const DeleteProjectByIdHandler = asyncHandler( async (req, res, next) => {
    const id = req.params.id;
    const addStatus = await Project.deleteOne({ _id: id});
    res.status(200).json({success: true, message: `Successfully deleted ${id}`})
});