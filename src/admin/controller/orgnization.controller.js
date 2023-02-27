/* ****************************************************************************
*  Model Handler : Organization
******************************************************************************/

import asyncHandler from "../../shared/middleware/asyncHandler";
import {Organization } from '../models'

// @desc  Get All Organization
// @method GET
// @url /Organization

export const GetAllOrganizationsHandler = asyncHandler(async (req, res, next) => {
    const results = await Organization.find();
    res.status(200).json({success: true, data: results});
});

// @desc  Create Organization
// @method POST
// @url /Organization
export const CreateOrganizationHandler = asyncHandler(async (req, res, next) => {
    if (req.body) {
        const organization = {orgName: req.body.organizationName, orgId: req.body.organizationId};
        const addStatus = await Organization.create(organization);
        res.status(201).json({success: true, data: addStatus})
    }else{
        next(Error('Please provide data'));
    }
});

/*  Update/Delete with ID*/

// @desc  Create Organization
// @method GET
// @url /Organization/:id
export const GetOrganizationByIdHandler =  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const results = await Organization.findById(id);
    res.status(200).json({success: true, data: results});
    res.send('Get Organization Handler Called');
});

// @desc  Create Organization
// @method PUT
// @url /Organization/:id
export const UpdateOrganizationByIdHandler = asyncHandler( async (req, res, next) => {
    const newObject = {orgName: req.body.organizationName};
    const id = req.params.id;
    const addStatus = await Organization.findOneAndReplace({ _id: id}, {...newObject});
    res.status(201).json({success: true, data: addStatus})
    res.send('Get Organization Handler Called');
});

// @desc  Create Organization
// @method DELETE
// @url /Organization/:id
export const DeleteOrganizationByIdHandler = asyncHandler( async (req, res, next) => {
    const id = req.params.id;
    const addStatus = await Organization.deleteOne({ _id: id});
    res.status(200).json({success: true, message: `Successfully deleted ${id}`})
});