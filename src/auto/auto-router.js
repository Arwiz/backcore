import express from 'express';
import {
    DeleteMetaModulesByIdHandler,
    GetDataFromDynamicModule, GetMetaModulesByIdHandler,
    InsertDataInDynamicModule, UpdateMetaModulesByIdHandler,
} from "./controller/auto.controller";

import multer from 'multer'
import multerAzure from 'multer-azure'
import path from 'path'


const router = express.Router();

// Find route and put handler
// router.route('/')
//     .get(GetAllMetaModules)
//     .post(CreateMetaModuleData)

var upload = multer()


// Find route and put handler
router.route('/*/')
    .get(GetDataFromDynamicModule)
    // .post(InsertDataInDynamicModule)
    .post(upload.any(), InsertDataInDynamicModule)

router.route('/*/:id/:containername/:blobname')
    .delete(DeleteMetaModulesByIdHandler)
    .put(upload.any(), UpdateMetaModulesByIdHandler)

router.route('/*/:id')
    .get(GetMetaModulesByIdHandler)
    .put(upload.any(), UpdateMetaModulesByIdHandler)
    .delete(DeleteMetaModulesByIdHandler)

export default router;