/* ****************************************************************************
*  Model Handler : Permission
******************************************************************************/

import asyncHandler from "../../shared/middleware/asyncHandler";
import { Permission} from '../models'

// @desc  Get All Permissions
// @method GET
// @url /Permissions

export const GetAllPermissions = asyncHandler(async (req, res, next) => {
    const results = await Permission.find();
    res.status(200).json({success: true, data: results});
});

// @desc  Create Id Handler
// @method POST
// @url /Permissions
export const CreatePermission = asyncHandler(async (req, res, next) => {
    if (req.body) {
        const newObject = {permissionName: req.body.permissionName,
            permissionId:req.body.permissionId };
        const addStatus = await Permission.create(newObject);
        res.status(201).json({success: true, data: addStatus})
    }else{
        next(Error('Please provide data'));
    }
});


/*  Update/Delete with ID*/

// @desc  Get Id Handler
// @method GET
// @url /Permissions/:id
export const GetPermissionByIdHandler =  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const results = await Permission.findById(id);
    res.status(200).json({success: true, data: results});
    res.send('Get Organization Handler Called');
});

// @desc Update Handler Function
// @method PUT
// @url /Permissions/:id
export const UpdatePermissionByIdHandler = asyncHandler( async (req, res, next) => {
    const newObject = {permissionName: req.body.permissionName};
    const id = req.params.id;
    const addStatus = await Permission.findOneAndReplace({ _id: id}, {...newObject});
    res.status(201).json({success: true, data: addStatus})
    res.send('Get Organization Handler Called');
});

// @desc  Delete Handler Function
// @method delete
// @url /Permissions/:id
export const DeletePermissionByIdHandler = asyncHandler( async (req, res, next) => {
    const id = req.params.id;
    const addStatus = await Permission.deleteOne({ _id: id});
    res.status(200).json({success: true, message: `Successfully deleted ${id}`})
});