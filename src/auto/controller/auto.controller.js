/* ****************************************************************************
*  Model Handler : MetaModules
******************************************************************************/

import asyncHandler from "../../shared/middleware/asyncHandler";
import {MetaModule} from '../models'
import mongoose from "mongoose";
import schemaDesignFromMetaModule, {getDynamicModuleByUrl} from "../../shared/helpers/schema.helper";
import {BlobServiceClient} from '@azure/storage-blob'
import fs from "fs"
import { Stream } from "stream";

const AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=tanisha;AccountKey=iOkhMK6NCmhSwitUJ9IllNyUtC2gP1Npx1T9NRnk9r+6YHBYfFRZAmw0DPUqtECsl7H4Z7cnjz5fhu9dtIWO3w==;EndpointSuffix=core.windows.net"
const path = require('path')
const azure = require('azure-storage')
const blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING)
// const azure = require('azure')
// const blobService = azure.createBlobService('tanisha', 'iOkhMK6NCmhSwitUJ9IllNyUtC2gP1Npx1T9NRnk9r+6YHBYfFRZAmw0DPUqtECsl7H4Z7cnjz5fhu9dtIWO3w==')





// @desc  Get All schemas
// @method GET
// @url /schemas


/**
 * @swagger
 * /api/v1/auto/{moduleNameInPlural}:
 *   get:
 *     tags:
 *       - Auto CRUD Module
 *     name: Find All The Data of a module
 *     summary: Finds a list under given module name
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: moduleNameInPlural
 *         schema:
 *           type: string
 *         required:
 *           - moduleNameInPlural
 *     responses:
 *       '200':
 *         description: A single user object
 */

export const GetDataFromDynamicModule = asyncHandler(async (req, res, next) => {
    let dataUrl = req.url;
    dataUrl = dataUrl.replace(/\//gi, '');
    console.log(dataUrl)
    // Get The schema from the Collection
    const foundModel = await getDynamicModuleByUrl(dataUrl);
    console.log(foundModel)
    if (foundModel) {
        const results = await foundModel.find({});
        res.status(200).json({success: true, data: results});
    } else {
        next(Error('Module not available or Not published'));
    }
});


// @desc  Create new MetaModules
// @method POST
// @url /schemas

/**
 * @swagger
 * /api/v1/auto/{moduleNameInPlural}:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: moduleNameInPlural
 *         description: Username to use for login.
 *         in: path
 *         required: true
 *         type: string
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: object
 *         properties:
 *         id:
 *          type: string
 *         firstName:
 *          type: string
 *     responses:
 *       200:
 *         description: login
 */


// const CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=tanisha;AccountKey=iOkhMK6NCmhSwitUJ9IllNyUtC2gP1Npx1T9NRnk9r+6YHBYfFRZAmw0DPUqtECsl7H4Z7cnjz5fhu9dtIWO3w==;EndpointSuffix=core.windows.net"
// Create the BlobServiceClient object which will be used to create a container client
// const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
// Create a unique name for the container
// const containerName1 = '5ee98332fb804b012cb92172';
// Get a reference to a container
// const containerClient1 = blobServiceClient.getContainerClient(containerName1);
// Create the container
// const createContainerResponse1 = await containerClient1.create();
// console.log("Container was created successfully. requestId: ", createContainerResponse1.requestId);


// export const InsertDataInDynamicModule = asyncHandler(async (req, res, next) => {
//     if (req.body) {
//         console.log('.................................................................................................................')
//         let dataUrl = req.url;
//         console.log("dataUrl", dataUrl)
//         dataUrl = dataUrl.replace(/\//gi, '');
//         // Get The schema from the Collection
//         const foundModel = await getDynamicModuleByUrl(dataUrl);
//         console.log("found model: ", foundModel)
//         console.log("request body: ", req.body);
//         if (foundModel) {
//             var bodyInput = req.body
//             if(req.files){
//                 console.log("req.files ........................ ", req.files)
//                 bodyInput[req.files['0'].fieldname] = req.files['0'].url
//                 const addStatus = await foundModel.create(bodyInput)
//                 console.log('data: .......... ', addStatus)
//                 res.status(200).json({success: true, data: addStatus})
//             } else {
//                 const addStatus = await foundModel.create(bodyInput)
//                 res.status(200).json({success: true, data: addStatus})
//             }
//         } else
//             next(Error('Module not available or Not published'));
//     } 
//     else {
//         next(Error('Please provide data'));
//     }
// });






const listContainers = async () => {
    return new Promise((resolve, reject) => {
        blobService.listContainersSegmented(null, (err, data) => {
            if (err) reject(err);
            else resolve({ message: `${data.entries.length} containers`, containers: data.entries });
        });
    });
};


const createContainer = async (containerName) => {
    return new Promise((resolve, reject) => {
        blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, err => {
            if (err) reject(err);
            else resolve({ message: `Container '${containerName}' created` });
        });
    });
};


const uploadLocalFile = async (containerName, blobName, filePath) => {


    // var myStream = getSomeStream()
    // var myStreamLength = getSomeStreamLength()
    // blobService.createBlockBlobFromStream(containerName, blobName, stream, streamSize,
    //     function(error, result, response){
    //         if(error){
    //             console.log("Couldn't upload stream");
    //             console.error(error);
    //         } else {
    //             console.log('Stream uploaded successfully');
    //         }
    //     })




    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(filePath);
        // console.log('full path: ..............', fullPath)
        // const blobName = containerName + path.basename(filePath);
        blobService.createBlockBlobFromLocalFile(containerName, blobName, fullPath, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Local file "${filePath}" is uploaded` });
            }
        })
    })
}


const listBlobs = async (containerName) => {
    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmented(containerName, null, (err, data) => {
            if (err) reject(err);
            else resolve({ message: `${data.entries.length} blobs in '${containerName}'`, blobs: data.entries });
        });
    });
};


const deleteBlob = async (containerName, blobName) => {
    return new Promise((resolve, reject) => {
        blobService.deleteBlobIfExists(containerName, blobName, err => {
            if (err) reject(err);
            else resolve({ message: `Block blob '${blobName}' deleted` });            
        });
    });
};


const deleteContainer = async (containerName) => {
    return new Promise((resolve, reject) => {
        blobService.deleteContainer(containerName, err => {
            if (err) reject(err);
            else resolve({ message: `Container '${containerName}' deleted` });            
        });
    });
};


const yourMagicLogic = (req, filename) => {
    return `${Date.now()}_${filename}`
}

export const InsertDataInDynamicModule = asyncHandler(async (req, res, next) => {
    if (req.body) {
        console.log('.................................................................................................................')
        
        let dataUrl = req.url;
        // console.log("dataUrl", dataUrl)
        dataUrl = dataUrl.replace(/\//gi, '');

        // Get The schema from the Collection
        const foundModel = await getDynamicModuleByUrl(dataUrl);
        console.log("found model: ", foundModel)

        if (foundModel) {
            var bodyInput = req.body

            if(req.files){
                //console.log('req.body.....................', bodyInput)
                console.log('req.files.....................', req.files)
                
                const containerName = bodyInput.clientId
                const blobName= yourMagicLogic(req, req.files[0].originalname)
                const stream = req.files[0].buffer
                const streamSize = stream.size
                console.log("....................\n", stream)
                var localFilePath = './'+ req.files[0].originalname
                let response

                console.log('container name: ', containerName)
                console.log('blobName: ', blobName)
                console.log('path: ', localFilePath)

                // listing all containers
                console.log("Containers: ")
                response = await listContainers();
                response.containers.forEach((container) => console.log(` -  ${container.name}`));

                // create container if it DNE
                const containerDoesNotExist = response.containers.findIndex((container) => container.name === containerName) === -1;
                if (containerDoesNotExist) {
                    await createContainer(containerName);
                    console.log(`Container "${containerName}" is created`);
                }                

                // Upload file as a blob
                // response = await uploadLocalFile(containerName, blobName, req.files[0]);
                response = await uploadLocalFile(containerName, blobName, localFilePath);
                const url = blobService.getUrl(containerName, blobName)
                console.log(response.message);

                // listing all blobs
                console.log(`Blobs in "${containerName}" container:`);
                response = await listBlobs(containerName);
                response.blobs.forEach((blob) => console.log(` - ${blob.name}`));


                bodyInput[req.files['0'].fieldname] = url
                const addStatus = await foundModel.create(bodyInput)
                console.log('data: .......... ', addStatus)
                res.status(200).json({success: true, data: addStatus})

            } else {
                const addStatus = await foundModel.create(bodyInput)
                res.status(200).json({success: true, data: addStatus})
            }
        } else next(Error('Module not available or Not published'));
    } 
    else next(Error('Please provide data'));
    
});









//
// /*  Update/Delete with ID*/
//
// // @desc  Get Id Handler
// // @method GET
// // @url /schemas/:id
export const GetMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    let dataUrl = req.url;
    const id = req.params.id;
    dataUrl = dataUrl.replace(/\//gi, '');
    // Get The schema from the Collection
    const foundModel = await getDynamicModuleByUrl(dataUrl);
    if (foundModel) {
        const results = await foundModel.find({id});
        res.status(200).json({success: true, data: results});
    } else {
        next(Error('Module not available or Not published'));
    }
});







//
// @desc Update Handler Function
// @method PUT
// @url /schemas/:id
// export const UpdateMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
//     let dataUrl = req.url;
//     const id = req.params.id;
//     dataUrl = dataUrl.replace(/\//gi, '');
//     const newObject = {...req.body};
//     // Get The schema from the Collection
//     const foundModel = await getDynamicModuleByUrl(dataUrl);
//     const addStatus = await foundModel.findOneAndReplace({_id: id}, {...newObject});
//     res.status(201).json({success: true, data: addStatus})
// });

export const UpdateMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    let dataUrl = req.url;
    dataUrl = dataUrl.split('/')[1];
    const foundModel = await getDynamicModuleByUrl(dataUrl); // Get The schema from the Collection

    if (foundModel) {
        const bodyInput = req.body

        if(req.files){

            // if(req.params.containername){
                const containerName = req.params.containername
                const prevBlobName = req.params.blobname
                console.log('Container Name:...........\n', containerName, "prev Blob Name:...........\n", prevBlobName)
                let response = await deleteBlob(containerName, prevBlobName);
                console.log(`Blob "${prevBlobName}" is deleted`, response.message);
            // }
            
            // const containerName = bodyInput.clientId
            const newBlobName= yourMagicLogic(req, req.files[0].originalname)
            let localFilePath = './'+ req.files[0].originalname
            const stream = fs.createReadStream(req.files[0].buffer)
            const streamSize = stream.size();

            // Upload file as blob
            response = await uploadLocalFile(containerName, newBlobName, localFilePath);
            const url = blobService.getUrl(containerName, newBlobName)
            console.log('............................................', url)
            console.log(response.message);

            bodyInput[req.files['0'].fieldname] = url
            
            const addStatus = await foundModel.updateOne({_id: id}, {...bodyInput})
            const results = await foundModel.find({})
            res.status(200).json({success: true, data: addStatus, result: results})
        } else{
            const addStatus = await foundModel.updateOne({_id: id}, {...bodyInput})
            res.status(200).json({success: true, data: addStatus})
        }
    } else {
        next(Error('Please provide data'));
    }
});

// export const PublishTheModule = asyncHandler(async (req, res, next) => {
//     const id = req.params.id;
//     const foundDataModel = await MetaModule.findById(id);
//     const sch =  schemaDesignFromMetaModule(foundDataModel);
//     const checkedThenGetDynamicModule = await mongoose.models[foundDataModel.moduleName] || await mongoose.model(foundDataModel.moduleName, sch);
//     if(checkedThenGetDynamicModule){
//         const updateStatus = await MetaModule.updateOne({_id: id}, {status: EN_ModuleStatus.PUBLISHED});
//         res.status(201).json({success: true, data: updateStatus});
//     }else {
//         next(Error('Please verify the Id.!'));
//     }

// });








//
// // @desc  Delete Handler Function
// // @method delete
// // @url /schemas/:id

// /**
//  * @swagger
//  * /api/v1/auto/{moduleNameInPlural}/{id}:
//  *   delete:
//  *     tags:
//  *       - Auto CRUD Module
//  *     name: Delete Data of a module
//  *     summary: Delete Data of a module
//  *     parameters:
//  *     - in: path
//  *         name: moduleNameInPlural
//  *         schema:
//  *           type: string
//  *         required:
//  *           - moduleNameInPlural
//  *        name: id
//  *        schema:
//  *          type: string
//  *        required:
//  *          - id
//  *     responses:
//  *       '200':
//  *         description: A single user object
//  */

// export const DeleteMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
//     const id = req.params.id
//     let dataUrl = req.url;
//     dataUrl = dataUrl.replace(/\//gi, '');
//     // Get The schema from the Collection
//     const foundModel = await getDynamicModuleByUrl(dataUrl);
//     const addStatus = await foundModel.deleteOne({_id: id});
//     res.status(200).json({success: true, message: `Successfully deleted ${id}`})
// });





export const DeleteMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    let dataUrl = req.url;
    const moduleName = dataUrl.split('/')[1];
    // Get The schema from the Collection
    const foundModel = await getDynamicModuleByUrl(moduleName);

    console.log(id)
    console.log(moduleName)
    console.log(foundModel)

    if(foundModel){
        const addStatus = await foundModel.deleteOne({_id: id})
        if(req.params.containername){
            const containerName = req.params.containername
            const blobName = req.params.blobname
            console.log('........', containerName, blobName)
            const response = await deleteBlob(containerName, blobName);
            console.log(`Blob "${blobName}" is deleted`, response.message);
        }
        res.status(200).json({success: true, message: `Successfully deleted ${id}`})
    } else{
        next(Error('There is some problem to delete the data!'));
    }
});