/* ****************************************************************************
*  Model Handler : Team
******************************************************************************/

import asyncHandler from "../../shared/middleware/asyncHandler";
import {Organization, Permission, Project, Team} from '../models'


// @desc  Get All teams
// @method GET
// @url /teams

export const GetAllTeams = asyncHandler(async (req, res, next) => {
    const results = await Team.find();
    res.status(200).json({success: true, data: results});
});

// @desc  Create new Team
// @method POST
// @url /teams

export const CreateTeam = asyncHandler(async (req, res, next) => {
    if (req.body) {
        const newObject = {orgName: req.body.organizationName};
        const addStatus = await Team.create(newObject);
        res.status(201).json({success: true, data: addStatus})
    }else{
        next(Error('Please provide data'));
    }
});


/*  Update/Delete with ID*/

// @desc  Get Id Handler
// @method GET
// @url /teams/:id
export const GetTeamByIdHandler =  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const results = await Team.findById(id);
    res.status(200).json({success: true, data: results});
    res.send('Get Organization Handler Called');
});

// @desc Update Handler Function
// @method PUT
// @url /teams/:id
export const UpdateTeamByIdHandler = asyncHandler( async (req, res, next) => {
    const newObject = {teamName: req.body.teamName};
    const id = req.params.id;
    const addStatus = await Team.findOneAndReplace({ _id: id}, {...newObject});
    res.status(201).json({success: true, data: addStatus})
    res.send('Get Organization Handler Called');
});

// @desc  Delete Handler Function
// @method delete
// @url /teams/:id
export const DeleteTeamByIdHandler = asyncHandler( async (req, res, next) => {
    const id = req.params.id;
    const addStatus = await Team.deleteOne({ _id: id});
    res.status(200).json({success: true, message: `Successfully deleted ${id}`})
});