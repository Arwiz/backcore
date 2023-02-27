/*****************************************************************************
Model Handler : Coloumn
*****************************************************************************/




// @flow
// 1)  GET   @/coloumn              @GetAllColoumns            Get All Coloumns from the collection
// 1)  GET   @/coloumn/:moduleId    @GetColoumnByModuleId      Get Coloumn from the collection with a particular moduleID
// 2)  POST  @/coloumn              @CreateColoumn             Create Coloumn document
// 3)  PUT   @/coloumn/:colId       @UpdateColoumnByModuleId   Update Coloumn document
// 4)  DEL   @/coloumn/:moduleId    @DeleteColoumnByModuleId   Delete Coloumn document




import mongoose from "mongoose";

import pluralize from 'pluralize';
import {fullCamelCase} from "../../shared/helpers/util.fun";

import asyncHandler from "../../shared/middleware/asyncHandler";
import {Coloumn} from '../models'




// @desc  Get All Coloumns of all modules from collection
// @method GET
// @url /coloumn
export const GetAllColoumns = asyncHandler(async (req, res, next) => {
    const results = await Coloumn.find();
    res.status(200).json({success: true, data: results});
});




// @desc  Get Coloumn document of a particular module
// @method GET
// @url /coloumn/:moduleId
export const GetColoumnByModuleId = asyncHandler(async (req, res, next) => {
    const moduleId = req.params.moduleId
    const results = await Coloumn.find({moduleId})
    res.status(200).json({success: true, data: results})
});




// @desc  Create new Coloumn document (new document for each moduleId)
// @method POST
// @url /coloumn
export const CreateColoumn = asyncHandler(async (req, res, next) => {
    if (req.body) {
        let {clientId, moduleId, availableFields, customizedFields} = req.body;
        const newObject = {clientId, moduleId, availableFields, 'customizedFields':availableFields};
        const addStatus = await Coloumn.create(newObject);
        res.status(201).json({success: true, data: addStatus})
    } else {
        next(Error('Please provide data'));
    }
});




// @desc Update Coloumn document based on moduleId
// @method PUT
// @url /coloumn/:colId
export const UpdateColoumnByModuleId = asyncHandler(async (req, res, next) => {
    if(req.body){
        if(req.body.customizedFields){  
            const _id = req.params.colId
            const results = await Coloumn.find({_id})
            const availableFieldsVar = results[0].availableFields
            const customizedFieldsVar = req.body.customizedFields 
            req.body.customizedFields = customizedFieldsVar.filter(field => availableFieldsVar.includes(field))
            // req.body.customizedFields = customizedFieldsVar.some(field => availableFieldsVar.includes(field))
        }
        const addStatus = await Coloumn.findByIdAndUpdate(req.params.colId, req.body, {new: true, runValidators: true})
        res.status(201).json({success: true, data: addStatus})
    } else {
        next(Error('Please provide customisedFields'))
    }    
});




// @desc  Delete Coloumn document based on moduleId
// @method DELETE
// @url /coloumn/:moduleId
export const DeleteColoumnByModuleId = asyncHandler(async (req, res, next) => {
    const moduleId = req.params.moduleId
    const addStatus = await Coloumn.deleteOne({moduleId})
    res.status(200).json({success: true, data: addStatus})
});