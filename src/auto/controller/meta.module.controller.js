/* ****************************************************************************
*  Model Handler : MetaModules
*
*
******************************************************************************/
// @flow
// 1)  Get All Meta Modules
// 2)  Create Meta Modules
// 3)  Delete All Meta Modules

// 4)  Put Publish Meta Module
// 5)  Get All Meta Modules

// 7) Put meta module by Id
// 7) Delete particular meta module by Id

//8) GET PUBLISHED MODULES


import asyncHandler from "../../shared/middleware/asyncHandler";
import {MetaModule, ModuleStatus} from '../models'
import schemaDesignFromMetaModule, {getDynamicModuleByUrl} from "../../shared/helpers/schema.helper";
import mongoose, { modelNames } from "mongoose";
import {fullCamelCase} from "../../shared/helpers/util.fun";
import pluralize from 'pluralize';
import {EN_ModuleStatus} from "../models/app-data";

// @desc  Get All schemas
// @method GET
// @url /schemas

export const GetAllMetaModules = asyncHandler(async (req, res, next) => {
    const results = await MetaModule.find();
    res.status(200).json({success: true, data: results.reverse()});
});

// @desc  Create new MetaModules
// @method POST
// @url /schemas
// 1) = > Create Meta Module
export const CreateMetaModules = asyncHandler(async (req, res, next) => {
    if (req.body) {
        let {clientId, projectId, moduleName, fields} = req.body;
        console.log("req body ----------------------", req.body)
        // moduleName = fullCamelCase(moduleName);
        const moduleId = pluralize(moduleName).toLowerCase().split(" ").join("");
        // moduleName = pluralize.singular(moduleName);
        const newObject = {clientId, projectId, status: EN_ModuleStatus.DRAFT, moduleId, moduleName, fields};
        const addStatus = await MetaModule.create(newObject);
        console.log("modulename ----- ", moduleName)
        res.status(201).json({success: true, data: addStatus})
    } else {
        next(Error('Please provide data'));
    }
});

// @desc  All MetaModules
// @method DELETE
// @url /schemas

export const ClearAllMetaModules = asyncHandler(async (req, res, next) => {
        const addStatus = await MetaModule.deleteMany();
        res.status(200).json({success: true, data: addStatus})
});



// @desc  All MetaModules
// @method PUT
// @url /metamodules/publish/:id
export const PublishTheModule = asyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const {status} = req.body;
        const foundDataModel = await MetaModule.findById(id);
        const sch =  schemaDesignFromMetaModule(foundDataModel);
        const checkedThenGetDynamicModule = await mongoose.models[foundDataModel.moduleName] || await mongoose.model(foundDataModel.moduleName, sch);
        if(checkedThenGetDynamicModule){
            const updateStatus = await MetaModule.updateOne({_id: id}, {status: status});
            // const updateStatus = await MetaModule.updateOne({_id: id}, {status: EN_ModuleStatus.PUBLISHED});
            res.status(201).json({success: true, data: updateStatus});
        }else {
            next(Error('Please verify the Id.!'));
        }
});


//
// /*  Update/Delete with ID*/
//
// @desc  Get Id Handler
// @method GET
// @url /schemas/:id
export const GetMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const results = await MetaModule.findById(id);
    res.status(200).json({success: true, data: results});
});


// @desc Update Handler Function
// @method PUT
// @url /metamodules/:id
export const UpdateMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const {clientId, moduleId, moduleName, fields} = req.body;
    const newObject = {clientId, moduleId, moduleName, fields, status: EN_ModuleStatus.DRAFT}
    const id = req.params.id;
    const addStatus = await MetaModule.findOneAndReplace({_id: id}, {...newObject});
    res.status(201).json({success: true, data: addStatus})
});


// // @desc  Delete Handler Function
// // @method delete
// // @url /metamodules/fdelete/:id
export const DeleteMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    // find record by id
    const foundDataModel = await MetaModule.findById(id);
    // remove respective collection
    // const dynamicModule = await getDynamicModuleByUrl(foundDataModel.moduleId);
    // const deleteStatus = await  dynamicModule.collection.drop();
    // remove the entry from the main module collection
    if(true){
        const addStatus = await MetaModule.deleteOne({_id: id});
        res.status(200).json({success: true, message: `Successfully deleted ${id}`})
    }else{
        next(Error('There is some problem to delete the data!'));
    }
});


// @desc Soft delete  Handler Function
// @method DELETE
// @url /metamodules/inactive/:id
export const SoftDeleteMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const updateStatus = await MetaModule.findOneAndReplace({_id: id}, {isActive: false});
    res.status(201).json({success: true, data: updateStatus})
});


// @desc  Get All Published schemas
// @method GET
// @url /schemas

// export const GetAllMetaModulesByStatus = asyncHandler(async (req, res, next) => {
//     const status_ = req.params.status;
//     // console.log("\n\n\n\n", status_);
//     const results = await MetaModule.find({status: status_});
//     res.status(200).json({success: true, data: results});
// });

export const GetAllMetaModulesByStatus = asyncHandler(async (req, res, next) => {
    const status_ = req.params.status;

    const clientId = req.headers.clientid;
    const projectId = req.headers.projectid;
    console.log('projectId ------ ', projectId);
    console.log('clientId ------ ', clientId);

    console.log("Module Status ", status_);
    const results = await MetaModule.find({status: status_, clientId: clientId, projectId: projectId});
    res.status(200).json({success: true, data: results});
});